<script lang="ts">
    import  { Cleavage } from "../../domain/entities/Cleavage";
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { CancelCleavageEvent } from "../../domain/events/cancelCleavage/CancelCleavageEvent";
    import { DrawCleavageEvent } from "../../domain/events/drawCleavage/DrawCleavageEvent";
    import type { ApplicationEvent } from "../../domain/events/GameEvent";
    import { LaunchCleavageEvent } from "../../domain/events/launchCleavage/LaunchCleavageEvent";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import Autoplay from "../components/autoplay/autoplay.svelte";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, currentCleavageStore } from "../stores/stores";
    let newCleavage:Cleavage
    const resetCleavageTitleAndSendEvent = (event:ApplicationEvent) =>{
        newCleavage = defaultCleavage()
        applicationEventStore.set(event)
    }
    const defaultCleavage = () => new Cleavage("",{name:"Gôche",players:[]},{name:"Drouate",players:[]})
    const onClickNewClivageButton = () => resetCleavageTitleAndSendEvent(new LaunchCleavageEvent(newCleavage.title,newCleavage.leftChoice.name,newCleavage.rightChoice.name))
    const onClickCancelButton = () => resetCleavageTitleAndSendEvent(new CancelCleavageEvent())
    const onClickRandomCleavageButton = () => resetCleavageTitleAndSendEvent(new DrawCleavageEvent())
    const onClickMainMenu = () => resetCleavageTitleAndSendEvent(new NavigateEvent(InterfaceView.MAIN_MENU))
    currentCleavageStore.subscribe(currentCleavage =>  {
        console.log("UPDATED CURRENT CLEAVAGE STORE")
        currentCleavage 
            ? newCleavage = currentCleavage 
            : newCleavage = defaultCleavage()
    })
</script>

<div class="flex flex-col w-full items-center">
    <Title/>
    <div class="flex flex-col items-center">
        <TextBox id="title" name="title" type={`${newCleavage?.title.length > 20 ? "textarea" : "text"}`} mainInput={true} bind:inputValue={newCleavage.title} placeholder="On clive sur quoi?"/>
        <Button onClick={onClickRandomCleavageButton} size="large" text="🎲"/>
    </div>
</div>
<div class="flex flex-col w-full items-center">
    {#if $currentCleavageStore}
        <CleavageModule cleaveLeftChoice={newCleavage.leftChoice} cleaveRightChoice={newCleavage.rightChoice} players={newCleavage.players}/>
    {:else}
        <CleavageModule bind:cleaveLeftChoice={newCleavage.leftChoice} bind:cleaveRightChoice={newCleavage.rightChoice} players={newCleavage.players} editMode={true}/>
    {/if}
</div>
<div class="flex flex-col w-full  items-center">
    {#if newCleavage.title.length > 0 && newCleavage.leftChoice.name.length > 0 && newCleavage.rightChoice.name.length > 0 }
        <Button onClick={onClickNewClivageButton} text="C'est parti pour les embrouilles!"/>
        <Button onClick={onClickCancelButton} text="Oh Non! Surtout pas!"/>
    {/if}
    <Button onClick={onClickMainMenu} text="Menu Principal!"/>
</div>
<Autoplay {newCleavage}/>