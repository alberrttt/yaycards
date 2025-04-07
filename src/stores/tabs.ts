import { writable } from 'svelte/store';

// Define possible tabs in the application
export type TabType = 'dueToday' | 'dashboard' | 'newCards' | 'deck';

// Store for the currently active tab
export const activeTab = writable<TabType>('dashboard');

// Store for the currently selected deck ID when in deck view
export const activeDeckId = writable<string | null>(null);
activeDeckId.subscribe((value) => {
    console.log('Active deck ID changed:', value);
});