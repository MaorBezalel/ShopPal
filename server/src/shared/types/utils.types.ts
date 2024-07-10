import { User } from '@/shared/models/entities';
import type { Request } from 'express';

/**
 * Represents a constructor of a class `TClass` (can be used as a generic type for classes).
 *
 * @template TClass - The class type to represent.
 *
 * @example
 *  class Store {}
 *  function makeStore(storeClass: Class<Store>): Store {
 *      return new storeClass();
 *  }
 */
export type Class<TClass> = new (...args: any[]) => TClass;

/**
 * Type that includes `null` and `undefined` to `T`.
 *
 * @template T - The type to make nullable.
 */
export type Nullable<T> = T | null | undefined;

/**
 * Type that represents nullish values (`null` or `undefined`)
 */
export type Nullish = null | undefined;

/**
 * Type guard that checks if the value is nullish.
 * @param value
 * @returns
 */
export const isNullish = (value: any): value is Nullish => value === null || value === undefined;

/**
 * Type that defines a nominal type of `TNominal` based on type of `TBrand`.
 *
 * @template TNominal - The type to make nominal.
 * @template TBrand - The brand type that is based on the nominal type.
 *
 * @example
 *  type USD = Brand<number, "USD">
 *  type EUR = Brand<number, "EUR">
 *
 *  const tax = 5 as USD;
 *  const usd = 10 as USD;
 *  const eur = 10 as EUR;
 *
 *  function gross(net: USD): USD {
 *    return (net + tax) as USD;
 *  }
 *
 *  // Expect: No compile error
 *  gross(usd);
 *  // Expect: Compile error (Type '"EUR"' is not assignable to type '"USD"'.)
 *  gross(eur);
 */
export type Brand<TNominal, TBrand> = TNominal & { __brand: TBrand };

/**
 * Type that represents the union type of all keys of `TObject`.
 *
 * @template TObject - The object type to get keys from.
 *
 * @example
 *  type Props = { name: string; age: number; visible: boolean };
 *
 *  // Expect: "name" | "age" | "visible"
 *  type PropsKeys = Keys<Props>;
 */
export type Keys<TObject extends object> = keyof TObject;

/**
 * Type that represents the union type of all values of `TObject`.
 *
 * @template TObject - The object type to get values from.
 *
 * @example
 *  type Props = { name: string; age: number; visible: boolean };
 *
 *  // Expect: string | number | boolean
 *  type PropsValues = Values<Props>;
 */
export type Values<TObject extends object> = TObject[keyof TObject];

/**
 * Get the type of property of an object `TObject` at a given key `TKey`.
 *
 * @template TObject - The object type to get property type from.
 * @template TKey - The key of the property to get the type of.
 *
 * @example
 *  type Props = { name: string; age: number; visible: boolean };
 *
 *  // Expect: string
 *  type NameType = PropertyType<Props, 'name'>;
 */
export type PropertyType<TObject, TKey extends keyof TObject> = TObject[TKey];

/**
 * Get the type of a value at a given index `TIndex` in a indexed collection `TCollection`.
 *
 * @template TCollection - The collection type to get the value type from.
 * @template TIndex - The index of the value to get the type of.
 *
 * @example
 *  type Names = ['Alice', 20, true];
 *
 *  // Expect: string
 *  type NameType = ElementType<Names, 0>;
 */
export type ElementType<
    TCollection extends ReadonlyArray<any> | ArrayLike<any>,
    TIndex extends number,
> = TCollection[TIndex];

type Primitives = string | number | boolean | bigint | symbol | undefined | null | Function;

/**
 * Type that strips custom types from a given type `T` and replaces them with their primitive counterparts.
 * Custom types are any types that are not primitives.
 * Useful when wanting to get the primitive types of a complex type without having to manually going through the type declaration file.
 *
 * @template T - The type to strip custom types from.
 * @template TElement - The element type of the array type.
 * @template TKey - The key type of the map type.
 * @template TValue - The value type of the map type.
 * @template TPropertyKey - The property key type of the object type.
 *
 * @example
 *  type ComplexType = {
 *      value: string;
 *      target: Nullable<number | string>;
 *      nesting: {
 *          hello: Primitives;
 *          world: {
 *              nested: {
 *                  value: Event;
 *              };
 *          };
 *      };
 *  };
 *
 * // Expect: {
 * //     value: string;
 * //     target: string | number | null | undefined;
 * //     nesting: {
 * //         hello: string | number | boolean | bigint | symbol | undefined | null | Function;
 * //         world: {
 * //             nested: {
 * //                 value: Function;
 * //             };
 * //         };
 * //     };
 * // };
 * type StrippedType = StripCustomTypes<ComplexType>;
 */
export type StripCustomTypes<T> = T extends Primitives
    ? T
    : T extends Array<infer TElement>
      ? Array<StripCustomTypes<TElement>>
      : T extends Map<infer TKey, infer TValue>
        ? Map<StripCustomTypes<TKey>, StripCustomTypes<TValue>>
        : T extends Set<infer TElement>
          ? Set<StripCustomTypes<TElement>>
          : T extends object
            ? { [TPropertyKey in keyof T]: StripCustomTypes<T[TPropertyKey]> }
            : never;

export type AtMostOneUndefined<T> = {
    [K in keyof T]: (Omit<T, K> & Partial<Pick<T, K>>) | T;
}[keyof T];

export type JwtPayload = {
    email: string;
    username: string;
    user_id: string;
};

export type ErrorResponse = {
    type: string;
    message: string;
    statusCode: number;
};

export interface RequestWithUserPayload extends Request {
    user_id: string;
    username: string;
    email: string;
}