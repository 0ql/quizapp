import type { Questions } from "@prisma/client";
import { db } from "../../../../app";
import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async ({ request }) => {
	const jsn: Questions = await request.json()
	console.log(jsn)
	await db.questions.update({
		where: {
			id: jsn.id
		},
		data: jsn
	})
	return new Response()
}
