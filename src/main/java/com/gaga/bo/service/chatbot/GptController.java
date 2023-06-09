package com.gaga.bo.service.chatbot;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@RestController
public class GptController {
    private String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private String OPENAI_API_KEY = "Bearer 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";

    @PostMapping("/rest/gpt")
    public String generateResponse(@RequestBody String prompt) throws ParseException {
        System.out.println("이러기싫어서 나눈 gpt로 왔다.");
        System.out.println(prompt + "프롬프트프롬프트");

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", OPENAI_API_KEY);
        headers.setContentType(MediaType.APPLICATION_JSON);

        JSONObject body = new JSONObject();
        body.put("model", "gpt-3.5-turbo");

        JSONArray messages = new JSONArray();
        JSONObject messageContent = new JSONObject();
        messageContent.put("role", "user");
        messageContent.put("content", prompt);
        messages.add(messageContent);

        body.put("messages", messages);

        HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_API_URL, entity, String.class);

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