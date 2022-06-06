<script lang="ts">
    import type { Margin, Width } from "../tailwindClasses";
    export let onClick:() => void
    export let text:string
    export let size:"medium"|"large" = "medium"
    export let width:Width = ""
    export let emphasis:"high"|"medium"|"low"
    export let margin:Margin = "m-2"
</script>
<button 
    class="
        {size === "large" ? "text-2xl":"text"}
        {width}
        p-2
        {margin} 
        rounded-xl
        border-2
        active:text-primary-variant focus:text-primary-variant hover:text-primary-variant
        {emphasis === "high" ?      "text-background font-sans  bg-primary      border-primary" : ""}
        {emphasis === "medium" ?    "text-primary font-sans     bg-background   border-primary "  :""}
        {emphasis === "low" ?       "text-primary font-sans     bg-background   border-background" : ""}
    " 
    type="button" 
    on:click={onClick}
>{text}</button>