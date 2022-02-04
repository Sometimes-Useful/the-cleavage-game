<script lang="ts">
    import { Cleavage } from "../../../domain/entities/Cleavage";
    import type { ApplicationEvent } from "../../../domain/events/GameEvent";
    import { StartAutoPlayEvent } from "../../../domain/events/startAutoPlay/StartAutoPlayEvent";
    import { StopAutoplayEvent } from "../../../domain/events/stopAutoplay/StopAutoplayEvent";
    import { applicationEventStore, autoplayStore } from "../../stores/stores";
    import Button from "../button/button.svelte";
    import InputNumber from "../inputs/inputNumber.svelte";
    let autoplayMinutes:number = 3
    export let newCleavage:Cleavage | undefined
    const defaultCleavage = () => new Cleavage("",{name:"Gôche",players:[]},{name:"Drouate",players:[]})
    const resetCleavageTitleAndSendEvent = (event:ApplicationEvent) =>{
        newCleavage = defaultCleavage()
        applicationEventStore.set(event)
    }
    const onClickStartAutoPlay = () => resetCleavageTitleAndSendEvent(new StartAutoPlayEvent(autoplayMinutes))
    const onClickStopAutoPlay = () => resetCleavageTitleAndSendEvent(new StopAutoplayEvent())
</script>
<div class="flex flex-col items-end">
    {#if $autoplayStore }
        <Button onClick={onClickStopAutoPlay} text="Stop Auto Play!"/>
    {:else}
        <InputNumber id="autoPlayTime" name="autoPlayTime" placeholder="Auto play time" bind:inputValue={autoplayMinutes}/>
        <Button onClick={onClickStartAutoPlay} text="Start Auto Play!"/>
    {/if}
</div>