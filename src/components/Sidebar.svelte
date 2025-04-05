<script lang="ts">
    import {
        AlarmClockCheck,
        ArrowLeftToLine,
        Cog,
        Ham,
        HamIcon,
        Search,
        SquareKanbanIcon,
        Plus,
        Newspaper,
        Moon,
        Sun,
    } from "@lucide/svelte";
    import Tip from "./Tip.svelte";
    import Tab from "./Tab.svelte";
    import { sidebarVisible } from "../stores/sidebar";
    import { activeTab, type TabType } from "../stores/tabs";
    import Decks from "./Decks.svelte";
    import { createEventDispatcher } from "svelte";
    import { theme, toggleTheme } from "../stores/theme";

    let nav = $state<HTMLElement>();
    const dispatch = createEventDispatcher();

    function toggle_sidebar() {
        $sidebarVisible = !$sidebarVisible;
    }

    function setActiveTab(tab: TabType) {
        $activeTab = tab;
    }

    function handleTransitionEnd(event: TransitionEvent) {}

    // Accept nav_pos as a prop
    let { nav_pos } = $props();

    $effect(() => {
        if (nav) {
            // Calculate the full width including padding and any offset from the edge
            const rect = nav.getBoundingClientRect();
            // Update nav_pos and dispatch it to the parent
            dispatch("updateNavPos", rect.right);
        }
    });
</script>

<nav
    bind:this={nav}
    ontransitionend={handleTransitionEnd}
    class="flex-col-gap card-container min-h-full standard-transition gap-2 px-2 min-h-max"
    style:transform={$sidebarVisible
        ? "translateX(0)"
        : `translateX(-${nav_pos}px)`}
    style:opacity={$sidebarVisible ? "1" : "0"}
>
    <div class="w-full flex-between rounded-lg relative">
        <p class="pl-1">yaycards</p>
        <span class="row-items">
            <Tip
                title={$theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"}
            >
                <button class="btn rounded-full p-3" onclick={toggleTheme}>
                    {#if $theme === "dark"}
                        <Sun size={20} />
                    {:else}
                        <Moon size={20} />
                    {/if}
                </button>
            </Tip>
            <Tip title="Toggle sidebar">
                <button class="btn" onclick={toggle_sidebar}>
                    <ArrowLeftToLine strokeWidth={1.5} />
                </button>
            </Tip>
        </span>
    </div>

    <!-- search -->
    <button
        class="btn-primary w-full flex-row-gap text-sm"
        onclick={() => {
            console.log("Search button clicked");
        }}
    >
        <Search class="w-4 h-4" />
        <span class="flex-grow text-left">Search</span>
        <span class="text-sm opacity-50">Ctrl + K</span>
    </button>

    <div class="p-1 sidebar-panel gap-1 flex flex-col">
        <Tab
            icon={SquareKanbanIcon}
            label="Dashboard"
            active={$activeTab === "dashboard"}
            onclick={() => setActiveTab("dashboard")}
        />
        <Tab
            icon={AlarmClockCheck}
            label="Due Today"
            active={$activeTab === "dueToday"}
            onclick={() => setActiveTab("dueToday")}
        />

        <Tab
            icon={Newspaper}
            label="New Cards"
            active={$activeTab === "newCards"}
            onclick={() => setActiveTab("newCards")}
        />
    </div>
    <span class="border-t-1 border-gray-700/20"></span>
    <Decks />
</nav>
