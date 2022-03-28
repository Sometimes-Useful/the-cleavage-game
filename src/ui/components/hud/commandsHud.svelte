<script lang="ts">
    import { Cleavage } from "../../../domain/entities/Cleavage";
    import { GamePhase } from "../../../domain/entities/GamePhase";
    import { InterfaceView } from "../../../domain/entities/InterfaceView";
    import { CancelCleavageEvent } from "../../../domain/events/cancelCleavage/CancelCleavageEvent";
    import { DrawCleavageEvent } from "../../../domain/events/drawCleavage/DrawCleavageEvent";
    import type { ApplicationEvent } from "../../../domain/events/GameEvent";
    import { LaunchCleavageEvent } from "../../../domain/events/launchCleavage/LaunchCleavageEvent";
    import { NavigateEvent } from "../../../domain/events/navigateEvent/NavigateEvent";
    import { NewCleavageEvent } from "../../../domain/events/newCleavage/NewCleavageEvent";
    import { applicationEventStore, currentCleavageStore, gamePhaseStore } from "../../stores/stores";
    import Autoplay from "../autoplay/autoplay.svelte";
    import Button from "../button/button.svelte";
    import TextBox from "../inputs/textBox.svelte";
    let newCleavage:Cleavage
    const defaultCleavage = () => new Cleavage({title:"",leftChoice:{name:"Gôche",players:[]},rightChoice: {name:"Drouate",players:[]},players:[]})
    const resetCleavageTitleAndSendEvent = (event:ApplicationEvent) =>{
            newCleavage = defaultCleavage()
            applicationEventStore.set(event)
        }
    const onClickLaunchCleavageButton = () => resetCleavageTitleAndSendEvent(new LaunchCleavageEvent(newCleavage.title,newCleavage.leftChoice.name,newCleavage.rightChoice.name))
    const onClickNewCleavageButton = () => $applicationEventStore = new NewCleavageEvent()
    const onClickCancelButton = () => resetCleavageTitleAndSendEvent(new CancelCleavageEvent())
    const onClickRandomCleavageButton = () => resetCleavageTitleAndSendEvent(new DrawCleavageEvent())
    const onClickMainMenu = () => resetCleavageTitleAndSendEvent(new NavigateEvent(InterfaceView.MAIN_MENU))
    currentCleavageStore.subscribe(currentCleavage =>  {
        console.log("UPDATED CURRENT CLEAVAGE STORE")
        newCleavage = currentCleavage ? currentCleavage :defaultCleavage()
    })
</script>
<div id="commandHud" class="flex flex-row w-full px-2 pb-2 pt-1">
    {#if $gamePhaseStore === GamePhase.CLEAVING}
        <div class="flex flex-col w-full items-start">
        </div> 
        <div class="flex flex-col w-full items-center">
            <Button onClick={onClickNewCleavageButton} text="Nouveau clivage!"/>
        </div> 
        <div class="flex flex-col w-full items-end justify-end">
            <Autoplay/>
        </div>
    {/if}
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}
        <div class="flex flex-col w-full items-start justify-end">
            <Button onClick={onClickMainMenu} text="Menu Principal!"/>
        </div>
        <div class="flex flex-col w-full items-center">
            {#if !$currentCleavageStore}
                <TextBox id="title" name="title" type="textarea" mainInput={true} bind:inputValue={newCleavage.title} placeholder="On clive sur quoi?"/>
                <div class="flex flex-row items-center">
                    <TextBox id="leftChoice" name="leftChoice" placeholder="Choix?" bind:inputValue={newCleavage.leftChoice.name}/>
                    <TextBox id="rightChoice" name="rightChoice" placeholder="Choix?" bind:inputValue={newCleavage.rightChoice.name}/>    
                </div>
            {/if}
            <div class="flex flex-row w-full items-center justify-center">
                {#if newCleavage.title.length > 0 && newCleavage.leftChoice.name.length > 0 && newCleavage.rightChoice.name.length > 0 }
                    <Button onClick={onClickLaunchCleavageButton} text="Let'z go!" wfull={true}/>
                    <Button onClick={onClickRandomCleavageButton} size="large" text="🎲"/>
                    <Button onClick={onClickCancelButton} text="heu... non 😅"  wfull={true}/>
                {:else}
                    <Button onClick={onClickRandomCleavageButton} size="large" text="🎲"/>
                {/if}
            </div> 
        </div>
        <div class="flex flex-col w-full items-end justify-end">
            <Autoplay/>
        </div>
    {/if}
</div>


