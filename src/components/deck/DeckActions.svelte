<script>
  import {
    Filter,
    SortAsc,
    BarChart3,
    Download,
    Share2,
    BarChart,
    ChartColumn,
  } from "@lucide/svelte";
  import Tip from "#components/ui/Tip.svelte";
</script>

<div
  class="flex justify-between items-center px-2 py-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg"
>
  <div class="flex gap-3">
    <button class="btn-ghost text-sm flex items-center gap-1">
      <Filter class="w-4 h-4" />
      <span>Filter</span>
    </button>

    <button class="btn-ghost text-sm flex items-center gap-1">
      <SortAsc class="w-4 h-4" />
      <span>Sort</span>
    </button>
  </div>

  <div class="flex gap-2">
    <Tip title="View statistics">
      <button class="btn-ghost">
        <ChartColumn class="w-4 h-4" />
      </button>
    </Tip>

    <Tip title="Export deck">
      <button class="btn-ghost">
        <Download class="w-4 h-4" />
      </button>
    </Tip>

    <Tip title="Share deck">
      <button class="btn-ghost">
        <Share2 class="w-4 h-4" />
      </button>
    </Tip>
  </div>
</div>
