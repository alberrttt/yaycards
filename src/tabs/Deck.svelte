<script lang="ts">
    import {
        Plus,
        BookOpen,
        Settings,
        BarChart3,
        Trash2,
        Download,
        Share2,
        Edit,
        Filter,
        SortAsc,
    } from "@lucide/svelte";
    import { activeDeckId } from "../stores/tabs";
    import type { Card, Deck } from "../types";
    import Tip from "../components/Tip.svelte";
    import { onMount } from "svelte";
    import { createExampleCards, getCardDueStatusClass } from "../util";
    import DeckActions from "../components/DeckActions.svelte";

    // Define a Card interface for this component

    // Current deck state derived from the activeDeckId
    let currentDeck = $state<Deck | null>(null);
    let cards = $state<Card[]>([]);
    let isLoading = $state(true);
    let filter = $state("");
    let sortBy = $state<"dueDate" | "created" | "difficulty">("dueDate");

    // Create some example cards for development

    // Mock function to load a deck
    async function loadDeck(deckId: string) {
        // isLoading = true;

        // Simulate API call delay
        // await new Promise((resolve) => setTimeout(resolve, 30));

        // For now, create a mock deck and cards
        currentDeck = {
            id: deckId,
            name: "Sample Deck " + deckId,
        };

        cards = createExampleCards();
        isLoading = false;
    }

    function addNewCard() {
        console.log("Add new card clicked");
        // This would open a modal or navigate to a card creation form
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
            (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (diffDays === 0) return "Due today";
        if (diffDays === 1) return "Due tomorrow";
        return `Due in ${diffDays} days`;
    }

    // Load deck data when activeDeckId changes
    $effect(() => {
        if ($activeDeckId) {
            loadDeck($activeDeckId);
        }
    });

    onMount(() => {
        // For development, load a sample deck if no activeDeckId is set
        if (!$activeDeckId) {
            $activeDeckId = "1";
        }
    });
</script>

{#snippet card_actions(card: Card)}
    <div class="flex flex-col items-end justify-between">
        <div class="flex gap-1">
            <Tip title="Edit card">
                <button class="btn p-1">
                    <Edit class="w-3.5 h-3.5" />
                </button>
            </Tip>

            <Tip title="Delete card">
                <button class="btn p-1 text-red-500 dark:text-red-400">
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
    <div
        class="card-container p-4 hover:bg-amber-100/30 dark:hover:bg-amber-800/20 transition-all cursor-pointer"
    >
        <div class="flex justify-between">
            <div class="flex-1">
                <h3 class="font-medium">{card.front}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {card.back}
                </p>

                <div class="flex gap-2 mt-2">
                    {#each card.tags as tag}
                        <span
                            class="px-2 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200"
                        >
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
            <h1 class="text-2xl font-bold">{currentDeck.name}</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {cards.length} cards • {cards.filter(
                    (c) => c.dueDate && c.dueDate <= new Date(),
                ).length} due today
            </p>
        </div>

        <div class="flex gap-2">
            <Tip title="Study this deck">
                <button class="btn btn-primary" onclick={startStudySession}>
                    <BookOpen class="w-4 h-4" />
                    <span>Study</span>
                </button>
            </Tip>

            <Tip title="Add a new card">
                <button class="btn btn-primary" onclick={addNewCard}>
                    <Plus class="w-4 h-4" />
                    <span>New Card</span>
                </button>
            </Tip>

            <Tip title="Edit deck settings">
                <button class="btn" onclick={editDeck}>
                    <Settings class="w-4 h-4" />
                </button>
            </Tip>
        </div>
    </div>

    <!-- Deck Actions Bar -->
    <DeckActions/>

    <!-- Cards List -->
    <div class="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
        {#each cards as card (card.id)}
            {@render card_item(card)}
        {/each}

        {#if cards.length === 0}
            <div
                class="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400"
            >
                <p class="mb-4">No cards in this deck yet</p>
                <button class="btn btn-primary" onclick={addNewCard}>
                    <Plus class="w-4 h-4" />
                    <span>Add your first card</span>
                </button>
            </div>
        {/if}
    </div>
{/snippet}
<div class="flex flex-col gap-6 p-2 h-full overflow-hidden">
    <!-- {#if isLoading}
        <div class="flex justify-center items-center h-64">
            <div
                class="loading loading-spinner loading-lg text-amber-600 dark:text-amber-400"
            ></div>
        </div> -->
    {#if currentDeck}
        <!-- Deck Header Section -->
        {@render main(currentDeck)}
    {:else}
        <div
            class="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400"
        >
            <p>No deck selected</p>
        </div>
    {/if}
</div>
