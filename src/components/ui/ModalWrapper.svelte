<script lang="ts">
  import { modalState, closeModal } from "#stores/modal";
  import { X } from "@lucide/svelte";
  let ComponentToShow = $derived($modalState.component);
  let componentProps = $derived($modalState.props ?? {});

  function bgClicked(e: MouseEvent) {
    console.log("bgClicked", e.target, e.currentTarget);
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
</script>

{#if ComponentToShow}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
  <div
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    onclick={bgClicked}
  >
    <div class="card container-padding relative max-w-md w-full z-100">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        onclick={closeModal}
        aria-label="Close modal"
      >
        <X class="w-5 h-5" />
      </button>
      {#if ComponentToShow}
        <ComponentToShow {...componentProps} onclose={closeModal} />
      {/if}
    </div>
  </div>
{/if}
