package app.nulltime.api.lobby

import kotlinx.serialization.json.JsonPrimitive

class EndpointCardModify {
    fun handler(req: Request): Response {
        return when(req.method) {
            "PUT" -> put()
            else -> Response(501, HashMap())
        }
    }

    private fun put(): Response {
        val body = HashMap<String, JsonPrimitive>()

        body["message"] = JsonPrimitive("Modify Card Request Received")

        return Response(200, body)
    }
}