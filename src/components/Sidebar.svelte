<script lang="ts">
    import {
        AlarmClockCheck,
        ArrowLeftToLine,
        Cog,
        Ham,
        HamIcon,
        Search,
        SquareKanbanIcon,
    } from "@lucide/svelte";
    import Tip from "./Tip.svelte";
    import { sidebarVisible } from "../stores/sidebar";
    import Decks from "./Decks.svelte";
    let nav: HTMLElement;

    function toggle_sidebar() {
        $sidebarVisible = !$sidebarVisible;
    }

    function handleTransitionEnd(event: TransitionEvent) {
        // Only handle the transform transition
        if (event.propertyName === "transform") {
        }
    }
</script>

<nav
    bind:this={nav}
    ontransitionend={handleTransitionEnd}
    class="flex-col-gap card-container standard-transition w-64"
    style:transform={$sidebarVisible ? "translateX(0)" : "translateX(-100%)"}
    style:opacity={$sidebarVisible ? "1" : "0"}
>
    <div class="w-full flex-between rounded-lg relative">
        <p class="pl-1">yaycards</p>
        <Tip title="Toggle sidebar">
            <button class="btn" onclick={toggle_sidebar}>
                <ArrowLeftToLine />
            </button>
        </Tip>
    </div>

    <button
        class="btn-primary w-full flex-row-gap"
        onclick={() => {
            console.log("Search button clicked");
        }}
    >
        <Search class="w-4 h-4" />
        <span class="flex-grow text-left">Search</span>
        <span class="text-sm opacity-50">Ctrl + K</span>
    </button>

    <div class="sidebar-panel">
        <span class="icon-item">
            <AlarmClockCheck size={14} />
            <p>Due Today</p>
        </span>
        <span class="icon-item">
            <SquareKanbanIcon size={14} />
            <p>Dashboard</p>
        </span>
        <span class="icon-item">
            <Cog size={14} />
            <p>New cards</p>
        </span>
    </div>
    <span class="py-4"></span>
    <Decks />
</nav>
