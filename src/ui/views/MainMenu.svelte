<script lang="ts">
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Button from "../components/button/button.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
    const onClickButton = () => $applicationEventStore = new NewCleavageEvent()
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle="Connectes-toi sur ta chaine Twitch pour faire participer tes viewers !!!"/>
</div>
<div class="flex flex-col w-full items-center">
    <Button text="Jouer!" size="large" onClick={onClickButton}/>
</div>
