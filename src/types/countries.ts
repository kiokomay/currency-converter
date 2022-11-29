export interface Country {
    name: string;
    topLevelDomain?: (string)[] | null;
    population: number;
    gini: number;
    timezones?: (string)[] | null;
    altSpellings?: (string)[] | null;
    alpha2Code: string;
    alpha3Code: string;
    subregion: string;
    region: string;
    numericCode: string;
    currencies?: (CurrencyEntity)[] | null;
    languages?: (LanguagesEntity)[] | null;
    translations: Translations;
    flag: string;
    regionalBlocs?: (RegionalBlocsEntity)[] | null;
    borders?: (string)[] | null;
    nativeName: string;
    demonym: string;
    area: number;
    callingCodes?: (string)[] | null;
    capital: string;
    cioc: string;
    latlng?: (number)[] | null;
  }
  
  export interface CurrencyEntity {
    code: string;
    name: string;
    symbol: string;
  }
  
  export interface LanguagesEntity {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }
  export interface Translations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
  }
  
  export interface RegionalBlocsEntity {
    acronym: string;
    name: string;
    otherAcronyms?: (null)[] | null;
    otherNames?: (null)[] | null;
  }