<script lang="ts">
    export let id:string
    export let text:string
    export let min:number = 0
    export let max:number = 100
    export let step:number = 1
    export let onInput:svelte.JSX.FormEventHandler<HTMLInputElement>
    export let value:number
</script>
<div class="flex flex-col w-full items-center p-3">
  <label for={id} class="form-label text-primary font-sans mb-2">{text} - {value}</label>
  <input
    type="range" 
    class="
        form-range appearance-none 
        border-2 rounded-md 
        w-full md:w-1/2 xl:w-1/3 h-1 
        border-primary  accent-secondary
    "
    on:input={onInput}
    {value}
    {min}
    {max}
    {step}
    {id}
  />
</div>