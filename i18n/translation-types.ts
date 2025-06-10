import enTranslation from "./locales/en/translation.json";

// Create a type for the nested structure of our translations
export type TranslationKeys = {
  [K in keyof typeof enTranslation]: (typeof enTranslation)[K] extends object
    ? {
        [SubK in keyof (typeof enTranslation)[K]]: (typeof enTranslation)[K][SubK] extends object
          ? {
              [SubSubK in keyof (typeof enTranslation)[K][SubK]]: string;
            }
          : string;
      }
    : string;
};

// Create a flattened type with dot notation for all possible paths
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]> & string}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationPath = NestedKeyOf<typeof enTranslation>;
