<script lang="ts">
    export let onClick:() => void
    export let text:string
    export let size:"medium"|"large" = "medium"
    export let wfull = false
    const rotatizer = Math.random() * 100
</script>
<button 
    class="{size === "large" ? "text-2xl":"text"} {wfull ? "w-full": ""} p-2 m-2 {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } bg-dark-background text-no-emphasis font-sans border-2 rounded-xl border-medium-emphasis active:border-low-emphasis focus:border-low-emphasis" 
    type="button" 
    on:click={onClick}
>{text}</button>