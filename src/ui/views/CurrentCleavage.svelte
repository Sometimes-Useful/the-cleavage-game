<script lang="ts">
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Button from "../components/button/button.svelte";
    import Cleave from "../components/text/cleave.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, cleavageStore } from "../stores/stores";
    const totalCleave = $cleavageStore.cleaveLeft + $cleavageStore.cleaveRight
    let leftPercentage = totalCleave === 0 ? 0 : $cleavageStore.cleaveLeft / totalCleave *100
    let rightPercentage = totalCleave === 0 ? 0 : $cleavageStore.cleaveRight / totalCleave *100
    const onClickButton = () => $applicationEventStore = new NewCleavageEvent()
</script>

<main>
	<Title/>
    <Subtitle subtitle={$cleavageStore.title}/>
    <Cleave text="GÔCHE" percentage={leftPercentage}/><Cleave text="DROUATE" percentage={rightPercentage}/>
    <Button onClick={onClickButton} text="Nouveau clivage!"/>
</main>

<style>

</style>