package app.nulltime.api.lobby

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

data class Request(val path: String, val method: String, val body: String)
data class Response(val statusCode: Int, val body: Map<String, JsonElement>)

fun parseResponse(res: Response): APIGatewayProxyResponseEvent {
    val event = APIGatewayProxyResponseEvent()

    event.isBase64Encoded = false
    event.headers = HashMap<String, String>()
    event.headers["Content-Type"] = "application/json"

    event.statusCode = res.statusCode
    print(res.body)
    event.body = JsonObject(res.body).toString()

    return event
}

class Server: RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    // Application Scoped Objects
    private val endpointPing = EndpointPing()
    private val endpointCreate = EndpointCreate()
    private val endpointClose = EndpointClose()
    private val endpointCardSubmit = EndpointCardSubmit()
    private val endpointCardDelete = EndpointCardDelete()

    // The entry point for the lobby API
    override fun handleRequest(event: APIGatewayProxyRequestEvent?, context: Context?): APIGatewayProxyResponseEvent {
        if (event == null) return parseResponse(Response(421, mapOf("message" to JsonPrimitive("API request event is null"))))

        val req = Request(event.path, event.httpMethod, event.body ?: "")
        print(req)

        return parseResponse(getResponse(req))
    }

    private fun getResponse(req: Request): Response {
        return when(req.path) {
            "/lobby/ping" -> endpointPing.handler(req)
            "/lobby/create" -> endpointCreate.handler(req)
            "/lobby/close" -> endpointClose.handler(req)
            "/lobby/card/submit" -> endpointCardSubmit.handler(req)
            "/lobby/card/delete" -> endpointCardDelete.handler(req)
            else -> Response(421, mapOf("message" to JsonPrimitive("Path ${req.path} not supported")))
        }
    }
}