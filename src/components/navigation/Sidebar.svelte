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
  } from "@lucide/svelte";
  import Tip from "#components/ui/Tip.svelte";
  import Tab from "./Tab.svelte";
  import { sidebarVisible } from "#stores/sidebar";
  import { activeTab, type TabType } from "#stores/tabs";
  import Decks from "#components/deck/Decks.svelte";
  import { theme, toggleTheme } from "#stores/theme";

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
      console.debug("Updated nav_pos:", nav_pos);
    }
  });
</script>

<nav
  bind:this={nav}
  ontransitionend={handleTransitionEnd}
  class="flex flex-col gap-2 p-4 h-full bg-white dark:bg-gray-900 w-64 transition-all rounded-xl"
  style:transform={$sidebarVisible
    ? "translateX(0)"
    : `translateX(-${nav_pos}px)`}
  style:opacity={$sidebarVisible ? "1" : "0"}
>
  <div class="flex justify-between items-center relative">
    <p class="pl-1 text-lg font-semibold">yaycards</p>
    <span class="flex items-center">
      <Tip
        title={$theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"}
      >
        <button
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onclick={toggleTheme}
        >
          {#if $theme === "dark"}
            <Sun size={18} />
          {:else}
            <Moon size={18} />
          {/if}
        </button>
      </Tip>
      <Tip title="Toggle sidebar">
        <button
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onclick={toggle_sidebar}
        >
          <ArrowLeftToLine size={18} strokeWidth={1.5} />
        </button>
      </Tip>
    </span>
  </div>

  <!-- search -->
  <button
    class="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-full text-xs"
    onclick={() => {
      console.log("Search button clicked");
    }}
  >
    <Search class="w-3 h-3" />
    <span class="flex-grow text-left">Search</span>
    <span class="opacity-50">Ctrl + K</span>
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
  <div class="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>
  <Decks />
</nav>
