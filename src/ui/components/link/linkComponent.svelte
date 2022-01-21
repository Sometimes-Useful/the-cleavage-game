<script lang="ts">
    export let text:string
    export let href:string
    export let newTab:boolean = false
    const rotatizer = Math.random() * 100
</script>

{#if newTab }
    <a class="text-center font-sans underline text-[#fbff00] hover:text-[#2eff12] visited:text-[#fbff00] {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" }" {href} target="_blank">{text}</a>
{:else}
    <a class="text-center font-sans underline text-[#fbff00] hover:text-[#2eff12] visited:text-[#fbff00] {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" }" {href}>{text}</a>
{/if}