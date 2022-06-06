<script lang="ts">
    import { beforeUpdate } from "svelte";
    import type { Choice } from "../../../domain/entities/Choice";
    import CleavageInformation from "../text/cleavageInformation.svelte";
    import Cleave from "../text/cleave.svelte";
    export let cleaveLeftChoice:Choice
    export let cleaveRightChoice:Choice
    export let players:number
    let totalCleave:number
    beforeUpdate(()=> {
        totalCleave = cleaveLeftChoice.players.length + cleaveRightChoice.players.length
    })
</script>
<div class="flex w-full flex-row">
    <Cleave choiceType="Left" bind:text={cleaveLeftChoice.name} cleave = {cleaveLeftChoice.players.length} {totalCleave}/>
    <CleavageInformation {players} {cleaveLeftChoice} {cleaveRightChoice} />
    <Cleave choiceType="Right" bind:text={cleaveRightChoice.name} cleave = {cleaveRightChoice.players.length} {totalCleave}/>
</div>

