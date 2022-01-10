<script lang="ts">
    import Cleave from "../text/cleave.svelte";
    export let leftPercentage:number
    export let rightPercentage:number
</script>
<div class="flex w-full flex-row justify-evenly">
    <Cleave rotate="+" text="GÔCHE" color="Red" percentage={leftPercentage}/>
    <Cleave rotate="-" text="DROUATE" color="Blue" percentage={rightPercentage}/>
</div>

