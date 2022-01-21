<script lang="ts">
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Paragraph from "../components/text/paragraph.svelte";
    import Button from "../components/button/button.svelte";
    import CleavageModule from "../components/cleavage/cleavageModule.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, cleavageStore } from "../stores/stores";
    let leftPercentage:number
    let rightPercentage:number
    let title:string
    let totalCleave:number
    let viewersCleaveText:string
    cleavageStore.subscribe(cleavage => {
        if(cleavage) {
            console.log("cleavageStore","UPDATE ON CURRENT CLEAVAGE",cleavage)
            totalCleave = cleavage.cleaveLeft + cleavage.cleaveRight
            leftPercentage = totalCleave === 0 ? 0 : cleavage.cleaveLeft / totalCleave *100
            rightPercentage = totalCleave === 0 ? 0 : cleavage.cleaveRight / totalCleave *100
            title = cleavage.title
            viewersCleaveText = totalCleave === 1 ? `${totalCleave} viewer a clivé` : `${totalCleave} viewers ont clivés`
        }
    })
    const onClickButton = () => $applicationEventStore = new NewCleavageEvent()
    
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle={title}/>
    <Paragraph text={viewersCleaveText} center={true}/>
</div>
<div class="flex flex-col w-full items-center">
    <CleavageModule {leftPercentage} {rightPercentage}/>
</div>
<div class="flex flex-col w-full items-center">
    <Button onClick={onClickButton} text="Nouveau clivage!"/>
</div>