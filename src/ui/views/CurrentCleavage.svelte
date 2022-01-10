<script lang="ts">
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, cleavageStore } from "../stores/stores";
    let leftPercentage:number
    let rightPercentage:number
    cleavageStore.subscribe(cleavage => {
        console.log("cleavageStore","UPDATE ON CURRENT CLEAVAGE",cleavage)
        let totalCleave = cleavage.cleaveLeft + cleavage.cleaveRight
        leftPercentage = totalCleave === 0 ? 0 : $cleavageStore.cleaveLeft / totalCleave *100
        rightPercentage = totalCleave === 0 ? 0 : $cleavageStore.cleaveRight / totalCleave *100
    })
    const onClickButton = () => $applicationEventStore = new NewCleavageEvent()
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle={$cleavageStore.title}/>
</div>
<div class="flex flex-col w-full  items-center">
    <CleavageModule {leftPercentage} {rightPercentage}/>
    <Button onClick={onClickButton} text="Nouveau clivage!"/>
</div>