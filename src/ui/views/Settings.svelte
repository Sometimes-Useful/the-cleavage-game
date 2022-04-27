<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { ChangeMusicVolumeEvent } from "../../domain/events/changeMusicVolume/ChangeMusicVolumeEvent";
    import { ChangeSoundVolumeEvent } from "../../domain/events/changeSoundVolume/ChangeSoundVolumeEvent";
import { ChangeVideoExtractVolumeEvent } from "../../domain/events/changeVideoExtractVolume/ChangeVideoExtractVolumeEvent";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import Button from "../components/button/button.svelte";
    import Slider from "../components/slider/slider.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, musicVolumeStore, soundVolumeStore, videoExtractVolumeStore } from "../stores/stores";
    let soundVolume:number
    let musicVolume:number
    let videoExtractVolume:number
    const onMusicVolumeChange = (input:Event & { currentTarget: EventTarget & HTMLInputElement; }):void => applicationEventStore.set(new ChangeMusicVolumeEvent(parseInt(input.currentTarget.value)))
    const onSoundVolumeChange = (input:Event & { currentTarget: EventTarget & HTMLInputElement; }):void => applicationEventStore.set(new ChangeSoundVolumeEvent(parseInt(input.currentTarget.value)))
    const onVideoExtractVolumeChange = (input:Event & { currentTarget: EventTarget & HTMLInputElement; }):void => applicationEventStore.set(new ChangeVideoExtractVolumeEvent(parseInt(input.currentTarget.value)))
    soundVolumeStore.subscribe(volume => soundVolume = volume)
    musicVolumeStore.subscribe(volume => musicVolume = volume)
    videoExtractVolumeStore.subscribe(volume=> videoExtractVolume = volume)
</script>
<main class="bg-dark-background h-full w-full flex flex-col justify-evenly">
    <div class="flex flex-col w-full items-center">
        <Title/>
        <Subtitle subtitle="Options"/>
    </div>
    <div class="flex flex-col w-full items-center">
        <Slider id="musicVolume" text="Volume - Musique" onInput={onMusicVolumeChange} value={musicVolume}/>
        <Slider id="videoExtractVolume" text="Volume - Extraits Vidéos" onInput={onVideoExtractVolumeChange} value={videoExtractVolume}/>
        <Slider id="soundVolume" text="Volume - Sons" onInput={onSoundVolumeChange} value={soundVolume}/>
    </div>
    <div class="flex flex-col w-full  items-center">
        <Button onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))} text="Menu Principal!"/>
    </div>
</main>