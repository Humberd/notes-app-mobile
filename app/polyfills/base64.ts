declare const android: any;
declare const java: any;
declare const NSData: any;
declare const NSUTF8StringEncoding: any;
declare const NSString: any;

/*
 * Convert A String to Base64 String
 */

export function transformStringToBase64(platformType, textString) {

  if (platformType == "Android") {
    const text = new java.lang.String(textString);
    const data = text.getBytes("UTF-8");
    const base64String = android.util.Base64.encodeToString(data,android.util.Base64.DEFAULT);
    return base64String;
  }
  else if (platformType == "iOS") {
    const text = NSString.stringWithString(textString);
    const data = text.dataUsingEncoding(NSUTF8StringEncoding);
    const base64String = data.base64EncodedStringWithOptions(0);
    return base64String;
  }
}

/*
 * Convert A Base64 String to String
 */

export function transformBase64ToString(platformType, base64String) {

  if (platformType == "Android") {
    var data = android.util.Base64.decode(base64String,android.util.Base64.DEFAULT);
    var decodedString = new java.lang.String(data,java.nio.charset.StandardCharsets.UTF_8);
    return decodedString;
  }
  else if (platformType == "iOS") {
    const decodedData = NSData.alloc().initWithBase64EncodedStringOptions(base64String,0);
    const decodedString = NSString.alloc().initWithDataEncoding(decodedData,NSUTF8StringEncoding);
    return decodedString;
  }
}
