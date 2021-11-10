package com.example;

import java.util.Map;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.apache.commons.lang3.StringUtils;

public class App implements RequestHandler<Map<String,String>, String> {

  @Override
  public String handleRequest(Map<String,String> event, Context context)
  {
    return String.format("Hello, %s %s!", StringUtils.upperCase(event.get("firstName")), StringUtils.upperCase(event.get("lastName")));
  }
}
