#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkBundlingLambdaStack } from '../lib/cdk-bundling-lambda-stack';

const app = new cdk.App();
new CdkBundlingLambdaStack(app, 'CdkBundlingLambdaStack');
