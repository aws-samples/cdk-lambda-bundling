using Amazon.Lambda.Core;
using System;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: Amazon.Lambda.Core.LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace NetCore31Lambda
{
    public class NetLambda
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public string FunctionHandler(NewUser input, ILambdaContext context)
        {
            return $"Hello, {input.firstName.ToUpper()} {input.lastName.ToUpper()}!";
        }
    }
}
