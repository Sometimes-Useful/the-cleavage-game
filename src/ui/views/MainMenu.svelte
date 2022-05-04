<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import { NewCleavageEvent } from "../../domain/events/newCleavage/NewCleavageEvent";
    import Button from "../components/button/button.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import {cleavageDrawPileQuantityStore} from "../stores/stores"
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
    import { afterUpdate } from "svelte";
import { RefreshCleavageDrawpileQuantityEvent } from "../../domain/events/refreshCleavageDrawpileQuantity/RefreshCleavageDrawpileQuantityEvent";
    afterUpdate(()=> {
        applicationEventStore.set(new RefreshCleavageDrawpileQuantityEvent())
    })
</script>
<main class="bg-dark-background h-full w-full flex flex-col justify-evenly">
    <div class="flex flex-col items-center">
        <Title/>
        <Subtitle subtitle="El famoso!
        Le jeu du clivage où on décide ENFIN si quelque chose est finalement de gauche ou de droite.
        Un super jeu politique pour fight entre amis ou en famille. Attention, mamie c'est le boss final...
        Version streamer!
        Tellement digital! Tellement handspinner! Le plaisir.
        Parfait pour préparer l'élection présidentielle de 2022 ou quand on s'emmerde...
        94.99$ seulement! Wouah!"/>
    </div>
    <div class="flex flex-col items-center">
        <Subtitle subtitle={`Déjà ${$cleavageDrawPileQuantityStore} clivages de dispo!`}/>
    </div>
    <div class="flex flex-col items-center">
        <Button text="Jouer !" size="large" onClick={()=>applicationEventStore.set(new NewCleavageEvent())}/>
        <Button text="Options !" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.SETTINGS))}/>
        <Button text="Credits !" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.CREDITS))}/>
        <Button text="Ils ont déjà joué!" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.STREAMERS))}/>
        <Button text="A propos !" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.ABOUT))}/>
    </div>
</main>