import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

import { execSync } from 'child_process';

export class CdkBundlingLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const jsLambdaFunction = new lambda.Function(this, 'js-lambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'jsLambda.handler',
      code: lambda.Code.fromAsset('./lambda/js', {
        bundling: {
          image: lambda.Runtime.NODEJS_12_X.bundlingImage,
          command: [],
          local: {
            tryBundle(outputDir: string) {
              try {
                execSync('npm --version');
              } catch {
                return false;
              }
              
              const commands = [
                'cd lambda/js',
                'npm i',
                `cp -a . ${outputDir}`
              ];
              
              execSync(commands.join(' && '));
              return true;
            }
          }
        }
      }),
      memorySize: 1024,
      functionName: 'js-lambda',
      timeout: cdk.Duration.seconds(1)
    });

    const pythonLambdaFunction = new lambda.Function(this, 'python-lambda', {
      runtime: lambda.Runtime.PYTHON_3_7,
      handler: 'pyLambda.handler',
      code: lambda.Code.fromAsset('./lambda/python', {
        bundling: {
          image: lambda.Runtime.PYTHON_3_7.bundlingImage,
          command: [],
          local: {
            tryBundle(outputDir: string) {
              try {
                execSync('pip3 --version');
              } catch {
                return false;
              }

              const commands = [
                `cd lambda/python`,
                `pip3 install -r requirements.txt -t ${outputDir}`,
                `cp -au . ${outputDir}`
              ];

              execSync(commands.join(' && '));
              return true;
            }
          }
        }
      }),
      memorySize: 1024,
      functionName: 'python-lambda',
      timeout: cdk.Duration.seconds(1)
    });

    const dotnetCoreLambdaFunction = new lambda.Function(this, 'dotnetcore-lambda',{
      runtime: lambda.Runtime.DOTNET_CORE_3_1,
      handler: 'NetCore31Lambda::NetCore31Lambda.NetLambda::FunctionHandler',
      code: lambda.Code.fromAsset('./lambda/netCore/', {
        bundling: {
          image: lambda.Runtime.DOTNET_CORE_3_1.bundlingImage,
          command: [],
          local: {
            tryBundle(outputDir: string) {
              try {
                execSync('dotnet --version');
              } catch {
                return false;
              }

              const commands = [
                `export DOTNET_CLI_HOME="/tmp/DOTNET_CLI_HOME"`,
                `export PATH="$PATH:/tmp/DOTNET_CLI_HOME/.dotnet/tools"`,
                `cd lambda/netCore`,
                `dotnet lambda package -o output.zip`,
                `unzip -o -d ${outputDir} output.zip`
              ];
              
              execSync(commands.join(' && '));
              return true;
            }
          }
        }
      }),
      memorySize: 1024,
      functionName: 'dotnetCore-lambda',
      timeout: cdk.Duration.seconds(1)
    });
    
    const javaLambdaFunction = new lambda.Function(this, 'java-lambda', {
      runtime: lambda.Runtime.JAVA_8,
      handler: 'com.example.App',
      code: lambda.Code.fromAsset('./lambda/java', {
        bundling: {
          image: lambda.Runtime.JAVA_8.bundlingImage,
          command: [],
          local: {
            tryBundle(outputDir: string) {
              try {
                execSync('mvn --version');
              } catch {
                return false;
              }

              const commands = [
                `cd lambda/java`,
                `mvn clean install`,
                `cp target/javalambda-jar-with-dependencies.jar ${outputDir}`
              ];
              
              execSync(commands.join(' && '));
              return true;
            }
          }
        }
      }),
      memorySize: 1024,
      functionName: 'java-lambda',
      timeout: cdk.Duration.seconds(1)
    });
    
    const javaLambdaLayer = new lambda.LayerVersion(this, 'java-lambda-layer', {
      compatibleRuntimes: [lambda.Runtime.JAVA_8],
      code: lambda.Code.fromAsset('./lambda/java-layer', {
        bundling: {
          image: lambda.Runtime.JAVA_8.bundlingImage,
          local: {
            tryBundle(outputDir: string) {
              try {
                execSync('mvn --version');
              } catch {
                return false;
              }

              const commands = [
                `cd lambda/java-layer`,
                `mvn clean install`,
                `mkdir -p ${outputDir}/java/lib`,
                `cp target/java-lambda-layer-jar-with-dependencies.jar ${outputDir}/java/lib`
              ];
              
              execSync(commands.join(' && '));
              return true;
            }
          }
        }
      })
    });
  
    const javaWithLayerLambdaFunction = new lambda.Function(this, 'java-lambda-with-layer', {
      runtime: lambda.Runtime.JAVA_8,
      handler: 'com.example.App',
      layers: [javaLambdaLayer],
      code: lambda.Code.fromAsset('./lambda/java-with-layer', {
        bundling: {
          image: lambda.Runtime.JAVA_8.bundlingImage,
          command: [],
          local: {
            tryBundle(outputDir: string) {
              try {
                execSync('mvn --version');
              } catch {
                return false;
              }

              const commands = [
                `cd lambda/java-with-layer`,
                `mvn clean install`,
                `cp target/java-lambda-with-layer.jar ${outputDir}`
              ];
              
              execSync(commands.join(' && '));
              return true;
            }
          }
        }
      }),
      memorySize: 1024,
      functionName: 'java-lambda-with-layer',
      timeout: cdk.Duration.seconds(1)
    });
  }
}
