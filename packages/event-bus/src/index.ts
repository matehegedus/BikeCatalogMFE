import { EventEmitter } from "tseep";

export type CartEvent = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartSummary = {
  count: number;
  total: number;
};

type CartEventMap = {
  "cart:add": (_event: CartEvent) => void;
  "cart:remove": (_event: CartEvent) => void;
  "cart:update": (_event: CartEvent) => void;
  "cart:updated": (_summary: CartSummary) => void;
};

class CartBusSingleton {
  private static instance: CartBusSingleton;
  private emitter: EventEmitter<CartEventMap>;

  private constructor() {
    this.emitter = new EventEmitter<CartEventMap>();
  }

  static getInstance(): CartBusSingleton {
    if (!this.instance) {
      this.instance = new CartBusSingleton();
    }
    return this.instance;
  }

  publish<K extends keyof CartEventMap>(
    event: K,
    payload: Parameters<CartEventMap[K]>[0],
  ): void {
    this.emitter.emit(event, ...([payload] as Parameters<CartEventMap[K]>));
  }

  subscribe<K extends keyof CartEventMap>(
    event: K,
    listener: CartEventMap[K],
  ): void {
    this.emitter.on(event, listener);
  }

  unsubscribe<K extends keyof CartEventMap>(
    event: K,
    listener: CartEventMap[K],
  ): void {
    this.emitter.off(event, listener);
  }
}

export const cartBus = CartBusSingleton.getInstance();
Object.freeze(cartBus);
