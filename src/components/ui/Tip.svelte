<script lang="ts">
  import type { Snippet } from "svelte";

  const { children, title } = $props<{ children: Snippet; title: string }>();
</script>

{@render children()}
