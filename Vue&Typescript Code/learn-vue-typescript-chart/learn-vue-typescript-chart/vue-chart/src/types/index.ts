import { VueConstructor } from "vue/types/umd";

type MyVue<T> = VueConstructor<Vue & T>;
// refs
export type MyVueRefs<T> = VueConstructor<Vue & { $refs: T }>;
