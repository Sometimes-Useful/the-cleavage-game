<script lang="ts">
    import { beforeUpdate } from "svelte";
    import type { Choice } from "../../../domain/entities/Choice";
    import type { Player } from "../../../domain/entities/Player";
    import Cleave from "../text/cleave.svelte";
    import NotCleave from "../text/notCleave.svelte";
    export let cleaveLeftChoice:Choice
    export let cleaveRightChoice:Choice
    export let players:Player[]
    export let editMode:boolean=false
    let totalCleave:number
    let notCleave:number
    beforeUpdate(()=> {
        totalCleave = cleaveLeftChoice.players.length + cleaveRightChoice.players.length
        notCleave = players.length - totalCleave
    })
</script>
<div class="flex w-full flex-row justify-evenly">
    <Cleave rotate="+" bind:text={cleaveLeftChoice.name} color="Red" cleave = {cleaveLeftChoice.players.length} {totalCleave} {editMode} />
    <NotCleave {notCleave}/>
    <Cleave rotate="-" bind:text={cleaveRightChoice.name} color="Blue" cleave = {cleaveRightChoice.players.length} {totalCleave} {editMode}/>
</div>

