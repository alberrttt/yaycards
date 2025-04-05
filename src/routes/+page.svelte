<script lang="ts">
    import "../app.css";
    import Sidebar from "../components/Sidebar.svelte";
    import Header from "../components/Header.svelte";
    import { sidebarVisible } from "../stores/sidebar";
    import { activeTab } from "../stores/tabs";
    import { initTheme } from "../stores/theme";
    import { onMount } from "svelte";

    // Import tab components
    import Dashboard from "../tabs/Dashboard.svelte";
    import DueToday from "../tabs/DueToday.svelte";
    import NewCards from "../tabs/NewCards.svelte";
    import Deck from "../tabs/Deck.svelte";

    let isDesktopApp = $state(
        !!(window["__TAURI__" as any] || window["__TAURI_INTERNALS__" as any]),
    );

    $effect(() => {
        console.log("isDesktopApp", isDesktopApp);
    });

    // Create a state variable for nav_pos
    let nav_pos = $state(0);

    // Create a bound prop object that can be passed to Sidebar
    let sidebarProps = $derived({
        nav_pos: nav_pos,
    });

    // Create a function to update nav_pos from Sidebar
    function updateNavPos(newValue: number) {
        nav_pos = newValue;
    }
</script>

<div class="relative h-screen flex p-6 gap-6 overflow-hidden">
    <Sidebar {nav_pos} on:updateNavPos={(e) => updateNavPos(e.detail)} />
    <main
        class="flex flex-col transition-all duration-300 ease-in-out max-w-full flex-1 box-border overflow-hidden"
        style={$sidebarVisible
            ? `margin-left: 0px;`
            : `margin-left: -${nav_pos}px;`}
    >
        <Header />

        <div class="pl-2 overflow-hidden flex-1">
            {#if $activeTab === "dashboard"}
                <Dashboard />
            {:else if $activeTab === "dueToday"}
                <DueToday />
            {:else if $activeTab === "newCards"}
                <NewCards />
            {:else if $activeTab === "deck"}
                <Deck />
            {/if}
        </div>
    </main>
</div>

<style>
    .titlebar-padding {
        padding-top: calc(
            var(--titlebar-height) + 6px
        ); /* titlebar height + original padding */
    }
</style>
