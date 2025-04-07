import { type Snippet } from "svelte";
import { writable } from "svelte/store";

export const headerSnippet = writable<Snippet | null>(null)