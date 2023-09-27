import {TMDB} from "tmdb-ts"

export const tmdb = new TMDB(process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN)