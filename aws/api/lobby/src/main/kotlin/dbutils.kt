package app.nulltime.api.lobby

import aws.sdk.kotlin.services.dynamodb.DynamoDbClient
import aws.sdk.kotlin.services.dynamodb.model.AttributeValue
import aws.sdk.kotlin.services.dynamodb.model.DeleteItemRequest
import aws.sdk.kotlin.services.dynamodb.model.GetItemRequest


suspend fun pingTableEntry(keyName: String, keyVal: String, tableNameVal: String): Boolean {
  val keyToGet = mapOf(keyName to AttributeValue.S(keyVal))

  val dbReq = GetItemRequest{
    key = keyToGet
    tableName = tableNameVal
  }

  DynamoDbClient{ region = "us-east-1" }.use { ddb ->
    val dbRes = ddb.getItem(dbReq)
    return dbRes.item != null
  }
}

suspend fun deleteItem(keyName: String, keyVal: String, tableNameVal: String): Boolean {
  val keyToGet = mapOf(keyName to AttributeValue.S(keyVal))

  val dbReq = DeleteItemRequest {
    key = keyToGet
    tableName = tableNameVal
  }

  DynamoDbClient { region = "us-east-1" }.use { ddb ->
    ddb.deleteItem(dbReq)
    return true
  }
}
