# Implementing, bundling and deploying multi-language serverless applications using AWS CDK

This pattern provides an example CDK application stack using TypeScript for the infrastructure and 4 different programming languages to implement an AWS Lambda function (all of them within a single stack). Each of the functions will use at least 1 external dependency to showcase how the function code is bundled together with its dependencies. The languages used in the pattern's Lambda functions are:

- JavaScript
- Java 1.8 (with and without using Lambda Layers)
- .NET Core 3.1
- Python 3.7


## Useful commands

 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
