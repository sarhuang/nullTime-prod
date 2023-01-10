package app.nulltime.api.lobby

import aws.sdk.kotlin.services.dynamodb.model.KeyType
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.MissingFieldException
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.decodeFromString

@Serializable
data class PingRequestBody(val lobbyKey: String)

class EndpointPing {
  fun handler(req: Request): Response {
    return when(req.method) {
      "GET" -> get()
      "POST" -> post(req)
      else -> Response(501, mapOf("message" to JsonPrimitive("${req.method} not supported by ${req.path}")))
    }
  }

  private fun get(): Response {
    return Response(200, mapOf("message" to JsonPrimitive("Hello World")))
  }

  private fun post(req: Request): Response = runBlocking {
    val reqBody = try {
      Json.decodeFromString<PingRequestBody>(req.body)
    } catch(e: MissingFieldException) {
      val body = mapOf("message" to JsonPrimitive(e.message))
      return@runBlocking Response(400, body)
    }

    val status = pingTableEntry("key", reqBody.lobbyKey, "lobbies")

    val body = when(status) {
      true -> mapOf("message" to JsonPrimitive("Lobby ${reqBody.lobbyKey} exists"), "status" to JsonPrimitive(true))
      false -> mapOf("message" to JsonPrimitive("Lobby ${reqBody.lobbyKey} does not exist"), "status" to JsonPrimitive(false))
    }

    return@runBlocking Response(200, body)
  }
}