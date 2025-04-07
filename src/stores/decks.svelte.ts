import { writable, get, type Writable, type Subscriber, type Unsubscriber, type Updater } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Deck } from '../types';
import { Database } from '@/shim';

export let decks = writable<Deck[]>([]);
