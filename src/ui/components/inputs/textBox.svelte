<script lang="ts">
    export let inputValue:string
    export let type:"text"|"password"|"textarea" = "text"
    export let placeholder:string
    export let id:string
    export let name:string
    export let mainInput = false
    const maxStringPerLine = 22
    const rotatizer = Math.random() * 100
</script>
{#if type === "text"}
    <input class = "p-1 {mainInput ? "m-5 text-2xl" : "m-5 text-xl"} {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } rounded-xl border-[#fbff00] focus:border-[#2eff12] focus:ring-1 focus:ring-[#2eff12] text-white  placeholder-white border-2 bg-black font-sans text-center " type="text" {id} {name} required bind:value={inputValue} {placeholder}>
{/if}
{#if type === "password"}
    <input class = "p-1 {mainInput ? "m-5 text-2xl" : "m-5 text-xl"} {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } rounded-xl border-[#fbff00] focus:border-[#2eff12] text-white placeholder-white border-2 bg-black font-sans text-center" type="password" {id} {name}  required bind:value={inputValue} {placeholder} autocomplete='new-password'>
{/if}
{#if type === "textarea"}
    <textarea class = "p-1 {mainInput ? "m-5 text-2xl" : "m-5 text-xl"} {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } rounded-xl border-[#fbff00] focus:border-[#2eff12] text-white placeholder-white border-2 bg-black font-sans text-center" {id} {name} rows={Math.ceil(inputValue.length/maxStringPerLine)} cols={maxStringPerLine} required bind:value={inputValue} {placeholder} autocomplete='new-password'></textarea>
{/if}
