namespace Reflect {
    type HashMap<V> = Record<string, V>

    interface BufferLike {
        [offset: number]: number
        length: number
    }

    type MemberDecorator = (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => PropertyDescriptor | void

    declare const global: any
    declare const globalThis: any

    declare const crypto: Crypto
    declare const msCrypto: Crypto


    /**
     * Applies a set of decorators to a target object.
     *
     * @param decorators    An array to decorators
     * @param target        The target object
     *
     * @returns The result of applying the provided decorators
     * @remarks Decorators are applied in reverse order of their positions in the array
     *
     * @example
     * class Example { }
     *
     * // constructor
     * Example = Reflect.decorate(decorators, Example);
     */
    export declare function decorate(decorators: ClassDecorator[], target: Function): Function

    /**
     * Applies a set of decorators to a property of a target object
     *
     * @param decorators    An array of decorators
     * @param target        The target object
     * @param propertyKey   The property key to decorate
     * @param attributes    A property descriptor
     *
     * @remarks Decorators are applied in reverse order
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod() { }
     *    method() { }
     * }
     *
     * // property (on constructor)
     * Reflect.decorate(decoratorsArray, Example, "staticProperty");
     *
     * // property (on prototype)
     * Reflect.decorate(decoratorsArray, Example.prototype, "prototype");
     *
     * // method (on constructor)
     * Object.defineProperty(
     *      Example, "staticMethod",
     *      Reflect.decorate(
     *           decoratorsArray, Example, "staticMethod", Object.getOwnPropertyDescriptor(Example, "staticMethod")
     *      )
     * );
     *
     * // method (on prototype)
     * Object.defineProperty(
     *      Example.prototype, "method",
     *      Reflect.decorate(
     *          decoratorsArray, Example.prototype, "method", Object.getOwnPrototypeDescriptor(Example.prototype, "method")
     *      )
     * );
     */
    export declare function decorate(decorators: (PropertyDecorator | PropertyDecorator)[], target: any, propertyKey: string | symbol, attributes?: PropertyDescriptor | null): PropertyDescriptor | undefined;

    /**
     * Applies a set of decorators to a property of a target object.
     *
     * @param decorators    An array of decorator
     * @param target        The target object
     * @param propertyKey   The property key to decoreate
     * @param attributes    A prperty descriptor
     *
     * @remarks Decorators are applied in reverse order.
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod() { }
     *    method() { }
     * }
     *
     * // property (on constructor)
     * Reflect.decorate(decoratorsArray, Example, "staticProperty");
     *
     * // property (on prototype)
     * Reflect.decorate(decoratorsArray, Example.prototype, "property");
     *
     * // method (on constructor)
     * Object.defineProperty(
     *      Example, "staticMethod",
     *      Reflect.decorate(
     *           decoratorsArray, Example, "staticMethod", Object.getOwnPropertyDescriptor(Example, "staticMethod")
     *      )
     * );
     *
     * // method (on prototype)
     * Object.defineProperty(
     *      Example.prototype, "method",
     *      Reflect.decorate(
     *          decoratorsArray, Example.prototype, "method", Object.getOwnPrototypeDescriptor(Example.prototype, "method")
     *      )
     * );
     */
    export declare function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: any, propertyKey: string | symbol, attributes: PropertyDescriptor): PropertyDescriptor

    /**
     * A default metadata decorator factory that can be used on a class, class member, or parameter.
     *
     * @param metadataKey   The key for the metadata entity.
     * @param metadataValue The value for the metadata entry.
     *
     * @returns A decorator function
     * @remarks
     * If `metadataKey` is already defined for the target and target key, the
     * metadataValue for that key will be overwritten.
     *
     * @example
     *
     * // constructor
     * @Reflect.metadata(key, value)
     * class Example { }
     *
     * // property (on constructor, TypeScript only)
     * class Example {
     *    @Reflect.metadata(key, value)
     *    static staticProperty;
     * }
     *
     * // property (on prototype, TypeScript only)
     * class Example {
     *    @Reflect.metdata(key, value)
     *    property;
     * }
     *
     * // method (on constructor)
     * class Example {
     *    @Reflect.metadata(key, value)
     *    static staticMethod() { }
     * }
     *
     * // method (on prototype)
     * class Example {
     *    @Reflect.metadata(key, value)
     *    method() { }
     * }
     */
    export declare function metadata(metadataKey: any, metadataValue: any): {
        (target: Function): void;
        (target: any, propertyKey: string | symbol): void;
    }

    /**
     * Define a unique metadata entry on the target.
     *
     * @param metadataKey   A key used to store and retrieve metadata.
     * @param metadataValue A value that contains attached metadata.
     * @param target        The target object on which to define metadata.
     *
     * @example
     * class Example { }
     *
     * // constructor
     * Reflect.defineMetadata("custom:annotation", options, Example);
     *
     * // decorator factory as metadata-producing annotation.
     * function MyAnnotation(options): ClassDecorator {
     *    return (target) => Reflect.defineMetadata("custom:annotation", options, target);
     * }
     */
    export declare function defineMetadata(metadataKey: any, metadataValue: any, target: any): void

    /**
     * Define a unique metadata entry on the target.
     *
     * @param metadataKey   A key used to store and retrieve metadata.
     * @param metadataValue A value that contains attached metadata.
     * @param target        The target object on which to define metadata.
     * @param propertyKey   The property key for the target
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, thouh they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * Reflect.defineMetadata("custom:annotation", Number, Example, "staticProperty");
     *
     * // property (on prototype)
     * Reflect.defineMetadata("custom:annotation", Number, Example.prototype, "property");
     *
     * // method (on constructor)
     * Reflect.defineMetadata("custom:annotation", Number, Example, "staticMethod");
     *
     * // method (on prototype)
     * Reflect.defineMetadata("custom:annotation", Number, Example.prototype, "method");
     *
     * // decorator factory as metadata-producing annotation.
     * function MyAnnotation(options): PropertyDecorator {
     *    return (target, key) => Reflect.defineMetadata("custom:annotation", options, target, key);
     * }
     */
    export declare function defineMetadata(metadataKey: any, metadataValue: any, target: any, propertyKey: string | symbol): void

    /**
     * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
     *
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target      The target object on which the metadata is defined
     *
     * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
     *
     * @example
     *
     * class Example { }
     *
     * // constructor
     * result = Reflect.hasMetadata("custom:annotation", Example);
     */
    export declare function hasMetadata(metadataKey: any, target: any): boolean

    /**
     * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
     *
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target      The target object on which the metadata is defined.
     * @param propertyKey The property key for thr target.
     *
     * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
     *
     * @example
     *
     * class Example {
     *    // prototype declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
     *
     * // property (on prototype)
     * result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
     *
     * // method (on constructor)
     * result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
     *
     * // method (on prototype)
     * result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
     */
    export declare function hasMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean

    /**
     * Gets a value indicating whether the target object has the provided metadata key defined.
     *
     * @param metadataKey A key used to store and retrieve metadata.
     * @param target      The target object on which the metadata is defined.
     *
     * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
     *
     * @example
     *
     * class Example { }
     *
     * // constructor
     * result = Reflect.hasOwnMetadata("custom:annotation", Example);
     */
    export declare function hasOwnMetadata(metadataKey: any, target: any): boolean

    /**
     * Gets a value indicating whether the target object has the provided metadata key definied.
     *
     * @param metadataKey A key used to store retrieve metadata
     * @param target      The target object on which the metadata is defined
     * @param propertyKey The property key for the target
     *
     * @returns `true` if the metadata key was defined on the target object; otherwise, `false`
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     * // property (on prototype)
     * result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     * // method (on constructor)
     * result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     * // method (on property)
     * result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
     */
    export declare function hasOwnMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean

    /**
     * Gets the metadata value for the provided metadata key on the target object or its prototype chain
     *
     * @param metadataKey A key used to store and retrieve metadata
     * @param target      The target object onm which the metadata is defined
     *
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`
     *
     * @example
     *
     * class Example { }
     *
     * // constructor
     * result = Reflect.getMetadata("custom:annotation", Example);
     */
    export declare function getMetadata(metadataKey: any, target: any): any

    /**
     * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
     *
     * @param metadataKey A key used to store and retrieve metadata
     * @param target      The target object on which the metadata is defined
     * @param propertyKey The property key for the target
     *
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
     *
     * // property (on prototype)
     * result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
     *
     * // method (on constructor)
     * result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
     *
     * // method (on prototype)
     * result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
     */
    export declare function getMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any

    /**
     * Gets the metadata value for the provided metadata key on the target object.
     *
     * @param metdataKey A key used to store and retrieve metadata
     * @param target     The target object on which the metadata is defined
     *
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`
     *
     * @example
     *
     * class Example { }
     *
     * // constructor
     * result = Reflect.getOwnMetadata("custom:annotation", Example);
     */
    export declare function getOwnMetadata(metadataKey: any, target: any): any

    /**
     * Gets the metadata value for the provided metadata key on the target object.
     *
     * @param metadataKey A key used to store and retrieve metadata
     * @param target      The target object on which the metadata is defined
     * @param propertyKey The property key for the target
     *
     * @returns The metadata value for the metadata key if found; otherwise, `undefined`
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
     *
     * // property (on prototype)
     * result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
     *
     * // method (on constructor)
     * result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
     *
     * // method (on prototype)
     * result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
     */
    export declare function getOwnMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any

    /**
     * Gets the metadata keys defined on the target object or its prototype chain.
     *
     * @param target The target object on which the metadata is defined
     *
     * @returns An array of unique metadata keys
     *
     * @example
     *
     * class Example { }
     *
     * // constructor
     * result = Reflect.getMetadataKeys(Example);
     */
    export declare function getMetadataKeys(target: any): any[]

    /**
     * Gets the metadata keys defined on the target object or its prototype chain.
     *
     * @param target      The target object on which the metadata is defined
     * @param propertyKey The property key for the target
     *
     * @returns An array of unique metadata keys
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * result = Reflect.getMetadataKeys(Example, "staticProperty");
     *
     * // property (on prototype)
     * result = Reflect.getMetadataKeys(Example.prototype, "property");
     *
     * // method (on constructor)
     * result = Reflect.getMetadataKeys(Example, "staticMethod");
     *
     * // method (on prototype)
     * result = Reflect.getMetadataKeys(Example.prototype, "method");
     */
    export declare function getMetadataKeys(target: any, propertyKey: string | symbol): any[]

    /**
     * Gets the unique metadata keys defined on the target object.
     *
     * @param target The target object on which the metadata is defined
     *
     * @returns An array of unique metadata keys
     *
     * @example
     *
     * class Example { }
     *
     * // constructor
     * result = Reflect.getOwnMetadataKeys(Example);
     */
    export declare function getOwnMetadataKeys(target: any): any[]

    /**
     * Gets the unique metadata keys defined on the target object.
     *
     * @param target      The target object on which the metadata is defined
     * @param propertyKey The property key for the target
     *
     * @returns An array of unique metadata keys
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
     *
     * // property (on prototype)
     * result = Reflect.getOwnMetadataKeys(Example, "property");
     *
     * // method (on constructor)
     * result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
     *
     * // method (on property)
     * result = Reflect.getOwnMetadataKeys(Example, "method");
     */
    export declare function getOwnMetadataKeys(target: any, propertyKey: string | symbol): any[]

    /**
     * Delete the metadata entry from the target object with the provided key
     *
     * @param metadataKey A key used to store and retrieve metadata
     * @param target      The target object on which the metadata is defined
     *
     * @returns `true` if the metadata entry was found and deleted; otherwise, `false`
     *
     * @example
     *
     * class Example { }
     *
     * // constructor
     * result = Reflect.deleteMetadata("custom:annotation", Example);
     */
    export declare function deleteMetadata(metadataKey: any, target: any): boolean

    /**
     * Deletes the metadata entry from the target object with the provided key
     *
     * @param metadataKey A key used to store and retrieve metadata
     * @param target      The target object on which the metadata is defined
     * @param propertyKey The property key for the target
     *
     * @returns `true` if the metadata entry was found and deleted; otherwise, `false`
     *
     * @example
     *
     * class Example {
     *    // property declarations are not part of ES6, though they are valid in TypeScript:
     *    // static staticProperty;
     *    // property;
     *
     *    static staticMethod(p) { }
     *    method(p) { }
     * }
     *
     * // property (on constructor)
     * result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
     *
     * // property (on prototype)
     * result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
     *
     * // method (on constructor)
     * result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
     *
     * // method (on prototype)
     * result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
     */
    export declare function deleteMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean



    (function (this: any, factory: (exporter: <K extends keyof typeof Reflect>(key: K, value: typeof Reflect[K]) => void, root: any) => void) {
        const root =
            typeof globalThis === 'object' ? globalThis :
            typeof global     === 'object' ? global     :
            typeof self       === 'object' ? self       :
            typeof this       === 'object' ? this       :
            sloppyModeThis()

        let exporter = makeExporter(Reflect);
        if(typeof root.Reflect !== 'undefined') exporter = makeExporter(root.Reflect, exporter)

        factory(exporter, root)

        if(typeof root.Reflect === 'undefined') root.Reflect = Reflect

        function makeExporter(target: typeof Reflect, previous?: <K extends keyof typeof Reflect>(key: K, value: typeof Reflect[K]) => void) {
            return <K extends keyof typeof Reflect>(key: K, value: typeof Reflect[K]) => {
                Object.defineProperty(target, key, { configurable: true, writable: true, value })
                if(previous) previous(key, value)
            }
        }

        function functionThis() {
            try { return Function('return this;')() } catch(_) { }
        }

        function indirectEvalThis() {
            try { return (void 0, eval)('(function() { return this; })()') } catch(_) { }
        }

        function sloppyModeThis() {
            return functionThis() || indirectEvalThis()
        }
    })

    (function (exporter, root) {
        const hasOwn = Object.prototype.hasOwnProperty

        // feature test for Symbol support
        const supportsSymbol = typeof Symbol === 'function'
        const toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== 'undefined' ? Symbol.toPrimitive : '@@toPrimitive'
        const iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== 'undefined' ? Symbol.iterator : '@@iterator'
        const supportsCreate = typeof Object.create === 'function'
        const supportsProto = { __proto__: [] } instanceof Array
        const downLevel = !supportsCreate && !supportsProto

        const HashMap = {
            create: supportsCreate
                ? <V>() => MakeDictionary(Object.create(null) as HashMap<V>)
                : supportsProto
                    ? <V>() => MakeDictionary({ __proto__: null as any } as HashMap<V>)
                    : <V>() => MakeDictionary({ } as HashMap<V>),

            has: downLevel
                ? <V>(map: HashMap<V>, key: string | number | symbol) => hasOwn.call(map, key)
                : <V>(map: HashMap<V>, key: string | number | symbol) => key in map,

            get: downLevel
                ? <V>(map: HashMap<V>, key: string | number | symbol): V | undefined => hasOwnMetadata.call(map, key) ? map[key as string | number] : undefined
                : <V>(map: HashMap<V>, key: string | number | symbol): V | undefined => map[key as string | number]
        }

        // Load global or shim versions of Map, Set and WeakMap
        const functionPrototype = Object.getPrototypeOf(Function)

        const _Map: typeof Map = typeof Map === 'function' && typeof Map.prototype.entries === 'function' ? Map : CreateMapPolyfill()
        const _Set: typeof Set = typeof Set === 'function' && typeof Set.prototype.entries === 'function' ? Set : CreateSetPolyfill()
        const _WeakMap: typeof WeakMap = typeof WeakMap === 'function' ? WeakMap : CreateWeakMapPolyfill()

        const registrySymbol = supportsSymbol ? Symbol.for('@typerest/reflector:registry') : undefined
        const metadataRegistry = GetOrCreateMetadataRegistry()
        const metadataProvider = CreateMetadataProvider(metadataRegistry)


        function decorate(decorators: ClassDecorator[], target: Function): Function
        function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: any, propertyKey: string | symbol, attributes?: PropertyDescriptor | null): PropertyDescriptor | undefined
        function decorate(decorators: (PropertyDecorator | MethodDecorator)[], target: any, propertyKey: string | symbol, attributes: PropertyDescriptor): PropertyDescriptor

        /**
         * Applies a set of decorators to a property of a target object
         *
         * @param decorators  An array of decorators
         * @param target      The target object
         * @param propertyKey (Optional) The property key to decorate
         * @param attributes  (Optional) The property descriptor for the target key
         *
         * @remarks Decorators are applied in reverse order
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * Example = Reflect.decorate(decoratorsArray, Example);
         *
         * // property (on constructor)
         * Reflect.decoreate(decoratorsArray, Example, "staticProperty");
         *
         * // property (on prototype)
         * Reflect.decoreate(decoratorsArray, Example, "property");
         *
         * // method (on constructor)
         * Object.defineProperty(
         *      Example, "staticMethod",
         *      Reflect.decorate(
         *           decoratorsArray, Example, "staticMethod", Object.getOwnPropertyDescriptor(Example, "staticMethod")
         *      )
         * );
         *
         * // method (on prototype)
         * Object.defineProperty(
         *      Example.prototype, "method",
         *      Reflect.decorate(
         *          decoratorsArray, Example.prototype, "method", Object.getOwnPrototypeDescriptor(Example.prototype, "method")
         *      )
         * );
         */
        function decorate(decorators: (ClassDecorator | MemberDecorator)[], target: any, propertyKey?: string | symbol, attributes?: PropertyDescriptor | null): PropertyDescriptor | Function | undefined {
            if(!isUndefined(propertyKey)) {
                if(!isArray(decorators)) throw new TypeError()
                if(!isObject(target)) throw new TypeError()
                if(!isObject(attributes) && !isUndefined(attributes) && !isNull(attributes)) throw new TypeError()
                if(isNull(attributes)) attributes = undefined

                propertyKey = toPropertyKey(propertyKey)

                return DecorateProperty(<MemberDecorator[]> decorators, target, propertyKey, attributes)
            } else {
                if(!isArray(decorators)) throw new TypeError()
                if(!isConstructor(target)) throw new TypeError()

                return DecorateConstructor(<ClassDecorator[]> decorators, <Function> target)
            }
        }

        exporter('decorate', decorate)


        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter
         *
         * @param metadataKey   The key for the metadata entry
         * @param metadataValue The value for the metadata entry
         *
         * @returns A decorator function
         *
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten
         *
         * @example
         *
         * // constructor
         * @Reflect.metadata(key, value)
         * class Example { }
         *
         * // property (on constructor, TypeScript only)
         * class Example {
         *    @Reflect.metadata(key, value)
         *    static staticProperty;
         * }
         *
         * // property (on prototype, TypeScript only)
         * class Example {
         *    @Reflect.metadata(key, value)
         *    property;
         * }
         *
         * // method (on constructor)
         * class Example {
         *    @Reflect.metadata(key, value)
         *    static staticMethod() { }
         * }
         *
         * // method (on prototype)
         * class Example {
         *    @Reflect.metadata(key, value)
         *    method() { }
         * }
         */
        function metadata(metadataKey: any, metadataValue: any) {
            function decorator(target: Function): void
            function decorator(target: any, propertyKey: string | symbol): void

            function decorator(target: any, propertyKey?: string | symbol): void {
                if(!isObject(target)) throw new TypeError()
                if(!isUndefined(propertyKey) && !isPropertyKey(propertyKey)) throw new TypeError()

                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey)
            }

            return decorator;
        }

        exporter('metadata', metadata)


        function defineMetadata(metadataKey: any, metadataValue: any, target: any): void
        function defineMetadata(metadataKey: any, metadataValue: any, target: any, propertyKey: string | symbol): void

        /**
         * Define a unique metadata entry on the target
         *
         * @param metadataKey   A key used to store and retrieve metadata
         * @param metadataValue A value that contains attached metadata
         * @param target        The target object on which to define metadata
         * @param propertyKey   (Optional) The property key for the target
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * Reflect.defineMetadata("custom:annotation", options, Example);
         *
         * // property (on constructor)
         * Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         * // property (on prototype)
         * Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         * // method (on constructor)
         * Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         * // method (on prototype)
         * Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *
         * // decorator factory as metadata-producing annotation
         * function MyAnnotation(options): Decorator {
         *    return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         * }
         */
        function defineMetadata(metadataKey: any, metadataValue: any, target: any, propertyKey?: string | symbol): void {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) propertyKey = toPropertyKey(propertyKey)

            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey)
        }

        exporter('defineMetadata', defineMetadata)


        function hasMetadata(metadataKey: any, target: any): boolean
        function hasMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean

        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined
         *
         * @param metadataKey A key used to store and retrieve metadata
         * @param target      The target object on which the metadata is defined
         * @param propertyKey (Optional) The property key for the target
         *
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * result = Reflect.hasMetadata("custom:annotation", Example);
         *
         * // property (on constructor)
         * result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         * // property (on prototype)
         * result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         * // method (on constructor)
         * result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         * // method (on prototype)
         * result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         */
        function hasMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): boolean {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) toPropertyKey(propertyKey)

            return OrdinaryHasMetadata(metadataKey, target, propertyKey)
        }

        exporter('hasMetadata', hasMetadata)


        function hasOwnMetadata(metadataKey: any, target: any): boolean
        function hasOwnMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean

        /**
         * Gets a value indicating whether the target object has the provided metadata key defined
         *
         * @param metadataKey A key used to store and retrieve metadata
         * @param target      The target object on which the metadata is defined
         * @param propertyKey (Optional) The property key for the target
         *
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         * // property (on constructor)
         * result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         * // property (on prototype)
         * result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         * // method (on constructor)
         * result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         * // method (on prototype)
         * result = Reflect.getOwnMetadata("custom:annotation", Example, "method");
         */
        function hasOwnMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): boolean {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) propertyKey = toPropertyKey(propertyKey)

            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey)
        }

        exporter('hasOwnMetadata', hasOwnMetadata)


        function getMetadata(metadataKey: any, target: any): any
        function getMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any

        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain
         *
         * @param metadataKey A key used to store and retrieve metadata
         * @param target      The target object on which the metadata is defined
         * @param propertyKey (Optional) The property key for the target
         *
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         */
        function getMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): any {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) propertyKey = toPropertyKey(propertyKey)

            return OrdinaryGetMetadata(metadataKey, target, propertyKey)
        }

        exporter('getMetadata', getMetadata)


        function getOwnMetadata(metadataKey: any, target: any): any
        function getOwnMetadata(metadataKey: any, target: any, propertyKey: string | symbol): any

        /**
         * Gets the metadata value for the provided metadata key on the target object
         *
         * @param metadataKey A key used to store and retrieve metadata
         * @param target      The target object on which the metadata is defined
         * @param propertyKey (Optional) The property key for the target
         *
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         * // property (on constructor)
         * result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         * // property (on prototype)
         * result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         * // method (on constructor)
         * result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         * // method (on prototype)
         * result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         */
        function getOwnMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): any {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) propertyKey = toPropertyKey(propertyKey)

            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey)
        }

        exporter('getOwnMetadata', getOwnMetadata)


        function getMetadataKeys(target: any): any[]
        function getMetadataKeys(target: any, propertyKey: string | symbol): any[]

        /**
         * Gets the metadata keys defined on the target object or its prototype chain
         *
         * @param target      The target object on which the metadata is defined
         * @param propertyKey (Optional) The property key for the target
         *
         * @returns An array of unique metadata keys
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * result = Reflect.getMetadataKeys(Example);
         *
         * // property (on constructor)
         * result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         * // property (on prototype)
         * result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         * // method (on constructor)
         * result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         * // method (on prototype)
         * result = Reflect.getMetadataKeys(Example.prototype, "method");
         */
        function getMetadataKeys(target: any, propertyKey?: string | symbol): any[] {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) propertyKey = toPropertyKey(propertyKey)

            return OrdinaryMetadataKeys(target, propertyKey)
        }

        exporter('getMetadataKeys', getMetadataKeys)


        function getOwnMetadataKeys(target: any): any[]
        function getOwnMetadataKeys(target: any, propertyKey: string | symbol): any[]

        /**
         * Gets the unique metadata keys defined on the target object
         *
         * @param target      The target object on which the metadata is defined
         * @param propertyKey (Optional) The property key for the target
         *
         * @returns An array of unique metadata keys
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * result = Reflect.getOwnMetadataKeys(Example);
         *
         * // property (on constructor)
         * result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         * // property (on prototype)
         * result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         * // method (on constructor)
         * result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         * // method (on prototype)
         * result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         */
        function getOwnMetadataKeys(target: any, propertyKey?: string | symbol): any[] {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) propertyKey = toPropertyKey(propertyKey)

            return OrdinaryOwnMetadataKeys(target, propertyKey)
        }

        exporter('getOwnMetadataKeys', getOwnMetadataKeys)


        function deleteMetadata(metadataKey: any, target: any): boolean
        function deleteMetadata(metadataKey: any, target: any, propertyKey: string | symbol): boolean

        /**
         * Deletes the metadata form the target object with the provided key
         *
         * @param metadataKey A key used to store and retrieve metadata
         * @param target      The target object on which the metadata is defined
         * @param propertyKey (Optional) The property key for the target
         *
         * @returns `true` if the metadata entry was found and deleted; otherwise `false`
         *
         * @example
         *
         * class Example {
         *    // property declarations are not part of ES6, though they are valid in TypeScript:
         *    // static staticProperty;
         *    // property;
         *
         *    constructor(p) { }
         *
         *    static staticMethod(p) { }
         *    method(p) { }
         * }
         *
         * // constructor
         * result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         * // property (on constructor)
         * result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         * // property (on prototype)
         * result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         * // method (on constructor)
         * result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         * // method (on prototype)
         * result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         */
        function deleteMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): boolean {
            if(!isObject(target)) throw new TypeError()
            if(!isUndefined(propertyKey)) propertyKey = toPropertyKey(propertyKey)

            const provider = GetMetadataProvider(target, propertyKey, false)
            if(isUndefined(provider)) return false

            return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey)
        }

        exporter('deleteMetadata', deleteMetadata)



        function DecorateConstructor(decorators: ClassDecorator[], target: Function): Function {
            for(let i = decorators.length - 1; i >= 0; i--) {
                const decorator = decorators[i]
                const decorated = decorator(target)

                if(!isUndefined(decorated) && !isNull(decorated)) {
                    if(!isConstructor(decorated)) throw new TypeError()
                    target = <Function> decorated
                }
            }

            return target
        }

        function DecorateProperty(decorators: MemberDecorator[], target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor | undefined): PropertyDescriptor | undefined {
            for(let i = decorators.length - 1; i >= 0; --i) {
                const decorator = decorators[i]
                const decorated = decorator(target, propertyKey, descriptor)

                if(!isUndefined(decorated) && !isNull(decorated)) {
                    if(!isObject(decorated)) throw new TypeError()
                    descriptor = <PropertyDescriptor> decorated
                }
            }

            return descriptor
        }


        function OrdinaryHasMetadata(metadataKey: any, O: any, P: string | symbol | undefined): boolean {
            const hasOwn = OrdinaryHasOwnMetadata(metadataKey, O, P)
            if(hasOwn) return true

            const parent = OrdinaryGetPrototypeOf(O)
            if(!isNull(parent)) return OrdinaryHasMetadata(metadataKey, parent, P);

            return false
        }

        function OrdinaryHasOwnMetadata(metadataKey: any, O: any, P: string | symbol | undefined): boolean {
            const provider = GetMetadataProvider(O, P, false)
            if(isUndefined(provider)) return false

            return toBoolean(provider.OrdinaryHasOwnMetadata(metadataKey, O, P))
        }

        function OrdinaryGetMetadata(metadataKey: any, O: any, P: string | symbol | undefined): any {
            const hasOwn = OrdinaryHasOwnMetadata(metadataKey, O, P)
            if(hasOwn) return OrdinaryGetOwnMetadata(metadataKey, O, P)

            const parent = OrdinaryGetPrototypeOf(O)
            if(!isNull(parent)) return OrdinaryGetMetadata(metadataKey, parent, P)

            return undefined
        }

        function OrdinaryGetOwnMetadata(metadataKey: any, O: any, P: string | symbol | undefined): any {
            const provider = GetMetadataProvider(O, P, false)
            if(isUndefined(provider)) return

            return provider.OrdinaryGetOwnMetadata(metadataKey, O, P)
        }

        function OrdinaryDefineOwnMetadata(metadataKey: any, metadataValue: any, O: any, P: string | symbol | undefined): void {
            const provider = GetMetadataProvider(O, P, true)
            provider.OrdinaryDefineOwnMetadata(metadataKey, metadataValue, O, P)
        }

        function OrdinaryMetadataKeys(O: any, P: string | symbol | undefined): any[] {
            const ownKeys = OrdinaryOwnMetadataKeys(O, P)
            const parent = OrdinaryGetPrototypeOf(O)

            if(parent === null) return ownKeys

            const parentKeys = OrdinaryMetadataKeys(parent, P)
            if(parentKeys.length <= 0) return ownKeys
            if(ownKeys.length <= 0) return parentKeys

            const set = new _Set<any>()
            const keys: any[] = []

            for(const key of ownKeys) {
                const hasKey = set.has(key)
                if(!hasKey) {
                    set.add(key)
                    keys.push(key)
                }
            }

            for(const key of parentKeys) {
                const hasKey = set.has(key)
                if(!hasKey) {
                    set.add(key)
                    keys.push(key)
                }
            }

            return keys
        }

        function OrdinaryOwnMetadataKeys(O: any, P: string | symbol | undefined): any[] {
            const provider = GetMetadataProvider(O, P, false)
            if(!provider) return []

            return provider.OrdinaryOwnMetadataKeys(O, P)
        }


        function Type(x: any): Tag {
            if(x === null) return Tag.NULL

            switch(typeof x) {
                case 'undefined': return Tag.UNDEFINED
                case 'boolean': return Tag.BOOLEAN
                case 'string': return Tag.STRING
                case 'symbol': return Tag.SYMBOL
                case 'number': return Tag.NUMBER
                case 'object': return x === null ? Tag.NULL :  Tag.OBJECT

                default: return Tag.OBJECT
            }
        }

        const enum Tag {
            UNDEFINED,
            NULL,

            BOOLEAN,
            STRING,
            SYMBOL,
            NUMBER,
            OBJECT
        }


        function isUndefined(x: any): x is undefined {
            return x === undefined
        }

        function isNull(x: any): x is null {
            return x === null
        }

        function isSymbol(x: any): x is symbol {
            return typeof x === 'symbol'
        }

        function isObject<T>(x: T | undefined | null | boolean | string | symbol | number): x is T {
            return typeof x === 'object' ? x !== null : typeof x === 'function'
        }


        function toPrimitive(input: any, prefferedType?: Tag): undefined | null | boolean | string | symbol | number {
            switch(Type(input)) {
                case Tag.UNDEFINED: return input
                case Tag.NULL: return input
                case Tag.BOOLEAN: return input
                case Tag.STRING: return input
                case Tag.SYMBOL: return input
                case Tag.NUMBER: return input
            }

            const hint: 'string' | 'number' | 'default' = prefferedType === Tag.STRING ? 'string' : prefferedType === Tag.NUMBER ? 'number' : 'default'
            const exoticToPrim = getMethod(input, toPrimitiveSymbol)

            if(exoticToPrim !== undefined) {
                const result = exoticToPrim.call(input, hint)
                if(isObject(result)) throw new TypeError()

                return result
            }

            return OrdinaryToPrimitive(input, hint === 'default' ? 'number' : hint)
        }

        function OrdinaryToPrimitive(O: any, hint: 'string' | 'number'): undefined | null | boolean | string | symbol | number {
            if(hint === 'string') {
                const toString = O.toString
                if(isCallable(toString)) {
                    const result = toString.call(0)
                    if(!isObject(result)) return result
                }

                const valueOf = O.valueOf
                if(isCallable(valueOf)) {
                    const result = valueOf.call(O)
                    if(!isObject(result)) return result
                }
            } else {
                const valueOf = O.valueOf
                if(isCallable(valueOf)) {
                    const result = valueOf.call(O)
                    if(!isObject(result)) return result
                }

                const toString = O.toString
                if(isCallable(toString)) {
                    const result = valueOf.call(O)
                    if(!isObject(result)) return result
                }
            }

            throw new TypeError()
        }


        function toBoolean(argument: any): boolean {
            return !!argument
        }

        function toString(argument: any): string {
            return "" + argument
        }

        function toPropertyKey(argument: any): string | symbol {
            const key = toPrimitive(argument, Tag.STRING)
            if(isSymbol(key)) return key

            return toString(key)
        }


        function isArray(argument: any): argument is any[] {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === '[object Array]'
        }

        function isCallable(argument: any): argument is Function {
            /// NOTE: This is an approximation as we cannot check for [[Call]] internal method
            return typeof argument === 'function'
        }

        function isConstructor(argument: any): argument is Function {
            /// NOTE: This is an approximation as we cannot check for [[Constructor]] internal method
            return typeof argument === 'function'
        }

        function isPropertyKey(argument: any): argument is string | symbol {
            switch(Type(argument)) {
                case Tag.STRING: return true
                case Tag.SYMBOL: return true

                default: return false
            }
        }

        function sameValueZero(x: any, y: any) {
            return x === y || x !== x && y !== y
        }


        function getMethod(V: any, P: any): Function | undefined {
            const func = V[P]

            if(func === undefined || func === null) return undefined
            if(!isCallable(func)) throw new TypeError()

            return func
        }

        function getIterator<T>(obj: Iterable<T>): Iterator<T> {
            const method = getMethod(obj, iteratorSymbol)
            if(!isCallable(method)) throw new TypeError()

            const iterator = method.call(obj)
            if(!isObject(iterator)) throw new TypeError()

            return iterator
        }


        function IteratorValue<T>(iterResult: __IteratorResult<T>): T {
            return iterResult.value
        }

        function IteratorStep<T>(iterator: Iterator<T>): __IteratorResult<T> | false {
            const result = iterator.next()
            return result.done ? false : result
        }

        function IteratorClose<T>(iterator: Iterator<T>) {
            const f = iterator['return']
            if(f) f.call(iterator)
        }


        function OrdinaryGetPrototypeOf(O: any): any {
            const proto = Object.getPrototypeOf(O)
            if(typeof O !== 'function' || O === functionPrototype) return proto

            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.

            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when ES6 or when using __proto__ in a compatible browser.
            if(proto !== functionPrototype) return proto

            // If the super prototype is Object.prototype, null, or undefined, that we cannot determine the heritage.
            const prototype = O.prototype
            const prototypeProto = prototype && Object.getPrototypeOf(prototype)
            if(prototypeProto == null || prototypeProto === Object.prototype) return proto

            // If the constructor was not a function, then we cannot determine the heritage.
            const constructor = prototypeProto.constructor
            if(typeof constructor !== 'function') return proto

            // If we have some kind of self-reference, then we cannot determine the heritage.
            if(constructor === O) return proto

            // We have a pretty good guess at the heritage.
            return constructor
        }

        /**
         * Creates a registry used to allow multiple `reflect-metadata` providers.
         */
        function CreateMetadataRegistry(): MetadataRegistry {
            let fallback: MetadataProvider | undefined
            if(
                !isUndefined(registrySymbol) &&
                typeof root.Reflect !== 'undefined' &&
                !(registrySymbol in root.Reflect) &&
                typeof root.Reflect.defineMetadata === 'function'
            ) {
                // Interoperate with older version of `reflect-metadata` that did not support a registry
                fallback = CreateFallbackProvider(root.Reflect)
            }

            let first: MetadataProvider | undefined
            let second: MetadataProvider | undefined
            let rest: Set<MetadataProvider> | undefined

            const targetProviderMap = new _WeakMap<object, Map<string | symbol | undefined, MetadataProvider>>()
            const registry: MetadataRegistry = {
                registerProvider,
                getProvider,
                setProvider
            }

            return registry


            function registerProvider(provider: MetadataProvider) {
                if(!Object.isExtensible(registry)) throw new Error('Cannot add provider to a frozen registry.')

                switch(true) {
                    case fallback === provider: break
                    case isUndefined(first): first = provider; break

                    case first === provider: break
                    case isUndefined(second): second = provider; break

                    default:
                        if(rest === undefined) rest = new _Set()
                        rest.add(provider)
                        break
                }
            }

            function getProviderNoCache(O: object, P: string | symbol | undefined) {
                if(!isUndefined(first)) {
                    if(first.isProviderFor(O, P)) return first
                    if(!isUndefined(second)) {
                        if(second.isProviderFor(O, P)) return first
                        if(!isUndefined(rest)) {
                            const iterator = getIterator(rest)
                            while(true) {
                                const next = IteratorStep(iterator)
                                if(!next) return undefined

                                const provider = IteratorValue(next)
                                if(provider.isProviderFor(O, P)) {
                                    IteratorClose(iterator)
                                    return provider
                                }
                            }
                        }
                    }
                }

                if(!isUndefined(fallback) && fallback.isProviderFor(O, P)) return fallback
                return undefined
            }

            function getProvider(O: object, P: string | symbol | undefined) {
                let providerMap = targetProviderMap.get(O)
                let provider: MetadataProvider | undefined

                if(!isUndefined(providerMap)) provider = providerMap.get(P)
                if(!isUndefined(provider)) return provider

                provider = getProviderNoCache(O, P)
                if(!isUndefined(provider)) {
                    if(isUndefined(providerMap)) {
                        providerMap = new _Map()
                        targetProviderMap.set(O, providerMap)
                    }

                    providerMap.set(P, provider)
                }

                return provider
            }

            function hasProvider(provider: MetadataProvider) {
                if(isUndefined(provider)) throw new TypeError()
                return first === provider || second === provider || !isUndefined(rest) && rest.has(provider)
            }

            function setProvider(O: object, P: string | symbol | undefined, provider: MetadataProvider) {
                if(!hasProvider(provider)) throw new Error('Metadata provider not registered.')

                const existingProvider = getProvider(O, P)
                if(existingProvider !== provider) {
                    if(!isUndefined(existingProvider)) return false

                    let providerMap = targetProviderMap.get(O)
                    if(isUndefined(providerMap)) {
                        providerMap = new _Map()
                        targetProviderMap.set(O, providerMap)
                    }

                    providerMap.set(P, provider)
                }

                return true
            }
        }


        /**
         * Gets or creates the shard registry of metadata providers.
         */
        function GetOrCreateMetadataRegistry(): MetadataRegistry {
            let metadataRegistry: MetadataRegistry | undefined

            if(!isUndefined(registrySymbol) && isObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
                metadataRegistry = (root.Reflect as any)[registrySymbol] as MetadataRegistry | undefined
            }
            if(isUndefined(metadataRegistry)) metadataRegistry = CreateMetadataRegistry()
            if(!isUndefined(registrySymbol) && isObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
                Object.defineProperty(root.Reflect, registrySymbol, {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: metadataRegistry
                })
            }

            return metadataRegistry
        }

        function CreateMetadataProvider(registry: MetadataRegistry): MetadataProvider {
            const metadata = new _WeakMap<any, Map<string | symbol | undefined, Map<any, any>>>()
            const provider: MetadataProvider = {
                isProviderFor(O, P) {
                    const targetMetadata = metadata.get(O)
                    if(isUndefined(targetMetadata)) return false

                    return targetMetadata.has(P)
                },

                OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata,
                OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata,
                OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata,
                OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys,
                OrdinaryDeleteMetadata: OrdinaryDeleteMetadata
            }

            metadataRegistry.registerProvider(provider)
            return provider


            function GetOrCreateMetadataMap(O: object, P: string | symbol | undefined, Create: true): Map<any, any>
            function GetOrCreateMetadataMap(O: object, P: string | symbol | undefined, Create: false): Map<any, any> | undefined

            function GetOrCreateMetadataMap(O: object, P: string | symbol | undefined, Create: boolean) {
                let targetMetadata = metadata.get(O)
                let createdTargetMetadata = false

                if(isUndefined(targetMetadata)) {
                    if(!Create) return undefined

                    targetMetadata = new _Map<string | symbol | undefined, Map<any, any>>()
                    metadata.set(O, targetMetadata)

                    createdTargetMetadata = true
                }

                let metadataMap = targetMetadata.get(P)
                if(isUndefined(metadataMap)) {
                    if(!Create) return undefined

                    metadataMap = new _Map<any, any>()
                    targetMetadata.set(P, metadataMap)

                    if(!registry.setProvider(O, P, provider)) {
                        targetMetadata.delete(P)
                        if(createdTargetMetadata) metadata.delete(O)

                        throw new Error('Wrong provider for target.')
                    }
                }

                return metadataMap
            }

            function OrdinaryHasOwnMetadata(metadataKey: any, O: object, P: string | symbol | undefined): boolean {
                const metadataMap = GetOrCreateMetadataMap(O, P, false)
                if(isUndefined(metadataMap)) return false

                return toBoolean(metadataMap.has(metadataKey))
            }

            function OrdinaryGetOwnMetadata(metadataKey: any, O: object, P: string | symbol | undefined): any {
                const metadataMap = GetOrCreateMetadataMap(O, P, false)
                if(isUndefined(metadataMap)) return undefined

                return metadataMap.get(metadataKey)
            }

            function OrdinaryDefineOwnMetadata(metadataKey: any, metadataValue: any, O: object, P: string | symbol | undefined): void {
                const metadataMap = GetOrCreateMetadataMap(O, P, true)
                metadataMap.set(metadataKey, metadataValue)
            }

            function OrdinaryOwnMetadataKeys(O: any, P: string | symbol | undefined): any[] {
                const keys: any[] = []
                const metadataMap = GetOrCreateMetadataMap(O, P, false)
                if(isUndefined(metadataMap)) return keys

                const keysObj = metadataMap.keys()
                const iterator = getIterator(keysObj)
                let k = 0

                while(true) {
                    const next = IteratorStep(iterator)
                    if(!next) {
                        keys.length = k
                        return keys
                    }

                    const nextValue = IteratorValue(next)
                    try {
                        keys[k] = nextValue
                    } catch(error) {
                        try {
                            IteratorClose(iterator)
                        } finally {
                            throw error
                        }
                    }

                    k++
                }
            }

            function OrdinaryDeleteMetadata(metadataKey: any, O: object, P: string | symbol | undefined): boolean {
                const metadataMap = GetOrCreateMetadataMap(O, P, false)
                if(isUndefined(metadataMap)) return false
                if(!metadataMap.delete(metadataKey)) return false

                if(metadataMap.size === 0) {
                    const targetMetadata = metadata.get(O)
                    if(!isUndefined(targetMetadata)) {
                        targetMetadata.delete(P)
                        if(targetMetadata.size === 0) metadata.delete(targetMetadata)
                    }
                }

                return false
            }
        }

        function CreateFallbackProvider(reflect: typeof Reflect): MetadataProvider {
            const { defineMetadata, hasOwnMetadata, getOwnMetadata, getOwnMetadataKeys, deleteMetadata } = reflect
            const metadataOwner = new _WeakMap<object, Set<string | symbol | undefined>>()

            const provider: MetadataProvider = {
                isProviderFor(O, P) {
                    let metadataPropertySet = metadataOwner.get(O)
                    if(!isUndefined(metadataPropertySet) && metadataPropertySet.has(P)) return true
                    if(getOwnMetadataKeys(O, P!).length) {
                        if(isUndefined(metadataPropertySet)) {
                            metadataPropertySet = new _Set()
                            metadataOwner.set(O, metadataPropertySet)
                        }

                        metadataPropertySet.add(P)
                        return true
                    }

                    return false
                },

                OrdinaryDefineOwnMetadata: defineMetadata,
                OrdinaryHasOwnMetadata: hasOwnMetadata,
                OrdinaryGetOwnMetadata: getOwnMetadata,
                OrdinaryOwnMetadataKeys: getOwnMetadataKeys,
                OrdinaryDeleteMetadata: deleteMetadata
            }

            return provider
        }

        function GetMetadataProvider(O: object, P: string | symbol | undefined, Create: true): MetadataProvider
        function GetMetadataProvider(O: object, P: string | symbol | undefined, Create: false): MetadataProvider | undefined

        /**
         * Gets the metadata provider for an object. If the object has no metadata provider and this is for a create operation,
         * then this module's metadata provider is assigned to the object.
         */
        function GetMetadataProvider(O: object, P: string | symbol | undefined, Create: boolean): MetadataProvider | undefined {
            const registeredProvider = metadataRegistry.getProvider(O, P)
            if(!isUndefined(registeredProvider)) return registeredProvider

            if(Create) {
                if(metadataRegistry.setProvider(O, P, metadataProvider)) return metadataProvider
                throw new Error('Illegal state.')
            }

            return undefined
        }


        function CreateMapPolyfill(): MapConstructor {
            const cacheSentinel = { }
            const arraySentinel: any[] = []

            class MapIterator<K, V, R extends (K | V | [K, V])> implements IterableIterator<R> {
                private _keys: K[]
                private _values: V[]
                private _index = 0
                private _selector: (key: K, value: V) => R

                constructor(keys: K[], values: V[], selector: (key: K, value: V) => R) {
                    this._keys = keys
                    this._values = values
                    this._selector = selector
                }

                '@@iterator'(): IterableIterator<R> { return this }
                [iteratorSymbol](): IterableIterator<R> { return this }

                next(): __IteratorResult<R> {
                    const index = this._index

                    if(index >= 0 && index < this._keys.length) {
                        const result = this._selector(this._keys[index], this._values[index])
                        if(index + 1 >= this._keys.length) {
                            this._index = -1
                            this._keys = arraySentinel
                            this._values = arraySentinel
                        } else {
                            this._index++
                        }

                        return { value: result, done: false }
                    }

                    return { value: <never> undefined, done: true }
                }

                throw(error: any): __IteratorResult<R> {
                    if(this._index >= 0) {
                        this._index = -1
                        this._keys = arraySentinel
                        this._values = arraySentinel
                    }

                    throw error
                }

                return(value?: R): __IteratorResult<R> {
                    if(this._index >= 0) {
                        this._index = -1
                        this._keys = arraySentinel
                        this._values = arraySentinel
                    }

                    return { value: <never> value, done: true }
                }
            }

            interface MapIterator<K, V, R extends (K | V | [K, V])> {
                [Symbol.iterator](): IterableIterator<R>
            }

            class Map<K, V> {
                private _keys: K[] = []
                private _values: (V | undefined)[] = []

                private _cacheKey: any = cacheSentinel
                private _cacheIndex = -2

                get size() { return this._keys.length }

                has(key: K): boolean { return this._find(key, false) >= 0 }

                get(key: K): V | undefined {
                    const index = this._find(key, false)
                    return index >= 0 ? this._values[index] : undefined
                }

                set(key: K, value: V): this {
                    const index = this._find(key, true)
                    this._values[index] = value

                    return this
                }

                delete(key: K): boolean {
                    const index = this._find(key, false)

                    if(index >= 0) {
                        const size = this._keys.length
                        for(let i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i]
                            this._values[i - 1] = this._values[i]
                        }

                        this._keys.length--
                        this._values.length--

                        if(sameValueZero(key, this._cacheKey)) {
                            this._cacheKey = cacheSentinel
                            this._cacheIndex = -2
                        }

                        return true
                    }

                    return false
                }

                clear(): void {
                    this._keys.length = 0
                    this._values.length = 0

                    this._cacheKey = cacheSentinel
                    this._cacheIndex = -2
                }

                keys() { return new MapIterator(this._keys, this._values, getKey) }

                values() { return new MapIterator(this._keys, this._values, getValue) }
                entries() { return new MapIterator(this._keys, this._values, getEntry) }

                '@@iterator'() { return this.entries() }
                [iteratorSymbol]() { return this.entries() }


                private _find(key: K, insert?: boolean): number {
                    if(!sameValueZero(this._cacheKey, key)) {
                        this._cacheIndex = -1

                        for(let i = 0; i < this._keys.length; i++) {
                            if(sameValueZero(this._keys[i], key)) {
                                this._cacheIndex = i
                                break
                            }
                        }
                    }

                    if(this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length
                        this._keys.push(key)
                        this._values.push(undefined)
                    }

                    return this._cacheIndex
                }
            }


            interface Map<K, V> {
                [Symbol.iterator](): IterableIterator<[K, V]>
            }

            return Map


            function getKey<K, V>(key: K, _: V) {
                return key
            }

            function getValue<K, V>(_: K, value: V) {
                return value
            }

            function getEntry<K, V>(key: K, value: V) {
                return [key, value] as [K, V]
            }
        }

        function CreateSetPolyfill(): SetConstructor {
            class Set<T> {
                private _map = new _Map<any, any>()

                get size() { return this._map.size }

                has(value: T): boolean { return this._map.has(value) }
                add(value: T): Set<T> { return this._map.set(value, value), this }
                delete(value: T): boolean { return this._map.delete(value) }

                clear(): void { this._map.clear() }

                keys() { return this._map.keys() }
                values() { return this._map.values() }
                entries() { return this._map.entries() }

                '@@iterator'() { return this.keys() }
                [iteratorSymbol]() { return this.keys() }
            }

            interface Set<T> {
                [Symbol.iterator](): IterableIterator<T>
            }


            return Set;
        }

        function CreateWeakMapPolyfill(): WeakMapConstructor {
            const UUID_SIZE = 16

            const keys = HashMap.create<boolean>()
            const rootKey = CreateUniqueKey()

            return class WeakMap<K, V> {
                private _key = CreateUniqueKey()

                has(target: K): boolean {
                    const table = GetOrCreateWeakMapTable<K>(target, false)
                    return table !== undefined ? HashMap.has(table, this._key) : false
                }

                get(target: K): V {
                    const table = GetOrCreateWeakMapTable<K>(target, false)
                    return table !== undefined ? HashMap.get(table, this._key) : undefined
                }

                set(target: K, value: V): WeakMap<K, V> {
                    const table = GetOrCreateWeakMapTable<K>(target, true)
                    table[this._key] = value

                    return this
                }

                delete(target: K): boolean {
                    const table= GetOrCreateWeakMapTable<K>(target, false)
                    return table !== undefined ? delete table[this._key] : false
                }

                clear(): void {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey()
                }
            }

            function CreateUniqueKey(): string {
                let key: string
                do key = '@@WeakMap@@' + CreateUUID()

                while(HashMap.has(keys, key))
                keys[key] = true

                return key
            }


            function GetOrCreateWeakMapTable<K>(target: K, create: true): HashMap<any>
            function GetOrCreateWeakMapTable<K>(target: K, create: false): HashMap<any> | undefined

            function GetOrCreateWeakMapTable<K>(target: K, create: boolean): HashMap<any> | undefined {
                if(!hasOwn.call(target, rootKey)) {
                    if(!create) return undefined
                    Object.defineProperty(target, rootKey, { value: HashMap.create<any>() })
                }

                return (<any> target)[rootKey]
            }


            function FillRandomBytes(buffer: BufferLike, size: number): BufferLike {
                for(let i = 0; i < size; ++i) buffer[i] = Math.random() * 0xFF | 0
                return buffer
            }

            function GetRandomBytes(size: number): BufferLike {
                if(typeof Uint8Array === 'function') {
                    const array = new Uint8Array(size)
                    if(typeof crypto !== 'undefined') crypto.getRandomValues(array)
                    else if(typeof msCrypto !== 'undefined') msCrypto.getRandomValues(array)
                    else FillRandomBytes(array, size)

                    return array
                }

                return FillRandomBytes(new Array(size), size)
            }


            function CreateUUID() {
                const data = GetRandomBytes(UUID_SIZE)

                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40
                data[8] = data[8] & 0xbf | 0x80

                let result = ''
                for(let offset = 0; offset < UUID_SIZE; ++offset) {
                    const byte = data[offset]

                    if(offset === 4 || offset === 5 || offset === 8) result += '-'
                    if(byte < 16) result += 0

                    result += byte.toString(16).toLowerCase()
                }

                return result
            }
        }

        function MakeDictionary<T>(obj: T): T {
            (<any> obj).__ = undefined

            delete (<any> obj).__
            return obj
        }
    })
}
