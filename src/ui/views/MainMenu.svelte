<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Button from "../components/button/button.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
</script>
<div class="flex flex-col items-center">
    <Title/>
    <Subtitle subtitle="El famoso!
    Le jeu du clivage où on décide enfin si quelque chose est de gauche ou de droite.
    Un super jeu politique pour fight entre amis ou en famille.
    Version streamer!
    Tellement digital, tellement handspinner. Le plaisir.
    Parfait pour préparer l'élection présidentielle de 2022!
    4€99 seulement! Wouah!"/>
</div>
<div class="flex flex-col items-center">
    <Button text="Jouer !" size="large" onClick={()=>applicationEventStore.set(new NewCleavageEvent())}/>
    <Button text="Options !" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.SETTINGS))}/>
</div>
