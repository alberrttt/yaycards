<script lang="ts">
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

    onclick(e);
  }
</script>

<a
  {href}
  class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors {active
    ? 'bg-gray-100 dark:bg-gray-800'
    : ''}"
  onclick={handleClick}
>
  <Icon size={12} />
  <p>{label}</p>
</a>
