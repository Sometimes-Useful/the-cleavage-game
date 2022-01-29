<script lang="ts">
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Paragraph from "../components/text/paragraph.svelte";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, cleavageStore } from "../stores/stores";
    import { PlayerCleave } from "../../domain/entities/PlayerCleave";
    let title:string
    let totalPlayers:number
    let cleaveLeft:number
    let cleaveRight:number
    let notCleave:number
    let viewersCleaveText:string
    let totalCleave:number
    cleavageStore.subscribe(cleavage => {
        if(cleavage) {
            totalPlayers = 0
            notCleave = 0
            cleaveLeft = 0
            cleaveRight = 0
            totalCleave = 0
            cleavage.cleaves.forEach((cleave,player) => {
                totalPlayers++
                if(cleave === PlayerCleave.NOTHING) notCleave++
                if(cleave === PlayerCleave.LEFT) cleaveLeft++
                if(cleave === PlayerCleave.RIGHT) cleaveRight++
            })
            title = cleavage.title
            totalCleave = totalPlayers - notCleave
            viewersCleaveText = `${totalCleave}/${totalPlayers} viewers ont clivés`
        }
    })
    const onClickButton = () => $applicationEventStore = new NewCleavageEvent()
    
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle={title}/>
    <Paragraph text={viewersCleaveText} center={true}/>
</div>
<div class="flex flex-col w-full items-center">
    <CleavageModule {cleaveLeft} {cleaveRight} {notCleave} {totalCleave}/>
</div>
<div class="flex flex-col w-full items-center">
    <Button onClick={onClickButton} text="Nouveau clivage!"/>
</div>