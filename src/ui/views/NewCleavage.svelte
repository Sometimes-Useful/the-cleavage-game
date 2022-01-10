<script lang="ts">
    import { LaunchCleavageEvent } from "../../domain/events/launchCleavage/LaunchCleavageEvent";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
    const onClickNewClivageButton = () => $applicationEventStore = new LaunchCleavageEvent(newCleavageTitle)
    const onClickCancelButton = () => {newCleavageTitle = ""}
    let newCleavageTitle:string
</script>

<div class="flex flex-col w-full items-center">
    <Title/>
    <TextBox id="title" name="title" mainInput={true} bind:inputValue={newCleavageTitle} placeholder="On clive sur quoi?"/>
</div>
<div class="flex flex-col w-full  items-center">
    <CleavageModule leftPercentage={0} rightPercentage={0}/>
    {#if newCleavageTitle}
        <Button onClick={onClickNewClivageButton} text="C'est parti pour les embrouilles!"/>
        <Button onClick={onClickCancelButton} text="Oh Non! Surtout pas!"/>
    {/if}
</div>
