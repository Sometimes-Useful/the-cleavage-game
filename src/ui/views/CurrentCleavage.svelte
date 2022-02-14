<script lang="ts">
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Paragraph from "../components/text/paragraph.svelte";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, currentCleavageStore } from "../stores/stores";
    import type { Choice } from "../../domain/entities/Choice";
    import type { Player } from "../../domain/entities/Player";
    import Autoplay from "../components/autoplay/autoplay.svelte";
    let title:string
    let players:Player[]
    let cleaveLeftChoice:Choice
    let cleaveRightChoice:Choice
    let viewersCleaveText:string
    const onClickButton = () => $applicationEventStore = new NewCleavageEvent()
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
    <Subtitle subtitle={title}/>
    <Paragraph text={viewersCleaveText} center={true}/>
</div>
<div class="flex flex-col w-full items-center">
    <CleavageModule {cleaveLeftChoice} {cleaveRightChoice} {players}/>
</div>
<div class="flex flex-col w-full items-center">
    <Button onClick={onClickButton} text="Nouveau clivage!"/>
</div>
<Autoplay newCleavage={undefined}/>