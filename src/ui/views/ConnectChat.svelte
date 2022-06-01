<script lang="ts">
    import { afterUpdate,onDestroy } from "svelte";
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { CheckRegisteredStreamerEvent } from "../../domain/events/checkRegisteredStreamer/CheckRegisteredStreamerEvent";
    import { ConnectChatEvent } from "../../domain/events/connectChat/ConnectChatEvent";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import { RegisterStreamerEvent } from "../../domain/events/registerStreamer/RegisterStreamerEvent";
    import Button from "../components/button/button.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import LinkComponent from "../components/link/linkComponent.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte";
    import { applicationEventStore,isStreamerRegisteredStore } from "../stores/stores";
    let username:string = ""
    let token:string = ""
    let channel:string = ""
    let isRegisterStreamer:boolean = false
    const onConnect = () => {
        if(isRegisterStreamer) applicationEventStore.set(new RegisterStreamerEvent(username))
        applicationEventStore.set(new ConnectChatEvent(username, token, channel))
        }
    afterUpdate(() => {if (username && token && channel) applicationEventStore.set(new CheckRegisteredStreamerEvent(username)) })
    onDestroy(()=>isStreamerRegisteredStore.set(undefined))
</script>
<main class=" h-full w-full flex flex-col justify-evenly">
    <div class="flex flex-col w-full items-center">
        <Title/>
        <Subtitle subtitle="Connectes-toi sur ta chaine Twitch."/>
    </div>
    <div  class="flex flex-row  w-full place-items-center justify-center">
        <div class="flex flex-col items-center">
            <TextBox id="user" name="user" bind:inputValue={username} placeholder="Utilisateur Twitch"/>
            <TextBox id="password" name="password" bind:inputValue={token} placeholder="Token Twitch" type="password"/>
            <TextBox id="channel" name="channel" bind:inputValue={channel} placeholder="Chaine Twitch"/>
            {#if username && token && channel && ($isStreamerRegisteredStore !== undefined)}
                <input type="checkbox" id="registerStreamer" name="Faire parti des streamers qui jouent au jeu du clivage?" checked={$isStreamerRegisteredStore} bind:value={isRegisterStreamer} >
                <Button text="Connexion Twitch !" emphasis="high" onClick={onConnect}/>
            {/if}
            <Button text="Menu principal" emphasis="medium" onClick={() => applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU)) }/>
        </div>
        <LinkComponent text="Twitch Token Generator" href="https://twitchapps.com/tmi/" newTab={true}/>
    </div>
</main>