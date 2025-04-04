<script lang="ts">
    import { Ham, Menu, Sun, Moon } from "@lucide/svelte";
    import { page } from "$app/stores";
    import { sidebarVisible } from "../stores/sidebar";
    import { theme, toggleTheme } from "../stores/theme";
    import Tip from "./Tip.svelte";

    const routeTitles: Record<string, string> = {
        "/": "Home",
        "/decks": "My Decks",
        "/study": "Study",
        "/settings": "Settings",
    };

    $: pageTitle = routeTitles[$page.url.pathname] || "YayCards";

    function toggleSidebar() {
        $sidebarVisible = !$sidebarVisible;
    }
</script>

<div class="flex flex-row gap-2 items-center justify-between w-full">
    <div class="flex items-center gap-2">
        {#if !$sidebarVisible}
            <button class="btn" on:click={toggleSidebar}>
                <Menu size={20} />
            </button>
        {/if}
        <h1 class="text-xl font-semibold">{pageTitle}</h1>
    </div>

    <Tip
        title={$theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"}
    >
        <button class="btn rounded-full p-2" on:click={toggleTheme}>
            {#if $theme === "dark"}
                <Sun size={20} />
            {:else}
                <Moon size={20} />
            {/if}
        </button>
    </Tip>
</div>
