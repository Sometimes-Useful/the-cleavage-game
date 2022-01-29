<script lang="ts">
    import NewCleavage from "./views/NewCleavage.svelte"
    import ConnectChat from "./views/ConnectChat.svelte"
    import CurrentCleavage from "./views/CurrentCleavage.svelte"
    import About from "./views/About.svelte"
    import { InterfaceView } from "../domain/entities/InterfaceView";
    import { onDestroy } from 'svelte';
    import { applicationEventStore, interfaceViewStore } from "./stores/stores";
    import { DisconnectChatEvent } from "../domain/events/disconnectChat.spec.ts/DisconnectChatEvent";
    import MainMenu from "./views/MainMenu.svelte";
    import Settings from "./views/Settings.svelte";
    import Intro from "./views/Intro.svelte";
import Credits from "./views/Credits.svelte";
    let forceView:InterfaceView|undefined = undefined
    interfaceViewStore.set(InterfaceView.INTRO)
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
        {:else if forceView === InterfaceView.SETTINGS }
            <Settings/>
        {:else if forceView === InterfaceView.ABOUT }
            <About/>
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
        {:else if  $interfaceViewStore === InterfaceView.INTRO}
            <Intro/>
        {:else if  $interfaceViewStore === InterfaceView.SETTINGS}
            <Settings/>
        {:else if  $interfaceViewStore === InterfaceView.CREDITS}
            <Credits/>
        {:else if  $interfaceViewStore === InterfaceView.ABOUT}
            <About/>
        {/if}
    {/if}
    
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </style>