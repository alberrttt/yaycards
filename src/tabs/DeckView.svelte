<script lang="ts">
  import { Plus, BookOpen, Settings, Trash2, Edit, X } from "@lucide/svelte";
  import { activeDeckId } from "#stores/tabs";
  import type { Card, Deck } from "@/types";
  import Tip from "#components/ui/Tip.svelte";
  import { onMount } from "svelte";
  import { createExampleCards, getCardDueStatusClass } from "@/util";
  import DeckActions from "#components/deck/DeckActions.svelte";
  import { decks } from "@/stores/decks.svelte";

  import { headerSnippet } from "@/stores/misc";

  // State variables
  let showNewCardModal = $state(false);
  let newCardFront = $state("");
  let newCardBack = $state("");
  // Derived values based on activeDeckId
  let currentDeck = $derived.by(() => {
    if (!$activeDeckId) return null;
    for (const deck of $decks) {
      if (deck.id === $activeDeckId) {
        return deck;
      }
    }
    return null;
  });
  let cards = $derived.by(() => {
    if (!currentDeck) return [];
    // In a real app, you would load cards for this deck from a database
    // For now, we'll use the example cards
    return currentDeck.cards;
  });

  let isLoading = $derived.by(() => {
    // We could have more complex loading logic here if needed
    return !currentDeck && $activeDeckId !== undefined;
  });

  function openNewCardModal() {
    showNewCardModal = true;
    newCardFront = "";
    newCardBack = "";
  }

  function closeNewCardModal() {
    showNewCardModal = false;
  }

  function addNewCard() {
    openNewCardModal();
  }

  function createNewCard(event: Event) {
    event.preventDefault();
    if (newCardFront.trim() && newCardBack.trim()) {
      const newCard: Card = {
        id: crypto.randomUUID(), // This uses the Web Crypto API available in browsers
        front: newCardFront.trim(),
        back: newCardBack.trim(),
        tags: [],
        dueDate: new Date(Date.now() + 86400000), // Due tomorrow
      };

      currentDeck!.cards.push(newCard); // Add the new card to the current deck
      closeNewCardModal();

      // In a real app, you would save this card to a database
      // problem.. we need to get currentDeck to update somehow
    }
  }

  function startStudySession() {
    console.log("Start study session clicked");
    // This would start a study session with the selected cards
  }

  function editDeck() {
    console.log("Edit deck clicked");
    // This would open the deck editing interface
  }

  function getCardDueStatus(card: Card): string {
    if (!card.dueDate) return "Not scheduled";

    const now = new Date();
    const dueDate = new Date(card.dueDate);

    if (dueDate < now) return "Overdue";

    const diffDays = Math.floor(
      (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  }
</script>

{#snippet card_actions(card: Card)}
  <div class="flex flex-col items-end justify-between">
    <div class="flex gap-1">
      <Tip title="Edit card">
        <button class="btn-icon p-1">
          <Edit class="w-3.5 h-3.5" />
        </button>
      </Tip>

      <Tip title="Delete card">
        <button class="btn-icon p-1 status-overdue">
          <Trash2 class="w-3.5 h-3.5" />
        </button>
      </Tip>
    </div>

    <div class="text-xs {getCardDueStatusClass(card)} mt-auto">
      {getCardDueStatus(card)}
    </div>
  </div>
{/snippet}
{#snippet card_item(card: Card)}
  <div class="card-hover p-4 cursor-pointer">
    <div class="flex justify-between">
      <div class="flex-1">
        <h3 class="font-medium">{card.front}</h3>
        <p class="text-body text-gray-600 dark:text-gray-400 mt-1">
          {card.back}
        </p>

        <div class="flex gap-2 mt-2">
          {#each card.tags as tag}
            <span class="tag">
              {tag}
            </span>
          {/each}
        </div>
      </div>

      {@render card_actions(card)}
    </div>
  </div>
{/snippet}
{#snippet main(currentDeck: Deck)}
  <div class="flex justify-between items-center">
    <div>
      <p class="text-caption">
        {cards.length} cards • {cards.filter(
          (c) => c.dueDate && c.dueDate <= new Date()
        ).length} due today
      </p>
    </div>

    <div class="flex gap-2">
      <Tip title="Study this deck">
        <button class="btn-primary" onclick={startStudySession}>
          <BookOpen class="w-4 h-4" />
          <span>Study</span>
        </button>
      </Tip>

      <Tip title="Add a new card">
        <button class="btn-primary" onclick={addNewCard}>
          <Plus class="w-4 h-4" />
          <span>New Card</span>
        </button>
      </Tip>

      <Tip title="Edit deck settings">
        <button class="btn-ghost" onclick={editDeck}>
          <Settings class="w-4 h-4" />
        </button>
      </Tip>
    </div>
  </div>

  <!-- Deck Actions Bar -->
  <DeckActions />

  <!-- Cards List -->
  <div class="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
    {#each cards as card (card.id)}
      {@render card_item(card)}
    {/each}

    {#if cards.length === 0}
      <div class="flex flex-col items-center justify-center h-64 text-caption">
        <p class="mb-4">No cards in this deck yet</p>
        <button class="btn-primary" onclick={addNewCard}>
          <Plus class="w-4 h-4" />
          <span>Add your first card</span>
        </button>
      </div>
    {/if}
  </div>
{/snippet}

<div class="flex flex-col gap-6 p-2 h-full overflow-hidden">
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 dark:border-amber-400"
      ></div>
    </div>
  {:else if currentDeck}
    <!-- Deck Header Section -->
    {@render main(currentDeck)}
  {:else}
    <div class="flex flex-col items-center justify-center h-64 text-caption">
      <p>No deck selected</p>
    </div>
  {/if}
</div>
