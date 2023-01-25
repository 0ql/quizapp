import { db } from "../../../../app";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ params, request }) => {
	const jsn = await request.json()
	console.log(jsn)
	const res = await db.$queryRaw`select * from Questions where topicId = ${params.id} and type = ${jsn.type} order by random() limit ${jsn.amount}`
	return new Response(JSON.stringify(res));
}
