import type { PageServerLoad } from './$types';
import { db, type GuildYellowPage } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import { getLocaleValue, type DiscordLocale } from '$lib/types';
import { escapeRegExp } from '$lib/server/utils';

const ENTRIES_PER_PAGE = 20;

export const load: PageServerLoad = async ({ url }) => {
    const collection = db.collection<GuildYellowPage>("yellow_pages")
    const query = url.searchParams.get("q") ?? null
    if (query !== null && query.length > 100)
        throw error(400, "Query too long")
    const localeRaw = url.searchParams.get("locale") ?? null
    if (localeRaw && getLocaleValue(localeRaw as DiscordLocale) === undefined)
        throw error(400, "Invalid locale")
    const locale = localeRaw as DiscordLocale | null

    const obj: any = {}
    if (query)
        obj.name = { $regex: RegExp(escapeRegExp(query), "i") }
    if (locale)
        obj.locale = locale

        
    let page = parseInt(url.searchParams.get("p") ?? "0")
    if (isNaN(page) || page < 0)
        throw error(400, "Invalid page number")
    const total = await collection.countDocuments(obj)
    const totalPages = Math.ceil(total / ENTRIES_PER_PAGE)
    page = Math.max(Math.min(totalPages - 1, page), 0)
    
    const yellowPages = await collection.find(obj)
        .sort({name: 1})
        .limit(ENTRIES_PER_PAGE)
        .skip(ENTRIES_PER_PAGE * page)
        .toArray()

    return {
        query,
        locale,
        page,
        totalPages,
        yellowPages: yellowPages.map(page => ({
            id: page._id.toString(),
            icon: page.icon,
            locale: page.locale,
            name: page.name
        }))
    };
};