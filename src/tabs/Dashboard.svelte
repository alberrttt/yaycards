<script lang="ts">
  import { headerSnippet } from "@/stores/misc";
  import { sidebarVisible } from "@/stores/sidebar";

  // Dashboard component for showing general stats and card counts
  $headerSnippet = header;
</script>

{#snippet header()}
  <h1 class={`${$sidebarVisible ? "ml-4" : "ml-2"} text-title`}>Dashboard</h1>
{/snippet}
<div class="ml-2 mt-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="card container-padding">
      <h2 class="text-subtitle mb-4">Study Stats</h2>
      <p class="text-body">Your recent progress will be displayed here.</p>
    </div>

    <div class="card container-padding">
      <h2 class="text-subtitle mb-4">Due Cards</h2>
      <p class="text-body">You have 0 cards due today.</p>
    </div>
  </div>
</div>
