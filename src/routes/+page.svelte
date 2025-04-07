<script lang="ts">
  import "@/app.css";
  import Sidebar from "#components/navigation/Sidebar.svelte";
  import Header from "#components/ui/Header.svelte";
  import { sidebarVisible } from "#stores/sidebar";
  import { activeTab } from "#stores/tabs";
  import { initTheme } from "#stores/theme";
  import { onMount, type Snippet } from "svelte";

  // Import tab components
  import Dashboard from "@tabs/Dashboard.svelte";
  import DueToday from "@tabs/DueToday.svelte";
  import NewCards from "@tabs/NewCards.svelte";
  import Deck from "@/tabs/DeckView.svelte";
  import ModalWrapper from "#components/ui/ModalWrapper.svelte";
  import { headerSnippet } from "@/stores/misc";
  import { Database, isNativeApp } from "@/shim";
  import { decks } from "@/stores/decks.svelte";
  // Create a state variable for nav_pos
  let nav_pos = $state(0);
  Database.init();
</script>

<ModalWrapper />
<div class="relative h-screen flex p-2 gap-6 overflow-hidden">
  <Sidebar bind:nav_pos />
  <main
    class="flex flex-col transition-all duration-300 ease-in-out max-w-full flex-1 box-border overflow-hidden"
    style={$sidebarVisible
      ? `margin-left: 0px;`
      : `margin-left: -${nav_pos}px;`}
  >
    <Header />

    <div class="pl-2 overflow-hidden flex-1">
      {#if $activeTab === "dashboard"}
        <Dashboard />
      {:else if $activeTab === "dueToday"}
        <DueToday />
      {:else if $activeTab === "newCards"}
        <NewCards />
      {:else if $activeTab === "deck"}
        <Deck />
      {/if}
    </div>
  </main>
</div>
