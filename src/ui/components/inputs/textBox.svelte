<script lang="ts">
    import { beforeUpdate } from "svelte";
    export let inputValue:string
    export let type:"text"|"password"|"textarea" = "text"
    export let placeholder:string
    export let id:string
    export let name:string
    export let mainInput = false
    export let onChange: ()=>void = ()=>{}
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
    <textarea class = "p-1 {mainInput ? "m-5 text-2xl" : "m-5 text-xl"} {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } rounded-xl border-low-emphasis focus:border-medium-emphasis text-no-emphasis placeholder-no-emphasis border-2 bg-dark-background font-sans text-center" {id} {name} {rows} cols={maxStringPerLine} required bind:value={inputValue} {placeholder} autocomplete='new-password' on:change={onChange}></textarea>
{:else if type === "text"}
    <input class = "p-1 {mainInput ? "m-5 text-2xl" : "m-5 text-xl"} {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } rounded-xl border-low-emphasis focus:border-medium-emphasis focus:ring-1 focus:ring-medium-emphasis text-no-emphasis placeholder-no-emphasis border-2 bg-dark-background font-sans text-center" type="text" {id} {name}  required bind:value={inputValue} {placeholder} on:change={onChange}>
{:else if type === "password"}
    <input class = "p-1 {mainInput ? "m-5 text-2xl" : "m-5 text-xl"} {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } rounded-xl border-low-emphasis focus:border-medium-emphasis focus:ring-1 focus:ring-medium-emphasis text-no-emphasis placeholder-no-emphasis border-2 bg-dark-background font-sans text-center" type="password" {id} {name}  required bind:value={inputValue} {placeholder} on:change={onChange} autocomplete={type === "password" ? 'new-password':null}>
{/if}
