#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';
import * as dotenv from 'dotenv'

dotenv.config()

const stackEnvProd = { account: process.env.AWS_ACCOUNT, region: process.env.AWS_PROD_REGION }

const app = new cdk.App();
new CdkStack(app, 'NullTime-CDKStack', { env: stackEnvProd });