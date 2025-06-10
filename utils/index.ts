// Chain utility type for nested object path strings
export type Chain<T> = {
  [K in keyof T & (string | number)]: T[K] extends Record<string, any>
    ? `${K}.${Chain<T[K]>}` | K
    : K;
}[keyof T & (string | number)];

// Add other utility types and functions as needed
