import { db } from "../app";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const topics = await db.topics.findMany()
	return { topics }
}
