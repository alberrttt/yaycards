// basically we gon target the browser + desktop + mobile

import { decks } from "@/stores/decks.svelte";
import type { Deck } from "@/types";

// frontend basically the same but 
export const isNativeApp =
    !!(window["__TAURI__" as any] || window["__TAURI_INTERNALS__" as any])
    ;
// FOR BROWSER USE ONLY
export namespace Database {
    let db: IDBDatabase | null = null;
    export function init() {
        let open_request = indexedDB.open("yaycards", 1);
        open_request.onupgradeneeded = function (event) {
            let db = (event.target as any).result;
            if (!db.objectStoreNames.contains("decks")) {
                db.createObjectStore("decks", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("cards")) {
                db.createObjectStore("cards", { keyPath: "id" });
            }
            console.log("initializing database");

        };
        open_request.onsuccess = function (event) {
            db = (event.target as any).result;
            getDecks().then((x) => {
                console.log(x);
                decks.set(x);
            });
        };
        open_request.onerror = function (event) {
            console.error("Database error: ", event);
        };
        open_request.onblocked = function (event) {
            console.warn("Database open request blocked: ", event);
        };


    }
    export function getDecks(): Promise<Deck[]> {
        console.log(db)
        return new Promise((resolve, reject) => {
            if (!db) {
                reject("Database not initialized");
                return;
            }
            let transaction = db.transaction("decks", "readonly");
            let store = transaction.objectStore("decks");
            let request = store.getAll();
            request.onsuccess = function (event) {

                resolve((event.target as any).result);
            };
            request.onerror = function (event) {
                reject(event);
            };
        });
    }
    export function createDeck(deck: Deck) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject("Database not initialized");
                return;
            }
            let transaction = db.transaction("decks", "readwrite");
            let store = transaction.objectStore("decks");
            let request = store.add(deck);

            request.onsuccess = function (event) {
                decks.update((decks) => [...decks, deck]);
                resolve(event);
            };
            request.onerror = function (event) {
                console.error("Error adding deck: ", event);
                reject(event);
            };
        });
    }
}