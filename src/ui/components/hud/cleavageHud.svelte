<script lang="ts">
    import type { Choice } from "../../../domain/entities/Choice";
    import type { Cleavage } from "../../../domain/entities/Cleavage";
import { GamePhase } from "../../../domain/entities/GamePhase";
    import type { Player } from "../../../domain/entities/Player";
    import { currentCleavageStore, gamePhaseStore } from "../../stores/stores";
    import CleavageModule from "../cleavage/cleavageModule.svelte";
    import TextBox from "../inputs/textBox.svelte";
    import Paragraph from "../text/paragraph.svelte";
    import Subtitle from "../text/subtitle.svelte";
    import Title from "../text/title.svelte";
    export let newCleavage:Cleavage
    let title:string
    let players:Player[]
    let cleaveLeftChoice:Choice
    let cleaveRightChoice:Choice
    let viewersCleaveText:string
    currentCleavageStore.subscribe(cleavage => {
        if(cleavage) {
            players = cleavage.players
            cleaveLeftChoice = cleavage.leftChoice
            cleaveRightChoice = cleavage.rightChoice
            title = cleavage.title
            viewersCleaveText = `${cleaveLeftChoice.players.length + cleaveRightChoice.players.length }/${players.length} joueurs ont clivés`
        }
    })   

</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    {#if $gamePhaseStore === GamePhase.CLEAVING}
        <Subtitle subtitle={title}/>
        <Paragraph text={viewersCleaveText} center={true}/>
        <CleavageModule {cleaveLeftChoice} {cleaveRightChoice} {players}/>
    {/if}
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}
        <div class="flex flex-col items-center">
            <TextBox id="title" name="title" type={`${newCleavage?.title.length > 20 ? "textarea" : "text"}`} mainInput={true} bind:inputValue={newCleavage.title} placeholder="On clive sur quoi?"/>
        </div>
        {#if $currentCleavageStore}
            <CleavageModule cleaveLeftChoice={newCleavage.leftChoice} cleaveRightChoice={newCleavage.rightChoice} players={newCleavage.players}/>
        {:else}
            <CleavageModule bind:cleaveLeftChoice={newCleavage.leftChoice} bind:cleaveRightChoice={newCleavage.rightChoice} players={newCleavage.players} editMode={true}/>
        {/if}
    {/if}
</div>