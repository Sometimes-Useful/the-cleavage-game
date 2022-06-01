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
    import { StartAutoPlayEvent } from "../../../domain/events/startAutoPlay/StartAutoPlayEvent";
    import { StopAutoplayEvent } from "../../../domain/events/stopAutoplay/StopAutoplayEvent";
    import { applicationEventStore, autoplayStore, currentCleavageStore, gamePhaseStore } from "../../stores/stores";
    import Button from "../button/button.svelte";
    import InputNumber from "../inputs/inputNumber.svelte";
    import TextBox from "../inputs/textBox.svelte";
import { commandHudId } from "./commandsHud";
    let newCleavage:Cleavage
    let customCleavageTitle:string = ""
    let autoplayMinutes:number = 3
    const defaultCleavage = () => new Cleavage({title:"",leftChoice:{name:"Gôche",players:[]},rightChoice: {name:"Drouate",players:[]},players:[]})
    const resetCleavageTitleAndSendEvent = (event:ApplicationEvent) =>{
            newCleavage = defaultCleavage()
            customCleavageTitle = newCleavage.title
            applicationEventStore.set(event)
        }
    const onClickStartAutoPlay = () => resetCleavageTitleAndSendEvent(new StartAutoPlayEvent(autoplayMinutes))
    const onClickStopAutoPlay = () => resetCleavageTitleAndSendEvent(new StopAutoplayEvent())
    const onCustomCleavageTitleChange = () => {
         customCleavageTitle = newCleavage.title
    }
    const onClickLaunchCleavageButton = () => resetCleavageTitleAndSendEvent(new LaunchCleavageEvent(newCleavage.title,newCleavage.leftChoice.name,newCleavage.rightChoice.name))
    const onClickNewCleavageButton = () => $applicationEventStore = new NewCleavageEvent()
    const onClickCancelButton = () => resetCleavageTitleAndSendEvent(new CancelCleavageEvent())
    const onClickRandomCleavageButton = () => resetCleavageTitleAndSendEvent(new DrawCleavageEvent())
    const onClickMainMenu = () => resetCleavageTitleAndSendEvent(new NavigateEvent(InterfaceView.MAIN_MENU))
    currentCleavageStore.subscribe(currentCleavage =>  {
        newCleavage = currentCleavage ? currentCleavage :defaultCleavage()
    })
</script>
<div id={commandHudId} class="flex flex-row w-full justify-center p-1">
    {#if $gamePhaseStore === GamePhase.CLEAVING}

        <div class="flex flex-row justify-between">
            <Button onClick={onClickNewCleavageButton} emphasis="high" text="Nouveau clivage"/>
            {#if $autoplayStore }
                <Button onClick={onClickStopAutoPlay} emphasis="medium" text="Stop Auto Play"/>
            {:else}
                <Button onClick={onClickStartAutoPlay} emphasis="medium" text="Start Auto Play"/>
                <InputNumber id="autoPlayTime" name="autoPlayTime" placeholder="Cycle autoplay" bind:inputValue={autoplayMinutes}/>
            {/if}
        </div> 
    {/if}
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}
        <div class="flex flex-col justify-center">
            <div class="flex flex-row justify-between justify-items-stretch">
                {#if newCleavage.title.length > 0 && newCleavage.leftChoice.name.length > 0 && newCleavage.rightChoice.name.length > 0 }
                    <Button onClick={onClickLaunchCleavageButton} emphasis="high" text="Cliver" />
                    <Button onClick={onClickCancelButton} emphasis="medium" text="Refuser"  />  
                {/if}
            </div>
            <div class="flex flex-row {customCleavageTitle.length === 0 && !$currentCleavageStore ? "justify-between" : "justify-center"}">
                {#if customCleavageTitle.length === 0}
                    <Button onClick={onClickRandomCleavageButton} emphasis="high" text="🎲 Piocher un clivage 🎲"/>
                {/if}
                {#if !$currentCleavageStore}
                    <TextBox id="title" name="title" type="textarea" bind:inputValue={newCleavage.title} onInput={onCustomCleavageTitleChange} placeholder="Proposer un nouveau clivage"/>
                {/if}
            </div>    
            <div class="flex flex-row justify-between">
                {#if customCleavageTitle.length > 0}
                <TextBox id="leftChoice" name="leftChoice" placeholder="Choix?" bind:inputValue={newCleavage.leftChoice.name}/>
                <TextBox id="rightChoice" name="rightChoice" placeholder="Choix?" bind:inputValue={newCleavage.rightChoice.name}/>   
                {/if}  
            </div>
            <div class="flex flex-row justify-between">
                <Button onClick={onClickMainMenu} emphasis="medium" text="Menu Principal"/>
                {#if $autoplayStore }
                    <Button onClick={onClickStopAutoPlay} emphasis="medium" text="Stop Auto Play"/>
                {:else}
                    <Button onClick={onClickStartAutoPlay} emphasis="medium" text="Start Auto Play"/>
                    <InputNumber id="autoPlayTime" name="autoPlayTime" placeholder="Cycle autoplay" bind:inputValue={autoplayMinutes}/>
                {/if}
            </div>
        </div>
    {/if}
</div>


