import { writable, get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Deck } from '../types';

// Create a writable store for decks
const decksStore = writable<Deck[]>([]);

// Helper function to find a deck by ID (including in nested subDecks)
function findDeckById(decks: Deck[], id: string): Deck | null {
    for (const deck of decks) {
        if (deck.id === id) return deck;

        if (deck.subDecks && deck.subDecks.length > 0) {
            const foundInSubDecks = findDeckById(deck.subDecks, id);
            if (foundInSubDecks) return foundInSubDecks;
        }
    }

    return null;
}

// Helper function to add a sub-deck to a parent deck
function addSubDeck(decks: Deck[], parentId: string, newDeck: Deck): Deck[] {
    return decks.map(deck => {
        if (deck.id === parentId) {
            return {
                ...deck,
                subDecks: [...(deck.subDecks || []), newDeck]
            };
        }

        if (deck.subDecks && deck.subDecks.length > 0) {
            return {
                ...deck,
                subDecks: addSubDeck(deck.subDecks, parentId, newDeck)
            };
        }

        return deck;
    });
}

// Export functions to interact with the store
export const decks = {
    subscribe: decksStore.subscribe,

    // Add a new deck
    addDeck: (name: string, parentId?: string) => {
        const newDeck: Deck = {
            id: uuidv4(),
            name: name
        };

        decksStore.update(currentDecks => {
            if (parentId) {
                // Add as a sub-deck to the specified parent
                return addSubDeck(currentDecks, parentId, newDeck);
            } else {
                // Add as a top-level deck
                return [...currentDecks, newDeck];
            }
        });

        return newDeck.id;
    },

    // Update an existing deck
    updateDeck: (id: string, updates: Partial<Deck>) => {
        decksStore.update(currentDecks => {
            function updateDeckInArray(decks: Deck[]): Deck[] {
                return decks.map(deck => {
                    if (deck.id === id) {
                        return { ...deck, ...updates };
                    }

                    if (deck.subDecks && deck.subDecks.length > 0) {
                        return {
                            ...deck,
                            subDecks: updateDeckInArray(deck.subDecks)
                        };
                    }

                    return deck;
                });
            }

            return updateDeckInArray(currentDecks);
        });
    },

    // Delete a deck
    deleteDeck: (id: string) => {
        decksStore.update(currentDecks => {
            function removeFromArray(decks: Deck[]): Deck[] {
                return decks.filter(deck => {
                    if (deck.id === id) return false;

                    if (deck.subDecks && deck.subDecks.length > 0) {
                        deck.subDecks = removeFromArray(deck.subDecks);
                    }

                    return true;
                });
            }

            return removeFromArray(currentDecks);
        });
    },

    // Get a deck by ID
    getDeck: (id: string): Deck | null => {
        const currentDecks = get(decksStore);
        return findDeckById(currentDecks, id);
    }
};