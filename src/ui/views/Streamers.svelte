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
    const getArrChunks = (streamers:StreamerDto[], maxPerRow:number) => {
        const chunked:StreamerDto[][] = [];
        let i = 0
        while(i<streamers.length) chunked.push(streamers.slice(i,i +=maxPerRow))
        return chunked;
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
            <div class="flex flex-row w-3/4 justify-between">
                {#each rowOfStreamers as streamer}
                    <div class="text-primary text-center p-2 m-2 w-1/5 bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-20 drop-shadow">{streamer.username}</div>
                {/each}
            </div>
        {/each}
    </div>
    <div class="flex flex-col w-full  items-center">
        <Button emphasis="high" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))} text="Menu Principal"/>
    </div>
</main>