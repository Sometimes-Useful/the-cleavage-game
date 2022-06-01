<script lang="ts">
    import { beforeUpdate } from "svelte";
    export let inputValue:string
    export let type:"text"|"password"|"textarea" = "text"
    export let placeholder:string
    export let id:string
    export let name:string
    export let size:"medium"|"large" = "medium"
    export let onChange: ()=>void = ()=>{}
    export let onInput: ()=>void = ()=>{}
    const padding = "p-2"
    const margin = "m-2"
    let rows:number
    const maxStringPerLine = 30
    const rotatizer = Math.random() * 100
    beforeUpdate(()=> {
        if (type === "textarea") {
            let roundedRows = Math.round(inputValue.length/maxStringPerLine);
            rows = roundedRows < 1 ? 1 : roundedRows
        }
    })
</script>
{#if type === "textarea"}
    <textarea class = "
        {padding}
        {margin}
        {size === "large" ? "text-2xl" : "text"}  
        {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } 
        rounded-xl 
        border-2 border-primary focus:border-primary 
        text-primary-variant placeholder-primary-variant  bg-background font-sans text-center" 
        {id} {name} {rows} cols={maxStringPerLine} required bind:value={inputValue} {placeholder} autocomplete='new-password' 
        on:change={onChange} on:input={onInput}
    ></textarea>
{:else if type === "text"}
    <input class = "
        {padding} 
        {margin}
        {size === "large" ? "text-2xl" : "text"} 
        {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } 
        rounded-xl 
        border-2 border-primary focus:border-primary focus:ring-1 focus:ring-primary 
        font-sans text-center text-primary-variant placeholder-primary-variant 
        bg-background"
        type="text" 
        {id} {name} required bind:value={inputValue} {placeholder} 
        on:change={onChange} on:input={onInput}
    >
{:else if type === "password"}
    <input class = "
        {padding}
        {margin}
        {size === "large" ? "text-2xl" : "text"} 
        {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } 
        rounded-xl 
        border-2 border-primary focus:border-primary focus:ring-1 focus:ring-primary 
        font-sans text-center text-primary-variant placeholder-primary-variant
        bg-background "
        type="password"
        {id} {name}  required bind:value={inputValue} {placeholder}  autocomplete={type === "password" ? 'new-password':null}
        on:change={onChange}
    >
{/if}
