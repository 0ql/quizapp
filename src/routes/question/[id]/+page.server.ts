import { db } from "../../../app";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
	const question = db.questions.findFirst({
		where: {
			id: Number(params.id)
		}
	})
	return question
}
