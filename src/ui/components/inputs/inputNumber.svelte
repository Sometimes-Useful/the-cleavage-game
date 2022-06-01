<script lang="ts">
    export let inputValue:number
    export let placeholder:string
    export let id:string
    export let name:string
    export let mainInput = false
    const rotatizer = Math.random() * 100
</script>
<input 
    class = "
        p-1 m-2 
        w-1/3 
        {mainInput ? "text-2xl" : "text-xl"} 
        {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } 
        rounded-xl 
        border-2 border-primary focus:border-primary-variant focus:ring-1 focus:ring-primary-variant 
        font-sans text-center text-primary-variant placeholder-primary-variant  
        bg-background
    "
    type="number" 
    min=0 
    {id} 
    {name}  
    required 
    bind:value={inputValue} 
    {placeholder}
>
