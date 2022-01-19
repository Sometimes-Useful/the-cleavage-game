<script lang="ts">
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { ConnectChatEvent } from "../../domain/events/connectChat/ConnectChatEvent";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import Button from "../components/button/button.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import Link from "../components/link/Link.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
    import { applicationEventStore } from "../stores/stores";
    let username:string
    let token:string
    let channel:string
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle="Connectes-toi sur ta chaine Twitch pour faire participer tes viewers !!!"/>
</div>
<div  class="flex flex-row  w-full place-items-center justify-center">
    <div class="flex flex-col items-center">
        <TextBox id="user" name="user" bind:inputValue={username} placeholder="Utilisateur Twitch"/>
        <TextBox id="password" name="password" bind:inputValue={token} placeholder="Token Twitch" type="password"/>
        <TextBox id="channel" name="channel" bind:inputValue={channel} placeholder="Chaine Twitch"/>
        {#if username && token && channel}
            <Button text="Connexion Twitch !" onClick={() => applicationEventStore.set(new ConnectChatEvent(username, token, channel))}/>
        {/if}
        <Button text="Menu principal" onClick={() => applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU)) }/>
    </div>
    <Link text="Twitch Token Generator" href="https://twitchapps.com/tmi/" newTab={true}/>
</div>
