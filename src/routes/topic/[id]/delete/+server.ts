import { db } from "../../../../app";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ params }) => {
	await db.questions.deleteMany({
		where: {
			topicId: Number(params.id)
		}
	})

	await db.topics.delete({
		where: {
			id: Number(params.id)
		}
	})

	return new Response()
}
