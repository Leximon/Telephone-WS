import { DB_CONN_STRING } from '$env/static/private';
import type { DiscordLocale } from '$lib/types';
import { MongoClient, Db, Long } from "mongodb";

export let db: Db
await connectToDatabase()

async function connectToDatabase() {
    if (DB_CONN_STRING === undefined) // work around to prevent error during build
        return
    const client = new MongoClient(DB_CONN_STRING)
    await client.connect()
    db = client.db("telephone")
    console.log("Connected to database!")
}

export type GuildYellowPage = {
    _id: Long,
    icon: string,
    locale: DiscordLocale,
    name: string
}