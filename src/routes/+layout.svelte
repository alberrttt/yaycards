<script lang="ts">
    import "../app.css";
    import Sidebar from "../components/Sidebar.svelte";
    import Header from "../components/Header.svelte";
    import { sidebarVisible } from "../stores/sidebar";
</script>

<div
    class="max-h-screen relative flex p-6 gap-6 overflow-hidden"
    style="--sidebar-width: 16rem;"
>
    <Sidebar />
    <main
        class="flex flex-col min-h-screen pt-2 transition-all duration-300 ease-in-out max-w-full flex-1"
        style={$sidebarVisible
            ? ""
            : "margin-left: calc(-1 * var(--sidebar-width));"}
    >
        <Header />
        <div class="flex-1">
            <slot />
        </div>
    </main>
</div>
