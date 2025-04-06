<script lang="ts">
  import { ArrowRight, Book } from "@lucide/svelte";
  import type { Deck } from "@/types";
  let { deck } = $props<{ deck: Deck }>();
  import DeckItem from "./DeckItem.svelte";
  import { activeTab, activeDeckId } from "#stores/tabs";
  import type { EventHandler } from "svelte/elements";
  let isOpen = $state(false);

  function toggleOpen(e: MouseEvent | KeyboardEvent) {
    isOpen = !isOpen;
    e.stopPropagation(); // Prevent event bubbling to parent
  }

  function selectDeck() {
    // Set the active deck ID in the store
    $activeDeckId = deck.id;
    // Switch to the deck tab
    $activeTab = "deck";
    console.log("Selected deck:", deck.name, "with ID:", deck.id);
  }
</script>

<div class="flex flex-col w-full">
  <span
    class="row-items w-full hover:bg-orange-300/10 dark:hover:bg-orange-800/10 flex cursor-pointer p-[1px] rounded-lg"
  >
    <button
      type="button"
      class="p-1"
      onclick={(e) => toggleOpen(e)}
      onkeydown={(e) => e.key === "Enter" && toggleOpen(e)}
      aria-expanded={isOpen}
      aria-label="Toggle sub-decks"
    >
      <ArrowRight
        size={12}
        class="mr-1 transition-transform duration-200"
        style={isOpen ? "transform: rotate(90deg)" : ""}
      />
    </button>
    <button
      type="button"
      class="row-items w-full flex cursor-pointer"
      onclick={selectDeck}
      onkeydown={(e) => e.key === "Enter" && selectDeck()}
      aria-label="Select deck"
    >
      <span class="row-items justify-between flex-1">
        <div class="flex items-center gap-2 text-sm">
          <Book size={10} />
          <span>{deck.name}</span>
        </div>
        <span class="text-xs text-gray-500">
          {deck.subDecks?.length || 0}
        </span>
      </span>
    </button>
  </span>

  {#if isOpen && deck.subDecks && deck.subDecks.length > 0}
    <div class="pl-4">
      {#each deck.subDecks as subDeck}
        <DeckItem deck={subDeck} />
      {/each}
    </div>
  {/if}
</div>
