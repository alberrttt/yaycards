<script lang="ts">
  import { Menu, Sun, Moon } from "@lucide/svelte";
  import { sidebarVisible } from "#stores/sidebar";
  import { applyClass, theme, toggleTheme } from "#stores/theme";
  import Tip from "./Tip.svelte";
  import { onMount, type Snippet } from "svelte";
  import { activeTab, activeDeckId } from "#stores/tabs";
  import type { Deck } from "@/types";
  import { headerSnippet } from "@/stores/misc";
  function toggleSidebar() {
    $sidebarVisible = !$sidebarVisible;
  }

  onMount(() => {
    applyClass($theme);
  });
</script>

<div class="rounded-xl flex justify-between items-center w-full p-4 mt-6">
  <div class="flex items-center text-lg w-full">
    {#if !$sidebarVisible}
      <button class="btn-icon" onclick={toggleSidebar}>
        <Menu size={18} />
      </button>
    {/if}

    {@render $headerSnippet?.()}
  </div>

  <div class="flex gap-2">
    <!-- Additional header actions can go here -->
  </div>
</div>
