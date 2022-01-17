<script lang="ts">
import { InterfaceView } from "../../domain/entities/InterfaceView";

    import { CancelCleavageEvent } from "../../domain/events/cancelCleavage/CancelCleavageEvent";
    import { LaunchCleavageEvent } from "../../domain/events/launchCleavage/LaunchCleavageEvent";
import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import { PublicCleavageEvent } from "../../domain/events/publicCleavage/PublicCleavageEvent";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, cleavageStore } from "../stores/stores";
    const onClickNewClivageButton = () => applicationEventStore.set(new LaunchCleavageEvent(newCleavageTitle))
    const onClickCancelButton = () => applicationEventStore.set(new CancelCleavageEvent())
    const onClickRandomCleavageButton = () => applicationEventStore.set(new PublicCleavageEvent())
    const onClickMainMenu = () => applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))
    let newCleavageTitle:string
    cleavageStore.subscribe(cleavage => {
        if(cleavage) newCleavageTitle = cleavage.title
        else newCleavageTitle = ""
    })

</script>

<div class="flex flex-col w-full items-center">
    <Title/>
    <div class="flex flex-row">
        <TextBox id="title" name="title" mainInput={true} bind:inputValue={newCleavageTitle} placeholder="On clive sur quoi?"/>
        <Button onClick={onClickRandomCleavageButton} size="large" text="🎲"/>
    </div>
</div>
<div class="flex flex-col w-full  items-center">
    <CleavageModule leftPercentage={0} rightPercentage={0}/>
    {#if newCleavageTitle}
        <Button onClick={onClickNewClivageButton} text="C'est parti pour les embrouilles!"/>
        <Button onClick={onClickCancelButton} text="Oh Non! Surtout pas!"/>
    {/if}
    <Button onClick={onClickMainMenu} text="Menu Principal!"/>
</div>
