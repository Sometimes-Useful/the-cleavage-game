<script lang="ts">
    export let onClick:() => void
    export let text:string
    export let size:"medium"|"large" = "medium"
    const rotatizer = Math.random() * 100
</script>
<button 
    class="{size === "large" ? "text-2xl":"text"} p-2 m-2 {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } bg-black text-white font-sans border-2 rounded-xl border-[#2eff12] active:border-[#fbff00] focus:border-[#fbff00]" 
    type="button" 
    on:click={onClick}
>{text}</button>