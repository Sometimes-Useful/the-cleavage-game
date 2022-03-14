<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import Button from "../components/button/button.svelte";
    import LinkComponent from "../components/link/linkComponent.svelte";
    import Paragraph from "../components/text/paragraph.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
    const gameDescription = `Le jeu du clivage est un jeu qui permet aux joueurs de cliver sur un sujet choisi par le maitre du jeu.
    Le joueur doit choisir si le sujet est de gauche ou de droite.
    Le joueur peut aussi proposer au maitre du jeu de nouveaux clivages et participer dans le débat (applaudir, huer,...)`
    const projectDescription =`Le jeu du clivage est un projet open source et gratuit.`
    const donationDescription = `Nous avons besoin de votre soutient pour pouvoir passer plus de temps au développement du jeu. Hésitez pas à nous contacter à l'addresse bbohec.pro[AT]gmail.com si vous souhaitez nous aider.`
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle="A propos"/>
</div>
<div class="flex flex-col w-full  items-center">
    <Paragraph text={gameDescription}/>
    <Paragraph text={projectDescription} center={true}/>
    <LinkComponent text="GitHub" href="https://github.com/Sometimes-Useful/the-cleavage-game" newTab={true}/>
    <LinkComponent text="Replay du dev" href="https://youtube.com/playlist?list=PL4jAusJfrmMsRWjFhgjZXcPnEZdkUnLGc" newTab={true}/>
    <LinkComponent text="Chaine Twitch pour le live" href="https://www.twitch.tv/benjaminbohec" newTab={true}/>
    <Paragraph text={donationDescription} center={true}/>
</div>
<div class="flex flex-col w-full  items-center">
    <Button onClick={()=>applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU))} text="Menu Principal!"/>
</div>
