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
    <button
      class="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm flex items-center gap-1 hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <Filter class="w-4 h-4" />
      <span>Filter</span>
    </button>

    <button
      class="px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm flex items-center gap-1 hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <SortAsc class="w-4 h-4" />
      <span>Sort</span>
    </button>
  </div>

  <div class="flex gap-2">
    <Tip title="View statistics">
      <button
        class="p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ChartColumn class="w-4 h-4" />
      </button>
    </Tip>

    <Tip title="Export deck">
      <button
        class="p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <Download class="w-4 h-4" />
      </button>
    </Tip>

    <Tip title="Share deck">
      <button
        class="p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <Share2 class="w-4 h-4" />
      </button>
    </Tip>
  </div>
</div>
