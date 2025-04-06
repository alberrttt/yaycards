# COPILOT INSUTRCTIONS

If you're a human, please ignore this file.

1. You're trained on outdated code. This codebase uses Svelte 5, you're most likely on Svelte 4.

Here's a concise summary of the Svelte 5 migration guide:

### Key Changes in Svelte 5
   - `let` → `$state` for reactive variables
   - `$:` → `$derived` for computed values and `$effect` for side effects
   - `export let` → `$props()` with destructuring for component props
   - `on:event` → `onevent` attributes (e.g., `on:click` → `onclick`)
   - `createEventDispatcher` deprecated in favor of callback props
   - Event modifiers removed (handle manually in handlers)
   - Slots deprecated in favor of snippet props
   - Named slots become regular props
   - `{@render}` replaces `<slot>` for rendering content
   - Components are now functions instead of classes
   - Use `mount()`/`hydrate()` instead of `new Component()`
   - `bind:this` returns exports/props instead of instance methods
   - `beforeUpdate`/`afterUpdate` replaced by `$effect`

2. Don't let components run 400 lines long. If there's a sub-component that can be created in a new file, do it.