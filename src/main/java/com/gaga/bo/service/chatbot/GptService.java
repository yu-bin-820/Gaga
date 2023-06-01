package com.gaga.bo.service.chatbot;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class GptService {
	
	private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String OPENAI_API_KEY = "Bearer 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";

    public String generateResponse(String prompt) {
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
        return response.getBody();
    }
}