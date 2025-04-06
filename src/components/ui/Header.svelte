<script lang="ts">
  import { Ham, Menu, Sun, Moon } from "@lucide/svelte";
  import { page } from "$app/stores";
  import { sidebarVisible } from "#stores/sidebar";
  import { applyClass, theme, toggleTheme } from "#stores/theme";
  import Tip from "./Tip.svelte";
  import { onMount } from "svelte";
  import { activeTab, activeDeckId } from "#stores/tabs";
  import type { Deck } from "@/types";

  // Get deck info for header title
  let currentDeck = $state<Deck | null>(null);

  // Function to fetch deck info based on ID
  async function fetchDeckInfo(deckId: string) {
    // Mock fetch - in real app would fetch from database/storage
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Dummy data - replace with actual data source
    const decks = [
      { id: "1", name: "Mathematics" },
      { id: "2", name: "Languages" },
      { id: "3", name: "History" },
      { id: "1-1", name: "Algebra" },
      { id: "1-2", name: "Geometry" },
      { id: "1-3", name: "Calculus" },
      // Add other decks as needed
    ];

    currentDeck = decks.find((d) => d.id === deckId) || null;
  }

  // Update deck info when activeDeckId changes
  $effect(() => {
    if ($activeTab === "deck" && $activeDeckId) {
      fetchDeckInfo($activeDeckId);
    } else {
      currentDeck = null;
    }
  });

  let tab_title = $derived.by(() => {
    if ($activeTab === "deck" && currentDeck) {
      return currentDeck.name;
    }

    return {
      dashboard: "Dashboard",
      dueToday: "Due Today",
      newCards: "New Cards",
      deck: "Deck",
    }[$activeTab];
  });

  function toggleSidebar() {
    $sidebarVisible = !$sidebarVisible;
  }

  onMount(() => {
    applyClass($theme);
  });
</script>

<div class="flex flex-row gap-2 items-center justify-between w-full">
  <div class={`flex items-center w-full`}>
    {#if !$sidebarVisible}
      <button class="btn" onclick={toggleSidebar}>
        <Menu class="size-4" />
      </button>
    {/if}
    <h1 class={`${$sidebarVisible ? "ml-4" : "ml-2"} text-2xl font-bold`}>
      {tab_title}
    </h1>
  </div>
</div>
