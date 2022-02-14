<script lang="ts">
    export let inputValue:number
    export let placeholder:string
    export let id:string
    export let name:string
    export let mainInput = false
    const rotatizer = Math.random() * 100
</script>
<input class = "p-1 {mainInput ? "m-5 text-2xl" : "m-5 text-xl"} {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } rounded-xl border-[#fbff00] focus:border-[#2eff12] focus:ring-1 focus:ring-[#2eff12] text-white placeholder-white border-2 bg-black font-sans text-center" type="number" min=0 {id} {name}  required bind:value={inputValue} {placeholder}>
