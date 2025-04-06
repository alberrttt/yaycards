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
    class="transition-colors rounded-lg p-1 cursor-pointer {active
        ? 'bg-orange-300/30 dark:bg-orange-900/30'
        : ''} hover:bg-orange-300/30 dark:hover:bg-orange-800/30 row-items text-xs gap-2"
    onclick={handleClick}
>
    <Icon size={12} />
    <p>{label}</p>
</a>
