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
<main class="bg-background h-full w-full flex flex-col justify-evenly">
    <div class="flex flex-col items-center">
        <Title/>
        <Subtitle subtitle="El famoso!
        Cette version du jeu permet à un streameur de jouer avec sa communauté.
        Le streameur va choisir le clivage qui lui plait.
        Ensuite, lui et sa communauté peuvent cliver au travers du chat.
        La communauté peut lui proposer de nouveaux clivages également dans le chat.
        "/>
    </div>
    <div class="flex flex-col items-center">
        <Subtitle subtitle={`Déjà ${$cleavageDrawPileQuantityStore} clivages de dispo!`}/>
    </div>
    <div class="flex flex-col p-3 self-center bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-20 drop-shadow">
        <Button text="Jouer" emphasis="high" size="large" onClick={()=>applicationEventStore.set(new NewCleavageEvent())}/>
        <Button text="Options" emphasis="medium" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.SETTINGS))}/>
        <Button text="Credits" emphasis="medium" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.CREDITS))}/>
        <Button text="Ils ont déjà joué" emphasis="medium" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.STREAMERS))}/>
        <Button text="A propos" emphasis="medium" size="large" onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.ABOUT))}/>
    </div>
</main>