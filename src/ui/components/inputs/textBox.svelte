<script lang="ts">
    import { beforeUpdate } from "svelte";
import type { Margin, Width } from "../tailwindClasses";
    export let inputValue:string
    export let type:"text"|"password"|"textarea" = "text"
    export let placeholder:string
    export let id:string
    export let name:string
    export let size:"medium"|"large" = "medium"
    export let height:string = ""
    export let width:Width = ""
    export let margin:Margin = "m-2"
    export let onChange: ()=>void = ()=>{}
    export let onInput: ()=>void = ()=>{}
    const padding = "p-1"
    let rows:number
    const maxStringPerLine = 30
    beforeUpdate(()=> {
        if (type === "textarea") {
            let roundedRows = Math.round(inputValue.length/maxStringPerLine);
            rows = roundedRows < 1 ? 1 : roundedRows
        }
    })
</script>
{#if type === "textarea"}
    <textarea
        class = "
            {padding}
            {margin}
            {height}
            {size === "large" ? "text-2xl" : "text"}  
            {width}
            resize-none
            rounded-t rounded-b-sm
            border-b border-primary 
            focus:border-none
            focus:outline-none
            focus:ring-1 focus:ring-secondary-variant
            font-sans text-center text-primary-variant placeholder-primary-variant 
            bg-white bg-opacity-10
        " 
        {id} {name} rows=0 cols=0 required bind:value={inputValue} {placeholder} autocomplete='new-password' 
        on:change={onChange} on:input={onInput}
    ></textarea>

{:else if type === "text" }
    <input 
        class = "
            {padding}
            {margin}
            {size === "large" ? "text-2xl" : "text"} 
            {width}
            rounded-t rounded-b-sm
            border-b border-primary 
            focus:border-none
            focus:outline-none
            focus:ring-1 focus:ring-secondary-variant
            font-sans text-center text-primary-variant placeholder-primary-variant 
            bg-white bg-opacity-10
        "
        type="text" 
        {id} {name} required bind:value={inputValue} {placeholder} 
        on:change={onChange} on:input={onInput}
    >
{:else if type === "password"}
    <input
        class = "
            {padding}
            {margin}
            {size === "large" ? "text-2xl" : "text"} 
            {width}
            rounded-t rounded-b-sm
            border-b border-primary 
            focus:border-none
            focus:outline-none
            focus:ring-1 focus:ring-secondary-variant
            font-sans text-center text-primary-variant placeholder-primary-variant 
            bg-white bg-opacity-10
        "
        type="password"
        {id} {name} required bind:value={inputValue} {placeholder} autocomplete={type === "password" ? 'new-password':null}
        on:change={onChange}
    >
{/if}
