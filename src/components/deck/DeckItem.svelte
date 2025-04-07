<script lang="ts">
  import { ArrowRight, Book } from "@lucide/svelte";
  import type { Deck } from "@/types";
  import DeckItem from "./DeckItem.svelte";
  import { activeTab, activeDeckId } from "#stores/tabs";
  import { headerSnippet } from "@/stores/misc";
  import { decks } from "@/stores/decks.svelte";

  let isOpen = $state(false);
  let { deck: currentDeck }: { deck: Deck } = $props<{ deck: Deck }>();

  function toggleOpen(e: MouseEvent | KeyboardEvent) {
    isOpen = !isOpen;
    e.stopPropagation(); // Prevent event bubbling to parent
  }

  function selectDeck() {
    // Set the active deck ID in the store
    $activeDeckId = currentDeck.id;
    // Switch to the deck tab
    $activeTab = "deck";

    $headerSnippet = header;
  }

  // Derive active state
  let isActive = $derived(
    $activeDeckId === currentDeck.id && $activeTab === "deck"
  );
</script>

{#snippet header()}
  <input
    class="text-title focus:outline-none focus:ring-0 focus:border-transparent min-w-full"
    onkeydown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.currentTarget.blur();
      }
    }}
    bind:value={currentDeck.name}
  />
{/snippet}
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
          <span
            class="truncate overflow-hidden max-w-32"
            title={currentDeck.name}>{currentDeck.name}</span
          >
        </div>
        <span class="text-caption">
          {currentDeck.subDecks?.length || 0}
        </span>
      </span>
    </button>
  </span>

  {#if isOpen && currentDeck.subDecks && currentDeck.subDecks.length > 0}
    <div class="pl-4">
      {#each currentDeck.subDecks as subDeck}
        <DeckItem deck={subDeck} />
      {/each}
    </div>
  {/if}
</div>
