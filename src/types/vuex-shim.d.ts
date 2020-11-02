import { Store } from '@/store'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    todos;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
