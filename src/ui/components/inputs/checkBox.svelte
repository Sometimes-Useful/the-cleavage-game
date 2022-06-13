<script lang="ts">
    export let checked:boolean
    export let onChange:(event:Event & { currentTarget: EventTarget & HTMLInputElement; })=>void = (event)=>{}
    export let id:string
    export let label:string
    /*
    rounded
    border-0
        bg-primary checked:bg-secondary 
        ring-0 hover:ring-2 hover:ring-secondary hover:checked:ring-primary
    */
</script>
<div class="flex flex-row w-full items-center justify-between">
    <label class="text-primary font-sans pr-2" for={id}>{@html label}</label>
    <input type="checkbox" class="accent-secondary" id={id} name={id} checked={checked} on:change={onChange}>
</div>
