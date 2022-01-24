<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { CancelCleavageEvent } from "../../domain/events/cancelCleavage/CancelCleavageEvent";
import type { ApplicationEvent } from "../../domain/events/GameEvent";
    import { LaunchCleavageEvent } from "../../domain/events/launchCleavage/LaunchCleavageEvent";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import { PublicCleavageEvent } from "../../domain/events/publicCleavage/PublicCleavageEvent";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, cleavageStore } from "../stores/stores";
    let newCleavageTitle:string
    const resetCleavageTitleAndSendEvent = (event:ApplicationEvent) =>{
        newCleavageTitle = ""
        applicationEventStore.set(event)
    }
    const onClickNewClivageButton = () => resetCleavageTitleAndSendEvent(new LaunchCleavageEvent(newCleavageTitle))
    const onClickCancelButton = () => resetCleavageTitleAndSendEvent(new CancelCleavageEvent())
    const onClickRandomCleavageButton = () => resetCleavageTitleAndSendEvent(new PublicCleavageEvent())
    const onClickMainMenu = () => resetCleavageTitleAndSendEvent(new NavigateEvent(InterfaceView.MAIN_MENU))
    cleavageStore.subscribe(cleavage =>  cleavage ? newCleavageTitle = cleavage.title : newCleavageTitle = "" )

</script>

<div class="flex flex-col w-full items-center">
    <Title/>
    <div class="flex flex-row">
        <TextBox id="title" name="title" mainInput={true} bind:inputValue={newCleavageTitle} placeholder="On clive sur quoi?"/>
        <Button onClick={onClickRandomCleavageButton} size="large" text="🎲"/>
    </div>
</div>
<div class="flex flex-col w-full items-center">
    <CleavageModule cleaveLeft={0} cleaveRight={0} notCleave={0} totalCleave={0}/>
</div>
<div class="flex flex-col w-full  items-center">
    
    {#if newCleavageTitle}
        <Button onClick={onClickNewClivageButton} text="C'est parti pour les embrouilles!"/>
        <Button onClick={onClickCancelButton} text="Oh Non! Surtout pas!"/>
    {/if}
    <Button onClick={onClickMainMenu} text="Menu Principal!"/>
</div>
