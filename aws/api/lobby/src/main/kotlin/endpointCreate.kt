package app.nulltime.api.lobby

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.GetItemRequest
import aws.sdk.kotlin.services.dynamodb.model.PutItemRequest
import kotlinx.serialization.json.JsonPrimitive
import kotlin.random.Random
import kotlinx.coroutines.runBlocking

class EndpointCreate {
    fun handler(req: Request): Response {
        return when(req.method) {
            "POST" -> post()
            else -> Response(501, mapOf("message" to JsonPrimitive("Method ${req.method} not supported by ${req.path}")))
        }
    }

    private fun post(): Response = runBlocking {
        val body = HashMap<String, JsonPrimitive>()

        var key = genKey(6)
        while(pingTableEntry("key", key, "lobbies")) key = genKey(6)

        putKey(key, "lobbies")
        body["lobbyKey"] = JsonPrimitive(key)

        return@runBlocking Response(200, body)
    }

    private suspend fun putKey(keyVal: String, tableNameVal: String) {
        val itemValues = mapOf("key" to AttributeValue.S(keyVal))

        val dbReq = PutItemRequest {
            item = itemValues
            tableName = tableNameVal
        }

        DynamoDbClient { region = "us-east-1" }.use { ddb ->
            ddb.putItem(dbReq)
        }
    }


    private fun genKey(keySize: Int): String {
        return (1..keySize).map{ Random.nextInt(0, 9) }.joinToString("")
    }
}