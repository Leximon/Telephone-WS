import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    return json({ allow: (process.env.WALLIDE == 'true') })
}