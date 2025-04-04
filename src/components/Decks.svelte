<script lang="ts">
    import { onMount } from "svelte";
    import Book from "./Book.svelte";

    // Define the deck type interface
    interface Deck {
        id: string;
        name: string;
        subDecks?: Deck[];
        isOpen?: boolean;
    }

    // Example data - replace with your actual data source
    let decks: Deck[] = [
        {
            id: "1",
            name: "Mathematics",
            isOpen: false,
            subDecks: [
                { id: "1-1", name: "Algebra" },
                { id: "1-2", name: "Geometry" },
                { id: "1-3", name: "Calculus" },
            ],
        },
        {
            id: "2",
            name: "Languages",
            isOpen: false,
            subDecks: [
                { id: "2-1", name: "English" },
                { id: "2-2", name: "Spanish" },
                { id: "2-3", name: "French" },
            ],
        },
        {
            id: "3",
            name: "History",
            isOpen: false,
            subDecks: [
                { id: "3-1", name: "Ancient" },
                { id: "3-2", name: "Medieval" },
                { id: "3-3", name: "Modern" },
            ],
        },
    ];

    // Function to toggle deck open/close state
    function toggleDeck(deck: Deck) {
        deck.isOpen = !deck.isOpen;
        decks = [...decks]; // Trigger reactivity
    }

    // Function to select a deck
    function selectDeck(deck: Deck) {
        console.log("Selected deck:", deck.name);
        // Add your selection logic here
    }

    onMount(() => {
        // Any initialization code if needed
    });
</script>

<div></div>
