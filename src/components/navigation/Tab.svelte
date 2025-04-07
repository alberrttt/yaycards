<script lang="ts">
  import { headerSnippet } from "@/stores/misc";
  import { sidebarVisible } from "@/stores/sidebar";

  interface Props {
    onclick: (e: MouseEvent) => void;
    icon: any; // The Lucide icon component
    label: string;
    active?: boolean;
    href?: string;
  }
  let { onclick, icon, label, active = false, href = "#" }: Props = $props();
  let Icon = icon;
  function handleClick(e: MouseEvent) {
    e.preventDefault();
    $headerSnippet = header;
    onclick(e);
  }
</script>

{#snippet header()}
  <h1 class={`${$sidebarVisible ? "ml-4" : "ml-2"} text-title`}>
    {label}
  </h1>
{/snippet}
<a
  {href}
  class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors {active
    ? 'bg-gray-100 dark:bg-gray-800'
    : ''}"
  onclick={handleClick}
>
  <Icon size={12} />
  <p class="text-sm">{label}</p>
</a>
