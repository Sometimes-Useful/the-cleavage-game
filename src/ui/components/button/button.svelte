<script lang="ts">
    import type { width } from "../tailwindClasses";
    export let onClick:() => void
    export let text:string
    export let size:"medium"|"large" = "medium"
    export let width:width = ""
    export let emphasis:"high"|"medium"|"low"
    const rotatizer = Math.random() * 100
</script>
<button 
    class="
        {size === "large" ? "text-2xl":"text"}
        {width}
        p-2 m-2 
        rounded-xl
        border-2
        active:text-primary-variant focus:text-primary-variant hover:text-primary-variant
        {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } 
        {emphasis === "high" ?      "text-background font-sans  bg-primary      border-primary" : ""}
        {emphasis === "medium" ?    "text-primary font-sans     bg-background   border-primary "  :""}
        {emphasis === "low" ?       "text-primary font-sans     bg-background   border-background" : ""}
    " 
    type="button" 
    on:click={onClick}
>{text}</button>