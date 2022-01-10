<script lang="ts">
import { ConnectChatEvent } from "../../domain/events/connectChat/ConnectChatEvent";

    import Button from "../components/button/button.svelte";
import TextBox from "../components/inputs/textBox.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte"
import { applicationEventStore } from "../stores/stores";
    let username:string
    let token:string
    let channel:string
    const onClickButton = () => $applicationEventStore = new ConnectChatEvent(username, token, channel)
</script>
<div class="flex flex-col w-full items-center">
    <Title/>
    <Subtitle subtitle="Connectes-toi sur ta chaine Twitch pour faire participer tes viewers !!!"/>
</div>
<div class="flex flex-col w-full items-center">
    <TextBox id="user" name="user" bind:inputValue={username} placeholder="Utilisateur Twitch"/>
    <TextBox id="password" name="password" bind:inputValue={token} placeholder="Token Twitch" type="password"/>
    <TextBox id="channel" name="channel" bind:inputValue={channel} placeholder="Chaine Twitch"/>
    {#if username && token && channel}
        <Button text="Connexion Twitch !" onClick={onClickButton}/>
    {/if}
</div>
