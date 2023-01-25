import { db } from "../../../app";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const jsn = await request.json()

	const res = await db.topics.create({
		data: {
			name: jsn.name
		}
	})

	return new Response(JSON.stringify(res))
}
