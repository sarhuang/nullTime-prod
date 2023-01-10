import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi, HttpMethod, PayloadFormatVersion} from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as dynamo from 'aws-cdk-lib/aws-dynamodb'
import { Duration } from 'aws-cdk-lib';
import { Policy, PolicyDocument, PolicyStatement } from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Database
    const lobbyDBCards = new dynamo.Table(this, "lobbyDB-card-entries", {
      tableName: "card-entries",
      partitionKey: { name: 'id', type: dynamo.AttributeType.STRING },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST
    })
    const lobbyDBLobbies = new dynamo.Table(this, "lobbyDB-lobbies", {
      tableName: "lobbies",
      partitionKey: { name: 'key', type: dynamo.AttributeType.STRING },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST
    })

    // Lambda
    const lobbyHandler = new lambda.Function(this, "lobby-lambda", {
      functionName: "lobby-lambda",
      runtime: lambda.Runtime.JAVA_11,
      code: lambda.Code.fromAsset("../api/lobby/build/libs/lobby-1.0-SNAPSHOT-all.jar"),
      handler: "app.nulltime.api.lobby.Server::handleRequest",
      timeout: Duration.seconds(10),
      memorySize: 1024
    })
    lobbyDBCards.grantReadWriteData(lobbyHandler)
    lobbyDBLobbies.grantReadWriteData(lobbyHandler)

    // API
    const lobbyIntegration = new HttpLambdaIntegration("lobby-lambdaIntegration", lobbyHandler, {
      payloadFormatVersion: PayloadFormatVersion.VERSION_1_0
    })
    const api = new HttpApi(this, "NullTime-API")
    api.addRoutes({
      path: "/lobby/{proxy+}",
      methods: [ HttpMethod.ANY ],
      integration: lobbyIntegration
    })
  }
}
