<script lang="ts">
    import { onMount } from "svelte";
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import type { StreamerDto } from "../../domain/entities/StreamerDto";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import { RefreshRegisteredStreamersEvent } from "../../domain/events/refreshRegisteredStreamers/RefreshRegisteredStreamers";
    import Button from "../components/button/button.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte";
    import { applicationEventStore,listOfRegisteredStreamersStore } from "../stores/stores";
    onMount(()=>applicationEventStore.set(new RefreshRegisteredStreamersEvent()))
    const getArrChunks = (list:StreamerDto[], maxPerRow:number) => {
        let ret:StreamerDto[][] = [];
        let max = Math.floor(list.length / maxPerRow);
        if ((list.length % maxPerRow) > 0) max++;
        for (let i = list.length - maxPerRow; i > -maxPerRow; i -= maxPerRow) {
            ret[(max--)-1] = list.splice(i, maxPerRow);
        }
        return ret;
    };
    const maxStreamersPerRow = 5
</script>
<main class="bg-background h-full w-full flex flex-col justify-evenly">
    <div class="flex flex-col w-full items-center">
        <Title/>
        <Subtitle subtitle="Les streamers qui jouent au jeu du clivage."/>
    </div>
    <div class="flex flex-col w-full items-center">
        {#each getArrChunks($listOfRegisteredStreamersStore,maxStreamersPerRow) as rowOfStreamers}
            <div class="flex flex-row w-full justify-evenly">
                {#each rowOfStreamers as streamer}
                    <div class="text-primary">{streamer.username}</div>
                {/each}
            </div>
            
        {/each}
    </div>
    <div class="flex flex-col w-full  items-center">
        <Button emphasis="high" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))} text="Menu Principal"/>
    </div>
</main>