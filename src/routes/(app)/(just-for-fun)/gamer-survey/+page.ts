import type { PageLoad } from './$types';
import {error} from "@sveltejs/kit";

export const load: PageLoad = async ({ url }) => {
    const searchParams = url.searchParams;

    const rawGame = searchParams.get("id");
    if (!rawGame) {
        throw error(400, "Missing parameter 'id'");
    }

    return {
        game: atob(rawGame)
    }
}