<script lang="ts">
    import type { Margin, Width } from "../tailwindClasses";
    export let inputValue:number
    export let placeholder:string
    export let id:string
    export let name:string
    export let mainInput = false
    export let width:Width = ""
    export let margin:Margin = "m-1"
</script>
<input 
    class = "
        p-1
        {margin}
        {width}
        {mainInput ? "text-2xl" : "text-xl"} 
        rounded-t rounded-b-sm
        border-b border-primary 
        focus:border-none
        focus:outline-none
        focus:ring-1 focus:ring-secondary-variant
        font-sans text-center text-primary-variant placeholder-primary-variant 
        bg-white bg-opacity-10
    "
    type="number" 
    min=0 
    {id} 
    {name}  
    required 
    bind:value={inputValue} 
    {placeholder}
>
