<script lang="ts">
    /*
    import { GamePhase } from "../../../domain/entities/GamePhase";
    import { gamePhaseStore } from "../../stores/stores";
    import Smileys from "../text/smileys.svelte";
    import {currentCleavageStore} from "../../stores/stores"
    */
    import { clientApplication } from "../../../clientApplication";
    import { afterUpdate, onMount } from "svelte";
    const resizePixi = (log:string) => {
        console.log(log)
        const pixiHtmlElement=document.getElementById(pixiHtmlElementId);
        const cleavageHudHtmlElement=document.getElementById("cleavageHud");
        const commandHudHtmlElement=document.getElementById("commandHud");
        if(pixiHtmlElement&&cleavageHudHtmlElement&&commandHudHtmlElement) clientApplication.changeResolution({
            width: window.innerWidth,
            height: window.innerHeight-cleavageHudHtmlElement.clientHeight-commandHudHtmlElement.clientHeight,
        });
    }
    const pixiHtmlElementId= 'pixi'
    //const onWindowResize = () => resizePixi("on Window Resize")
    onMount(()=> {
        const pixiHtmlElement=document.getElementById(pixiHtmlElementId);
        if(pixiHtmlElement) {
            clientApplication.addingViewToDom(pixiHtmlElement).then(() => resizePixi("add view to DOM & resize"));
            new ResizeObserver(entries =>resizePixi("Observer")).observe(pixiHtmlElement)
        }
    })
    //afterUpdate(()=>resizePixi("after update"))
</script>
<!--<svelte:window on:resize={onWindowResize}/>-->
<div id={pixiHtmlElementId} class="flex flex-row w-full h-full items-center justify-center">
    <!--{#if $gamePhaseStore === GamePhase.CLEAVING && $currentCleavageStore}
        <Smileys qty={$currentCleavageStore.leftChoice.players.length}/>
        <Smileys qty={$currentCleavageStore.players.length - ($currentCleavageStore.leftChoice.players.length + $currentCleavageStore.rightChoice.players.length)}/>
        <Smileys qty={$currentCleavageStore.rightChoice.players.length}/>
    {/if}-->
</div>