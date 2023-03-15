
export const DiscordLocaleValues = {
    BULGARIAN:              { a2c: "bg", name: "Bulgarian",                nativeName: "български",},
    CHINESE_CHINA:          { a2c: "cn", name: "Chinese, China",           nativeName: "中文（中国）" },
    CHINESE_TAIWAN:         { a2c: "tw", name: "Chinese, Taiwan",          nativeName: "繁體中文" },
    CROATIAN:               { a2c: "hr", name: "Croatian",                 nativeName: "Hrvatski" },
    CZECH:                  { a2c: "cz", name: "Czech",                    nativeName: "Čeština" },
    DANISH:                 { a2c: "dk", name: "Danish",                   nativeName: "Dansk" },
    DUTCH:                  { a2c: "nl", name: "Dutch",                    nativeName: "Nederlands" },
    ENGLISH_UK:             { a2c: "gb", name: "English, UK",              nativeName: "English, UK" },
    ENGLISH_US:             { a2c: "us", name: "English, US",              nativeName: "English, US" },
    FINNISH:                { a2c: "fi", name: "Finnish",                  nativeName: "Suomi" },
    FRENCH:                 { a2c: "fr", name: "French",                   nativeName: "Français" },
    GERMAN:                 { a2c: "de", name: "German",                   nativeName: "Deutsch" },
    GREEK:                  { a2c: "gr", name: "Greek",                    nativeName: "Ελληνικά" },
    HINDI:                  { a2c: "in", name: "Hindi",                    nativeName: "हिन्दी" },
    HUNGARIAN:              { a2c: "hu", name: "Hungarian",                nativeName: "Magyar" },
    ITALIAN:                { a2c: "it", name: "Italian",                  nativeName: "Italiano" },
    JAPANESE:               { a2c: "jp", name: "Japanese",                 nativeName: "日本語" },
    KOREAN:                 { a2c: "kr", name: "Korean",                   nativeName: "한국어" },
    LITHUANIAN:             { a2c: "lt", name: "Lithuanian",               nativeName: "Lietuviškai" },
    NORWEGIAN:              { a2c: "no", name: "Norwegian",                nativeName: "Norsk" },
    POLISH:                 { a2c: "pl", name: "Polish",                   nativeName: "Polski" },
    PORTUGUESE_BRAZILIAN:   { a2c: "br", name: "Portuguese, Brazilian",    nativeName: "Português do Brasil" },
    ROMANIAN_ROMANIA:       { a2c: "ro", name: "Romanian, Romania",        nativeName: "Română" },
    RUSSIAN:                { a2c: "ru", name: "Russian",                  nativeName: "P\u0443\u0441\u0441кий" },
    SPANISH:                { a2c: "es", name: "Spanish",                  nativeName: "Español" },
    SWEDISH:                { a2c: "se", name: "Swedish",                  nativeName: "Svenska" },
    THAI:                   { a2c: "th", name: "Thai",                     nativeName: "ไทย" },
    TURKISH:                { a2c: "tr", name: "Turkish",                  nativeName: "Türkçe" },
    UKRAINIAN:              { a2c: "ua", name: "Ukrainian",                nativeName: "Українська" },
    VIETNAMESE:             { a2c: "vn", name: "Vietnamese",               nativeName: "Tiếng Việt" },
} as const;
export type DiscordLocale = "BULGARIAN" | "CHINESE_CHINA" | "CHINESE_TAIWAN" | "CROATIAN" | "CZECH" | "DANISH" | "DUTCH" | "ENGLISH_UK" | "ENGLISH_US" | "FINNISH" | "FRENCH" | "GERMAN" | "GREEK" | "HINDI" | "HUNGARIAN" | "ITALIAN" | "JAPANESE" | "KOREAN" | "LITHUANIAN" | "NORWEGIAN" | "POLISH" | "PORTUGUESE_BRAZILIAN" | "ROMANIAN_ROMANIA" | "RUSSIAN" | "SPANISH" | "SWEDISH" | "THAI" | "TURKISH" | "UKRAINIAN" | "VIETNAMESE";

export function getLocaleValue(locale: DiscordLocale) {
    return DiscordLocaleValues[locale];
}

export type GuildYellowPage = {
    id: string;
    icon: string;
    locale: DiscordLocale;
    name: string;
}