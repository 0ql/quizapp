import { error } from "@sveltejs/kit";
import { db } from "../../../app";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const res = db.topics.findUnique({
		where: {
			id: Number(params.id)
		},
		include: {
			questions: true
		}
	})
	if (res === null)
		throw error(404, "Not Found")
	return res;
}
