<script lang="ts">
    import { LaunchCleavageEvent } from "../../domain/events/launchCleavage/LaunchCleavageEvent";
    import Button from "../components/button/button.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import Cleave from "../components/text/cleave.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
    const defaultPercentage:number =0
    const onClickNewClivageButton = () => $applicationEventStore = new LaunchCleavageEvent(newCleavageTitle)
    const onClickCancelButton = () => {newCleavageTitle = ""}
    let newCleavageTitle:string
    
</script>

<main>
	<Title/>
    <TextBox bind:inputValue={newCleavageTitle}/>
    <Cleave text="GÔCHE" percentage={defaultPercentage}/><Cleave text="DROUATE" percentage={defaultPercentage}/>
    {#if newCleavageTitle}
        <Button onClick={onClickNewClivageButton} text="C'est parti pour les embrouilles!"/>
        <Button onClick={onClickCancelButton} text="Oh Non! Surtout pas!"/>
    {/if}
    
</main>
<style>

</style>