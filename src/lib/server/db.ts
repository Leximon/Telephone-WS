import { env } from '$env/dynamic/private';
import type { DiscordLocale } from '$lib/types';
import { MongoClient, Db, Long } from "mongodb";

export let db: Db
await connectToDatabase()

async function connectToDatabase() {
    if (env.DB_CONN_STRING === undefined) // work around to prevent error during build
        return
    const client = new MongoClient(env.DB_CONN_STRING)
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