<script lang="ts">
    import Cleave from "../text/cleave.svelte";
    import NotCleave from "../text/notCleave.svelte";
    export let cleaveLeft:number
    export let cleaveRight:number
    export let notCleave:number
    export let totalCleave:number
</script>
<div class="flex w-full flex-row justify-evenly">
    <Cleave rotate="+" text="GÔCHE" color="Red" cleave = {cleaveLeft} {totalCleave}  />
    <NotCleave {notCleave}/>
    <Cleave rotate="-" text="DROUATE" color="Blue" cleave = {cleaveRight} {totalCleave}/>
</div>

