<script lang="ts">
    import { Ham, Menu } from "@lucide/svelte";
    import { page } from "$app/stores";
    import { sidebarVisible } from "../stores/sidebar";
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

<div class="flex flex-row gap-2">
    <header class="header-panel card-container-accent flex-1">
        {#if !$sidebarVisible}
            <button class="btn" on:click={toggleSidebar}>
                <Menu size={20} />
            </button>
        {/if}
        <Tip title="Toggle sidebar">
            <h1 class="text-xl font-medium">{pageTitle}</h1>
        </Tip>
    </header>

    <div class="header-panel bg-blue-50"></div>
</div>
