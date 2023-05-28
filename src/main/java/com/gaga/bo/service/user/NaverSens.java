package com.gaga.bo.service.user;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class NaverSens {
	@SuppressWarnings("unchecked")
	public void send_msg(String tel, String rand) {

        String hostNameUrl = "https://sens.apigw.ntruss.com";		// 호스트 URL
        String requestUrl= "/sms/v2/services/";						// 요청 URL
        String requestUrlType = "/messages";						// 요청 URL Type
        String accessKey = "kFtXQEHmQd0SZGfEQQTo";					// 개인 인증키
        String secretKey = "tINEZ7aWVewWvLlev1CocasjpoGDwLMkZm6uxxCp";	// 2차 인증을 위해 서비스마다 할당되는 service secret
        String serviceId = "ncp:sms:kr:296666933592:gagasms";			// 프로젝트에 할당된 SMS 서비스 ID
        String method = "POST";
        String timestamp = Long.toString(System.currentTimeMillis());	// current timestamp (epoch)
        requestUrl += serviceId + requestUrlType;
        String apiUrl = hostNameUrl + requestUrl;
        // JSON 을 활용한 body data 생성
        JSONObject bodyJson = new JSONObject();
        JSONObject toJson = new JSONObject();
        JSONArray  toArr = new JSONArray();

        // 난수와 함께 전송
        toJson.put("content","Gaga 서비스 핸드폰 인증 [ "+rand+" ]를 입력해주세요");
        toJson.put("to", tel.replaceAll("[^\\d]", ""));
        toArr.add(toJson);
        // 메시지 Type (sms | lms)
        bodyJson.put("type","SMS");
        bodyJson.put("contentType","COMM");
        bodyJson.put("countryCode","82");

        // 발신번호 * 사전에 인증/등록된 번호만 사용할 수 있습니다.
        bodyJson.put("from","01051884079");
        bodyJson.put("content","Gaga sms test ["+rand+"]");
        bodyJson.put("messages", toArr);		
	    
        String body = bodyJson.toJSONString();
	    
        System.out.println(body);
        
        System.out.println("tel: " + tel);
        System.out.println("rand: " + rand);
	    
        try {
            URL url = new URL(apiUrl);

            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", accessKey);
            con.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature(requestUrl, timestamp, method, accessKey, secretKey));
            con.setRequestMethod(method);
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            
            wr.write(body.getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            System.out.println("responseCode" +" " + responseCode);
            if(responseCode==202) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();           
            System.out.println(response.toString());

        } catch (Exception e) {
            System.out.println(e);
        }
    }
	
    public static String makeSignature(String url, String timestamp, String method, String accessKey, String secretKey) 
    																throws NoSuchAlgorithmException, InvalidKeyException {
        
	    String space = " "; 
	    String newLine = "\n"; 
	    
	    String message = new StringBuilder()
	        .append(method)
	        .append(space)
	        .append(url)
	        .append(newLine)
	        .append(timestamp)
	        .append(newLine)
	        .append(accessKey)
	        .toString();
	    System.out.println("makeSignature : "+message);
	    SecretKeySpec signingKey;
	    String encodeBase64String;
		try {
			signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
			Mac mac = Mac.getInstance("HmacSHA256");
			mac.init(signingKey);
			byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
			encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);
		} catch (UnsupportedEncodingException e) {
			encodeBase64String = e.toString();
		}
	    

	  return encodeBase64String;
	}
}
