<script lang="ts">
  import { ArrowRight, Book } from "@lucide/svelte";
  import type { Deck } from "@/types";
  let { deck } = $props<{ deck: Deck }>();
  import DeckItem from "./DeckItem.svelte";
  import { activeTab, activeDeckId } from "#stores/tabs";

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

  // Derive active state
  let isActive = $derived($activeDeckId === deck.id && $activeTab === "deck");
</script>

<div class="flex flex-col w-full">
  <span
    class="flex items-center py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 {isActive
      ? 'bg-gray-100 dark:bg-gray-800'
      : ''}"
  >
    <button
      type="button"
      class="p-1 transition-all duration-150"
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
      class="flex items-center w-full"
      onclick={selectDeck}
      onkeydown={(e) => e.key === "Enter" && selectDeck()}
      aria-label="Select deck"
    >
      <span class="flex items-center justify-between flex-1">
        <div class="flex items-center gap-2 text-body">
          <Book size={10} />
          <span>{deck.name}</span>
        </div>
        <span class="text-caption">
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
