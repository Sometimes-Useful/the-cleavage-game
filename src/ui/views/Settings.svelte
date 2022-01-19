<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import Button from "../components/button/button.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
</script>

<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle="Options"/>
</div>
<div class="flex flex-col w-full  items-center">
    <Button onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))} text="Menu Principal!"/>
</div>
