<script lang="ts">
    import { onMount } from "svelte";
    import { ArrowRight, Book, MoveRight, Plus } from "@lucide/svelte";
    import type { Deck } from "../types";
    import DeckItem from "./DeckItem.svelte";

    // Define the deck type interface

    // Example data - replace with your actual data source
    let decks = $state<Deck[]>([
        {
            id: "1",
            name: "Mathematics",
            subDecks: [
                { id: "1-1", name: "Algebra" },
                { id: "1-2", name: "Geometry" },
                { id: "1-3", name: "Calculus" },
            ],
        },
        {
            id: "2",
            name: "Languages",
            subDecks: [
                { id: "2-1", name: "English" },
                { id: "2-2", name: "Spanish" },
                { id: "2-3", name: "French" },
            ],
        },
        {
            id: "3",
            name: "History",
            subDecks: [
                { id: "3-1", name: "Ancient" },
                { id: "3-2", name: "Medieval" },
                { id: "3-3", name: "Modern" },
            ],
        },
    ]);

    onMount(() => {
        // Any initialization code if needed
    });
</script>

<div class="overflow-hidden pl-1">
    <ul class="space-y-1 overflow-y-scroll max-h-full pr-2">
        <h3 class="font-semibold mb-2">Decks</h3>

        {#each decks as deck (deck.id)}
            <DeckItem {deck} />
        {/each}

        <button class="btn-primary w-full flex-row-gap">
            <Plus class="w-4 h-4" /> New deck
        </button>
    </ul>
</div>
