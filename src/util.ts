import type { Card } from "./types";
export function getCardDueStatusClass(card: Card): string {
    if (!card.dueDate) return "text-gray-500";

    const now = new Date();
    const dueDate = new Date(card.dueDate);

    if (dueDate < now) return "text-red-500 dark:text-red-400";

    const diffDays = Math.floor(
        (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 0) return "text-amber-600 dark:text-amber-400";
    if (diffDays <= 2) return "text-orange-500 dark:text-orange-400";
    return "text-green-600 dark:text-green-400";
}
export function createExampleCards(): Card[] {
    return [
        {
            id: "1",
            front: "What is the capital of France?",
            back: "Paris",
            tags: ["geography", "europe"],
            lastReviewed: new Date(Date.now() - 86400000 * 3), // 3 days ago
            dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
            difficulty: 2,
        },
        {
            id: "2",
            front: "What is the square root of 144?",
            back: "12",
            tags: ["math", "arithmetic"],
            lastReviewed: new Date(Date.now() - 86400000 * 1), // 1 day ago
            dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
            difficulty: 1,
        },
        {
            id: "3",
            front: "Who wrote 'Romeo and Juliet'?",
            back: "William Shakespeare",
            tags: ["literature", "plays"],
            lastReviewed: new Date(Date.now() - 86400000 * 7), // 7 days ago
            dueDate: new Date(), // today
            difficulty: 3,
        },
        {
            id: "4",
            front: "What is the chemical symbol for gold?",
            back: "Au",
            tags: ["science", "chemistry"],
            lastReviewed: new Date(Date.now() - 86400000 * 2), // 2 days ago
            dueDate: new Date(Date.now() + 86400000 * 1), // tomorrow
            difficulty: 2,
        },
    ];
}