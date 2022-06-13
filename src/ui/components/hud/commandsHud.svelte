<script lang="ts">
    import { afterUpdate } from "svelte";
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
    const onCustomCleavageTitleChange = () => {customCleavageTitle = newCleavage.title}
    const onClickLaunchCleavageButton = () => resetCleavageTitleAndSendEvent(new LaunchCleavageEvent(newCleavage.title,newCleavage.leftChoice.name,newCleavage.rightChoice.name))
    const onClickNewCleavageButton = () => $applicationEventStore = new NewCleavageEvent()
    const onClickCancelButton = () => resetCleavageTitleAndSendEvent(new CancelCleavageEvent())
    const onClickRandomCleavageButton = () => resetCleavageTitleAndSendEvent(new DrawCleavageEvent())
    const onClickMainMenu = () => resetCleavageTitleAndSendEvent(new NavigateEvent(InterfaceView.MAIN_MENU))
    const shouldCleave = (cleavage:Cleavage)=> cleavage.title.length > 0 && cleavage.leftChoice.name.length > 0 && cleavage.rightChoice.name.length > 0
    currentCleavageStore.subscribe(currentCleavage =>  {
        newCleavage = currentCleavage ? currentCleavage :defaultCleavage()
    })
</script>
<div id={commandHudId} class="flex flex-row w-full justify-center p-2">
    {#if $gamePhaseStore === GamePhase.CLEAVING}
        <div class="flex flex-col justify-between bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-20 drop-shadow">
            <Button onClick={onClickNewCleavageButton} emphasis="high" text="Nouveau clivage"/>
            {#if $autoplayStore }
                <Button  margin="m-1"onClick={onClickStopAutoPlay} emphasis="medium" text="Stop Auto Play" />
            {:else}
                <div class="flex flex-row justify-end">
                    <InputNumber margin="m-1" width="w-1/6" id="autoPlayTime" name="autoPlayTime" placeholder="Cycle autoplay" bind:inputValue={autoplayMinutes}/>
                    <Button margin="m-1" width="w-1/3" onClick={onClickStartAutoPlay} emphasis="medium" text="Auto Play"/>
                </div>
            {/if}
        </div> 
    {/if}
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}
        <div class="flex flex-row justify-center p-1 bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-20 drop-shadow">
            <div class="flex flex-col {customCleavageTitle.length === 0 && !$currentCleavageStore ?"justify-end":"justify-between"} content-start w-1/4">
                {#if !$currentCleavageStore && customCleavageTitle.length > 0}<TextBox margin="m-1" id="leftChoice" name="leftChoice" placeholder="Choix?" bind:inputValue={newCleavage.leftChoice.name}/>{/if} 
                {#if shouldCleave(newCleavage) }<Button margin="m-1" onClick={onClickLaunchCleavageButton} emphasis="high" text="⭐️ Cliver ⭐️"  />{/if}
                <Button onClick={onClickMainMenu} margin="m-1" emphasis="medium" text="Menu Principal"/>
            </div>
            <div class="flex flex-col justify-between items-center w-1/2">
                {#if customCleavageTitle.length === 0}<Button margin="m-1" width="w-1/2" onClick={onClickRandomCleavageButton} emphasis="high" text="🎲 Piocher 🎲" />{/if}
                {#if !$currentCleavageStore }<TextBox  margin="m-1" width="w-full" height="h-full" id="title" name="title" type="textarea"  bind:inputValue={newCleavage.title} onInput={onCustomCleavageTitleChange} placeholder="Proposer un nouveau clivage"/>{/if}
            </div>
            <div class="flex flex-col {customCleavageTitle.length === 0 && !$currentCleavageStore ?"justify-end":"justify-between"} content-end w-1/4">
                {#if !$currentCleavageStore && customCleavageTitle.length > 0}<TextBox margin="m-1" id="rightChoice" name="rightChoice" placeholder="Choix?" bind:inputValue={newCleavage.rightChoice.name}/> {/if} 
                {#if shouldCleave(newCleavage) }<Button margin="m-1" onClick={onClickCancelButton} emphasis="medium" text="❌ Refuser"/>  {/if}
                {#if $autoplayStore }
                    <Button  margin="m-1"onClick={onClickStopAutoPlay} emphasis="medium" text="Stop Auto Play" />
                {:else}
                    <div class="flex flex-row justify-end">
                        <InputNumber margin="m-1" width="w-1/3" id="autoPlayTime" name="autoPlayTime" placeholder="Cycle autoplay" bind:inputValue={autoplayMinutes}/>
                        <Button margin="m-1" width="w-full" onClick={onClickStartAutoPlay} emphasis="medium" text="Auto Play"/>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>


