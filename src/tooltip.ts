import type { SvelteComponent } from 'svelte';
import Tooltip from './TooltipFromAction.svelte';

interface TooltipInstance extends SvelteComponent {
    $set: (props: { x: number; y: number }) => void;
}

export function tooltip(element: HTMLElement) {
    let div: HTMLDivElement;
    let title: string | null;
    let tooltipComponent: TooltipInstance;

    function mouseOver(event: MouseEvent) {
        // NOTE: remove the `title` attribute, to prevent showing the default browser tooltip
        // remember to set it back on `mouseleave`
        title = element.getAttribute('title');
        element.removeAttribute('title');

        tooltipComponent = new Tooltip({
            props: {
                title: title ?? '',
                x: event.pageX,
                y: event.pageY,
            },
            target: document.body,
        }) as TooltipInstance;
    }

    function mouseMove(event: MouseEvent) {
        tooltipComponent.$set({
            x: event.pageX,
            y: event.pageY,
        });
    }

    function mouseLeave() {
        tooltipComponent.$destroy();
        // NOTE: restore the `title` attribute
        if (title) {
            element.setAttribute('title', title);
        }
    }

    element.addEventListener('mouseover', mouseOver);
    element.addEventListener('mouseleave', mouseLeave);
    element.addEventListener('mousemove', mouseMove);

    return {
        destroy() {
            element.removeEventListener('mouseover', mouseOver);
            element.removeEventListener('mouseleave', mouseLeave);
            element.removeEventListener('mousemove', mouseMove);
        }
    };
}