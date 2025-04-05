export interface Deck {
    id: string;
    name: string;
    subDecks?: Deck[];
}
export interface Card {
    id: string;
    front: string;
    back: string;
    tags: string[];
    lastReviewed?: Date;
    dueDate?: Date;
    difficulty?: number;
}