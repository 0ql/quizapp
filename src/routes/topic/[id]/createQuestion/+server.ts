import type { Questions } from "@prisma/client";
import { db } from "../../../../app";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, params }) => {
	const jsn: Questions = await request.json()
	await db.topics.update({
		where: {
			id: Number(params.id),
		},
		data: {
			questions: {
				create: {
					questionString: jsn.questionString,
					type: Number(jsn.type),
					correct: jsn.correct,
					option2: jsn.option2,
					option3: jsn.option3,
					option4: jsn.option4,
				}
			}
		}
	})

	return new Response()
}
