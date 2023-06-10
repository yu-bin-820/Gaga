package com.gaga.bo.service.chatbot;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/rest/*")
public class GptController {
	
	@Autowired
    private Environment env;
	
	@Value("${openai.apiUrl}")
    private String openAIApiUrl;
	

    @PostMapping("gpt")
    public String generateResponse(@org.springframework.web.bind.annotation.RequestBody String prompt) throws ParseException {
        System.out.println("이러기싫어서 나눈 gpt로 왔다.");
        System.out.println(prompt + "프롬프트프롬프트");
        
        String openAIApiKey = "Bearer " + env.getProperty("GPT_KEY");
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("어디에서");
        HttpHeaders headers = new HttpHeaders();
        System.out.println("에러가"+headers);
        headers.set("Authorization", openAIApiKey);
        System.out.println("뜨는거지?"+headers);
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        System.out.println("좀 알려줘라?"+headers);
        JSONObject body = new JSONObject();
        body.put("model", "gpt-3.5-turbo");
        System.out.println("좀 알려줘라? 좀?"+headers+body);
        JSONArray messages = new JSONArray();
        JSONObject messageContent = new JSONObject();
        messageContent.put("role", "user");
        messageContent.put("content", prompt);
        messages.add(messageContent);

        body.put("messages", messages);

        HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(openAIApiUrl, entity, String.class);

        // OpenAI의 응답을 파싱하여 GPT-3의 응답을 추출합니다.
        System.out.println("응답은영어로response"+response);
        JSONParser parser = new JSONParser();
        JSONObject responseBody = (JSONObject) parser.parse(response.getBody());
        JSONArray choices = (JSONArray) responseBody.get("choices");
        JSONObject choice = (JSONObject) choices.get(0);
        JSONObject message = (JSONObject) choice.get("message");
        String gptResponse = (String) message.get("content");
        
        System.out.println("gpt Response"+gptResponse);
        return gptResponse;
    }
}