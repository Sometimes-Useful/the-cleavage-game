<script lang="ts">
    import NewCleavage from "./views/NewCleavage.svelte"
    import ConnectChat from "./views/ConnectChat.svelte"
    import CurrentCleavage from "./views/CurrentCleavage.svelte"
    import { InterfaceView } from "../domain/entities/InterfaceView";
    import { onDestroy } from 'svelte';
    import { applicationEventStore, interfaceViewStore } from "./stores/stores";
    import { DisconnectChatEvent } from "../domain/events/disconnectChat.spec.ts/DisconnectChatEvent";
    import MainMenu from "./views/MainMenu.svelte";
    import Studio from "./views/Studio.svelte";
    import Settings from "./views/Settings.svelte";
    let forceView:InterfaceView|undefined = undefined
    interfaceViewStore.set(InterfaceView.STUDIO)
    onDestroy(()=>$applicationEventStore = new DisconnectChatEvent())
</script>

<main class="bg-black h-full w-full flex flex-col justify-evenly">
    {#if  forceView } 
        {#if  forceView === InterfaceView.CONNECT_CHAT } 
            <ConnectChat/>
        {:else if forceView === InterfaceView.CURRENT_CLEAVAGE }
            <CurrentCleavage/>
        {:else if forceView === InterfaceView.NEW_CLEAVAGE }
            <NewCleavage/>
        {/if}
    {:else}
        {#if $interfaceViewStore === InterfaceView.CONNECT_CHAT} 
            <ConnectChat/>
        {:else if  $interfaceViewStore === InterfaceView.CURRENT_CLEAVAGE}
            <CurrentCleavage/>
        {:else if  $interfaceViewStore === InterfaceView.NEW_CLEAVAGE}
            <NewCleavage/>
        {:else if  $interfaceViewStore === InterfaceView.MAIN_MENU}
            <MainMenu/>
        {:else if  $interfaceViewStore === InterfaceView.STUDIO}
            <Studio/>
        {:else if  $interfaceViewStore === InterfaceView.SETTINGS}
            <Settings/>
        {/if}
    {/if}
    
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </style>