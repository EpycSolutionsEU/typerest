interface SymbolConstructor {
    (description?: string): symbol

    for(key: string): symbol

    readonly iterator: symbol
    readonly toPrimitive: symbol
}

declare var Symbol: SymbolConstructor


interface Iterator<T> {
    next(value?: any): __IteratorResult<T>
    throw?(value: any): __IteratorResult<T>
    return?(value?: T): __IteratorResult<T>
}

type __IteratorResult<T> = { value: T, done: false } | { value: never, done: true }

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>
}


interface Map<K, V> extends Iterable<[K, V]> {
    readonly size: number

    has(key: K): boolean
    get(key: K): V
    set(key: K, value?: V): this
    delete(key: K): boolean

    clear(): void

    keys(): IterableIterator<K>
    values(): IterableIterator<V>
    entries(): IterableIterator<[K, V]>
}

interface MapConstructor {
    new (): Map<any, any>
    new <K, V>(): Map<K, V>

    readonly prototype: Map<any, any>
}

interface Set<T> extends Iterable<T> {
    readonly size: number

    has(value: T): boolean
    add(value: T): this
    delete(value: T): boolean

    clear(): void

    keys(): IterableIterator<T>
    values(): IterableIterator<T>
    entries(): IterableIterator<[T, T]>
}

interface SetConstructor {
    new (): Set<any>
    new <T>(): Set<T>

    readonly prototype: Set<any>
}


interface WeakMap<K extends object, V> {
    has(key: K): boolean
    get(key: K): V
    set(key: K, value?: V): WeakMap<K, V>
    delete(key: K): boolean

    clear(): void
}

interface WeakMapConstructor {
    new (): WeakMap<any, any>
    new <K extends object, V>(): WeakMap<K, V>

    readonly prototype: WeakMap<object, any>
}


declare var Map: MapConstructor
declare var Set: SetConstructor
declare var WeakMap: WeakMapConstructor


/// NOTE: These are not actually global, just shared between "Reflect*.ts" variants

interface MetadataRegistry {
    registerProvider(provider: MetadataProvider): void

    getProvider(O: object, P: string | symbol | undefined): MetadataProvider | undefined
    setProvider(O: object, P: string | symbol | undefined, provider: MetadataProvider): boolean
}

interface MetadataProvider {
    isProviderFor(O: object, P: string | symbol | undefined): boolean

    OrdinaryDefineOwnMetadata(metadataKey: any, metadataValue: any, O: object, P: string | symbol | undefined): void
    OrdinaryDeleteMetadata(metadataKey: any, O: object, P: string | symbol | undefined): boolean
    OrdinaryHasOwnMetadata(metadataKey: any, O: object, P: string | symbol | undefined): boolean
    OrdinaryGetOwnMetadata(metadataKey: any, O: object, P: string | symbol | undefined): any
    OrdinaryOwnMetadataKeys(O: object, P: string | symbol | undefined): any[]
}
