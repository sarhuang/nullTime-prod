package app.nulltime.api.lobby

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.BatchExecuteStatementRequest
import aws.sdk.kotlin.services.dynamodb.model.BatchStatementRequest
import aws.sdk.kotlin.services.dynamodb.model.ScanRequest
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.MissingFieldException
import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonPrimitive


@Serializable
data class CloseRequestBody(val lobbyKey: String)

class EndpointClose {
    fun handler(req: Request): Response {
        return when(req.method) {
            "POST" -> post(req)
            else -> Response(501, mapOf("message" to JsonPrimitive("Method ${req.method} not supported by ${req.path}")))
        }
    }

    private fun post(req: Request): Response = runBlocking {
        val body = HashMap<String, JsonElement>()

        val reqBody = try {
            Json.decodeFromString<CloseRequestBody>(req.body)
        } catch(e: MissingFieldException) {
            body["message"] = JsonPrimitive(e.message)
            return@runBlocking Response(400, body)
        }

        if(!pingTableEntry("key", reqBody.lobbyKey, "lobbies")) {
            body["message"] = JsonPrimitive("Lobby ${reqBody.lobbyKey} does not exist")
            return@runBlocking Response(400, body)
        }

        body["cards"] = JsonArray(getCards(reqBody.lobbyKey)?.map { card -> JsonPrimitive(card) } ?: listOf())

        return@runBlocking Response(200, body)
    }

    private suspend fun getCards(lobbyKey: String): Set<String>? {
        val dbReq = ScanRequest {
            tableName = "card-entries"
            filterExpression = "lobbyKey = :lk"
            expressionAttributeValues = mapOf(
                ":lk" to AttributeValue.S(lobbyKey)
            )
        }

        DynamoDbClient { region = "us-east-1" }.use {ddb ->
            val dbRes = ddb.scan(dbReq)
            if(dbRes.items == null) return null

            dbRes.items!!.map { item -> deleteItem("id", item["id"]?.asS() ?: "", "card-entries") }
            deleteItem("key", lobbyKey, "lobbies")

            return dbRes.items!!.map { item -> item["cards"]}
                .filterNotNull()
                .flatMap { cards -> cards.asL().map { card -> card.asS() } }
                .toSet()
        }
    }
}