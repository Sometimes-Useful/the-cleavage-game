<script lang="ts">
    import { credits } from "../../domain/entities/credits";
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import Button from "../components/button/button.svelte";
    import Paragraph from "../components/text/paragraph.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
    const teamDescription = `Lead Developer - Benjamin Bohec`
    const soundCredits = new Array(...credits).map(([sound,author])=>`${sound} - ${author}`).join("<br>")
    const musicCredits = `Main Music - Ken Hamm - Buckbreak`
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle="Credits"/>
</div>
<div class="flex flex-col w-full  items-center">
    <Subtitle subtitle="Team"/>
    <Paragraph text={teamDescription} center={true}/>
    <Subtitle subtitle="Sounds"/>
    <Paragraph text={soundCredits} center={true}/>
    <Subtitle subtitle="Musics"/>
    <Paragraph text={musicCredits} center={true}/>
</div>
<div class="flex flex-col w-full  items-center">
    <Button onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))} text="Menu Principal!"/>
</div>
