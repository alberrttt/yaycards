import { writable } from 'svelte/store';

// Check if dark mode is preferred in system or was previously set
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default for SSR
};

export const theme = writable<'dark' | 'light'>(getInitialTheme() as any);
export function applyClass(newTheme: 'dark' | 'light') {
    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        // remove light
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.remove('dark');
        // add light
        document.documentElement.classList.add('light');
    }
}
// Update theme and persist to localStorage
export function toggleTheme() {
    theme.update(currentTheme => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);

            // Apply theme to document
            applyClass(newTheme);
        }
        return newTheme;
    });
}

// Initialize theme on client-side
export function initTheme() {
    if (typeof window !== 'undefined') {
        theme.subscribe(value => {
            if (value === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }
}