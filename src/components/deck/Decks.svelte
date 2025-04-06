<script lang="ts">
  import { onMount } from "svelte";
  import { ArrowRight, Book, MoveRight, Plus, X } from "@lucide/svelte";
  import type { Deck } from "@/types";
  import DeckItem from "./DeckItem.svelte";
  import { decks } from "#stores/decks";
  import { activeTab } from "#stores/tabs";
  import { openModal } from "#stores/modal";

  // Subscribe to the decks store
  let decksList = $state<Deck[]>([]);

  // Set up modal state

  // Subscribe to the decks store
  const unsubscribe = decks.subscribe((value) => {
    decksList = value;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });

  function handleNewDeckClick() {}
</script>

<div class="overflow-hidden pl-1">
  <ul class="space-y-1 overflow-y-scroll pr-2">
    <h3 class="font-semibold mb-2">Decks</h3>

    {#each decksList as deck (deck.id)}
      <DeckItem {deck} />
    {/each}

    {#if decksList.length === 0}
      <div class="text-gray-500 dark:text-gray-400 text-xs">
        No decks yet. <br /> Create one below.
      </div>
    {/if}

    <button
      class="w-full flex items-center justify-center gap-2 px-3 py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      onclick={handleNewDeckClick}
    >
      <Plus class="w-4 h-4" /> New deck
    </button>
  </ul>
</div>
