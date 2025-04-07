<script lang="ts">
  import {
    AlarmClockCheck,
    ArrowLeftToLine,
    Cog,
    Search,
    SquareKanbanIcon,
    Plus,
    Newspaper,
    Moon,
    Sun,
    ArrowRight,
    Book,
    MoveRight,
    X,
  } from "@lucide/svelte";
  import Tip from "#components/ui/Tip.svelte";
  import Tab from "./Tab.svelte";
  import { sidebarVisible } from "#stores/sidebar";
  import { activeTab, type TabType } from "#stores/tabs";
  import DeckItem from "#components/deck/DeckItem.svelte";
  import { decks } from "#stores/decks.svelte";
  import { openModal } from "#stores/modal";
  import { theme, toggleTheme } from "#stores/theme";
  import { dev } from "$app/environment";
  import type { Deck } from "@/types";
  import { Database } from "@/shim";

  let nav = $state<HTMLElement>();

  function toggle_sidebar() {
    $sidebarVisible = !$sidebarVisible;
  }

  function setActiveTab(tab: TabType) {
    $activeTab = tab;
  }

  function handleTransitionEnd(event: TransitionEvent) {}

  // Accept nav_pos as a prop
  let { nav_pos = $bindable() } = $props<{ nav_pos: number }>();

  $effect(() => {
    if (nav) {
      // Calculate the full width including padding and any offset from the edge
      const rect = nav.getBoundingClientRect();
      // Update nav_pos and dispatch it to the parent
      nav_pos = rect.width;
      // Log the updated nav_pos for debugging
    }
  });

  function handleNewDeckClick() {
    let deck: Deck = {
      id: crypto.randomUUID(),
      name: "New Deck " + ($decks.length + 1),
      cards: [],
    };
    Database.createDeck(deck);
  }
</script>

<nav
  bind:this={nav}
  ontransitionend={handleTransitionEnd}
  class="sidebar"
  style:transform={$sidebarVisible
    ? "translateX(0)"
    : `translateX(-${nav_pos}px)`}
  style:opacity={$sidebarVisible ? "1" : "0"}
>
  <div class="flex justify-between items-center relative">
    <p class="pl-1 text-sm font-semibold">yaycards</p>
    <span class="flex items-center">
      <Tip
        title={$theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"}
      >
        <button class="btn-icon" onclick={toggleTheme}>
          {#if $theme === "dark"}
            <Sun size={18} />
          {:else}
            <Moon size={18} />
          {/if}
        </button>
      </Tip>
      <Tip title="Toggle sidebar">
        <button class="btn-icon" onclick={toggle_sidebar}>
          <ArrowLeftToLine size={18} strokeWidth={1.5} />
        </button>
      </Tip>
    </span>
  </div>

  <!-- search -->
  <button
    class="btn-primary text-xs w-full"
    onclick={() => {
      console.log("Search button clicked");
    }}
  >
    <Search class="w-3 h-3" />
    <span class="flex-grow text-left">Search</span>
    <span class="text-caption">Ctrl + K</span>
  </button>

  <div class="flex flex-col gap-1 mt-2">
    <Tab
      icon={SquareKanbanIcon}
      label="Dashboard"
      active={$activeTab === "dashboard"}
      onclick={() => setActiveTab("dashboard")}
    />
    <Tab
      icon={AlarmClockCheck}
      label="Due Today"
      active={$activeTab === "dueToday"}
      onclick={() => setActiveTab("dueToday")}
    />
    <Tab
      icon={Newspaper}
      label="New Cards"
      active={$activeTab === "newCards"}
      onclick={() => setActiveTab("newCards")}
    />
  </div>
  <div class="divider"></div>

  <!-- Inlined Decks component -->
  <div class="overflow-auto pl-1">
    <ul class="space-y-1 overflow-y-scroll pr-2">
      <h3 class="font-semibold mb-2">Decks</h3>

      {#each $decks as deck (deck.id)}
        <DeckItem {deck} />
      {/each}

      {#if $decks.length === 0}
        <div class="text-caption pl-1">
          No decks yet. <br /> Create one below.
        </div>
      {/if}

      <button class="btn-primary w-full mt-2" onclick={handleNewDeckClick}>
        <Plus class="w-4 h-4" /> New deck
      </button>
    </ul>
  </div>
</nav>
