import { writable } from 'svelte/store';
import type { Component, ComponentType, Snippet } from 'svelte';

interface ModalState {
    component: Component<any, any, any> | null;
    props?: Record<string, any>;
}

export const modalState = writable<ModalState>({ component: null, props: {} });

export function openModal<
    Props extends Record<string, any>,
    Exports extends Record<string, any>,
    Bindings extends keyof Props | '',
>(component: Component<Props, Exports, Bindings>, props: Props) {
    modalState.set({ component, props });
}

export function closeModal() {
    modalState.set({ component: null, props: {} });
}