package app.nulltime.api.lobby

import kotlinx.coroutines.runBlocking
import kotlinx.serialization.MissingFieldException
import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive

@Serializable
data class CardDeleteRequestBody(val id: String)

class EndpointCardDelete {
    fun handler(req: Request): Response {
        return when(req.method) {
            "DELETE" -> delete(req)
            else -> Response(501, mapOf("message" to JsonPrimitive("${req.method} not supported by ${req.path}")))
        }
    }

    private fun delete(req: Request): Response = runBlocking {
        val body = HashMap<String, JsonPrimitive>()

        val reqBody = try {
            Json.decodeFromString<CardDeleteRequestBody>(req.body)
        } catch(e: MissingFieldException) {
            body["message"] = JsonPrimitive(e.message)
            return@runBlocking Response(400, body)
        }


        deleteItem("id", reqBody.id, "card-entries")

        body["message"] = JsonPrimitive("Deleted ${reqBody.id} from card-entries")
        return@runBlocking Response(200, body)
    }
}