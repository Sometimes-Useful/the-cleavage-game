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
    import { applicationEventStore, gamePhaseStore } from "../../stores/stores";
    import Autoplay from "../autoplay/autoplay.svelte";
    import Button from "../button/button.svelte";
    export let newCleavage:Cleavage
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
</script>
<div class="flex flex-col w-full  items-center">
    {#if $gamePhaseStore === GamePhase.CLEAVING}
        <Button onClick={onClickNewCleavageButton} text="Nouveau clivage!"/>
    {/if}
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}
        <Button onClick={onClickRandomCleavageButton} size="large" text="🎲"/>
        {#if newCleavage.title.length > 0 && newCleavage.leftChoice.name.length > 0 && newCleavage.rightChoice.name.length > 0 }
            <Button onClick={onClickLaunchCleavageButton} text="C'est parti pour les embrouilles!"/>
            <Button onClick={onClickCancelButton} text="Oh Non! Surtout pas!"/>
        {/if}
    {/if}
    <Button onClick={onClickMainMenu} text="Menu Principal!"/>
    <Autoplay/>
</div>


