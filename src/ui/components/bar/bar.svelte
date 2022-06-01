<script lang="ts">
    import { clientApplication } from "../../../clientApplication";
    import { onMount } from "svelte";
    const resizePixi = () => {
        const pixiHtmlElement=document.getElementById(pixiHtmlElementId);
        const cleavageHudHtmlElement=document.getElementById(cleavageHudId);
        const commandHudHtmlElement=document.getElementById(commandHudId);
        if(pixiHtmlElement&&cleavageHudHtmlElement&&commandHudHtmlElement) clientApplication.changeResolution({
            width: window.innerWidth,
            height: window.innerHeight-cleavageHudHtmlElement.clientHeight-commandHudHtmlElement.clientHeight,
        });
    }

    const cleavageHudId="cleavageHud";
    const commandHudId="commandHud";
    const pixiHtmlElementId= 'pixi'
    let interval:NodeJS.Timeout|undefined
    onMount(()=> {
        const pixiHtmlElement=document.getElementById(pixiHtmlElementId);
        if(pixiHtmlElement) {
            clientApplication.addingViewToDom(pixiHtmlElement).then(() => resizePixi());
            new ResizeObserver(() =>{
                if(interval)clearTimeout(interval);
                interval=setTimeout(()=>resizePixi(),100);
            }).observe(pixiHtmlElement)
        }
    })
</script>
<div id={pixiHtmlElementId} class="flex flex-row w-full h-full px-1 items-center justify-center"></div>