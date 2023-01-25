import { db } from "../../../../app";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ params }) => {
	await db.questions.delete({
		where: {
			id: Number(params.id)
		}
	})

	return new Response()
}
