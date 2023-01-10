package app.nulltime.api.lobby

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.PutItemRequest
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.MissingFieldException
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.JsonPrimitive
import java.security.MessageDigest
import java.util.*
import kotlin.collections.HashMap
import kotlin.random.Random

@Serializable
class CardSubmitRequestBody(val lobbyKey: String, val cards: List<String>)

class EndpointCardSubmit {
    fun handler(req: Request): Response {
        return when(req.method) {
            "POST" -> post(req)
            else -> Response(501, mapOf("message" to JsonPrimitive("${req.method} not supported by ${req.path}")))
        }
    }

    private fun post(req: Request): Response = runBlocking {
        val body = HashMap<String, JsonPrimitive>()

        val reqBody = try {
            Json.decodeFromString<CardSubmitRequestBody>(req.body)
        } catch(e: MissingFieldException) {
            body["message"] = JsonPrimitive(e.message)
            return@runBlocking Response(400, body)
        }

        if(reqBody.cards.isEmpty()) {
            body["message"] = JsonPrimitive("Cards field empty")
            return@runBlocking Response(400, body)
        }

        if(!pingTableEntry("key", reqBody.lobbyKey, "lobbies")) {
            body["message"] = JsonPrimitive("Lobby ${reqBody.lobbyKey} does not exist")
            return@runBlocking Response(400, body)
        }

        body["id"] = JsonPrimitive(putCards(reqBody))
        return@runBlocking Response(200, body)
    }

    private fun hash(data: String): String {
        val salted = data + Random.nextDouble()
        return Base64.getUrlEncoder().encodeToString(
            MessageDigest.getInstance("SHA-256").digest(salted.toByteArray())
        )
    }
    private suspend fun putCards(input: CardSubmitRequestBody): String {
        val id = hash(input.cards.toString())

        val itemValues = mapOf(
            "id" to AttributeValue.S(id),
            "lobbyKey" to AttributeValue.S(input.lobbyKey),
            "cards" to AttributeValue.L(
                input.cards.map{ card -> AttributeValue.S(card) }
            )
        )

        val dbReq = PutItemRequest {
            item = itemValues
            tableName = "card-entries"
        }

        DynamoDbClient { region = "us-east-1" }.use { ddb ->
            ddb.putItem(dbReq)
            println("Item $id added ${input.cards} to ${input.lobbyKey}")
        }

        return id
    }
}