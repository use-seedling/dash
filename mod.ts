type Nullable<T> = T | null;

export class Cache {
  #limit: number;
  #entries: Map<string | number, any>;
  constructor(cacheLimit: number) {
    this.#limit = cacheLimit;
    this.#entries = new Map();
  }
  set(key: string | number, data: any): void {
    if (this.#entries.size >= this.#limit) {
      this.#entries.delete(this.#entries.keys().next().value);
      this.#entries.set(key, data);
    } else this.#entries.set(key, data);
  }
  get(key: string | number): Nullable<any> {
    if (this.#entries.has(key)) {
      this.#entries.set(key, this.#entries.get(key));
      return this.#entries.get(key);
    } else return null;
  }
  get limit(): number {
    return this.#limit;
  }
  get size(): number {
    return this.#entries.size;
  }
}
