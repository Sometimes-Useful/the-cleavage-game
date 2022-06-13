<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { ChangeMusicVolumeEvent } from "../../domain/events/changeMusicVolume/ChangeMusicVolumeEvent";
    import { ChangeSoundVolumeEvent } from "../../domain/events/changeSoundVolume/ChangeSoundVolumeEvent";
    import { ChangeVideoExtractVolumeEvent } from "../../domain/events/changeVideoExtractVolume/ChangeVideoExtractVolumeEvent";
    import { HelpDisabledEvent } from "../../domain/events/helpDisabled/HelpDisabledEvent";
    import { HelpEnabledEvent } from "../../domain/events/helpEnabled/HelpEnabledEvent";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import Button from "../components/button/button.svelte";
    import CheckBox from "../components/inputs/checkBox.svelte";
    import Slider from "../components/slider/slider.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore, musicVolumeStore, soundVolumeStore, videoExtractVolumeStore, isHelpEnabledStore } from "../stores/stores";
    let soundVolume:number
    let musicVolume:number
    let videoExtractVolume:number
    const onMusicVolumeChange = (input:Event & { currentTarget: EventTarget & HTMLInputElement; }):void => applicationEventStore.set(new ChangeMusicVolumeEvent(parseInt(input.currentTarget.value)))
    const onSoundVolumeChange = (input:Event & { currentTarget: EventTarget & HTMLInputElement; }):void => applicationEventStore.set(new ChangeSoundVolumeEvent(parseInt(input.currentTarget.value)))
    const onVideoExtractVolumeChange = (input:Event & { currentTarget: EventTarget & HTMLInputElement; }):void => applicationEventStore.set(new ChangeVideoExtractVolumeEvent(parseInt(input.currentTarget.value)))
    const onEnableHelp = (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => applicationEventStore.set(event.currentTarget.checked 
        ? new HelpEnabledEvent() 
        : new HelpDisabledEvent()
    )
    soundVolumeStore.subscribe(volume => soundVolume = volume)
    musicVolumeStore.subscribe(volume => musicVolume = volume)
    videoExtractVolumeStore.subscribe(volume=> videoExtractVolume = volume)
</script>
<main class="bg-background h-full w-full flex flex-col justify-evenly">
    <div class="flex flex-col w-full items-center">
        <Title/>
        <Subtitle subtitle="Options"/>
    </div>
    <div class="flex flex-col self-center w-1/2">
        <Subtitle subtitle="Volume" />
        <Slider id="musicVolume" text="Musique" onInput={onMusicVolumeChange} value={musicVolume}/>
        <Slider id="videoExtractVolume" text="Extraits Vidéos" onInput={onVideoExtractVolumeChange} value={videoExtractVolume}/>
        <Slider id="soundVolume" text="Sons" onInput={onSoundVolumeChange} value={soundVolume}/>
    </div>
    <div class="flex flex-col self-center w-1/2">
        <Subtitle subtitle="Aide" />
        <CheckBox checked={$isHelpEnabledStore ? true : false} onChange={onEnableHelp} id="help" label="Afficher l'aide?"/>
    </div>
        
    
    <div class="flex flex-col w-full  items-center">
        <Button emphasis="high" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))} text="Menu Principal"/>
    </div>
</main>