package com.gaga.bo.service.chatbot;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
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

	@Value("${openai.apiUrl}")
	private String openAIApiUrl;

	@PostMapping("gpt")
	public String generateResponse(@org.springframework.web.bind.annotation.RequestBody String prompt, HttpSession session)
	        throws ParseException {
	    String openAIApiKeyBearer = "Bearer " + "sk-gLHa5Dh7TG05fqc7QNOd";
	    String openAIApiK = "T3BlbkFJ04HSniveZQOu3rFgnDHv";
	    String openAIApiKey = openAIApiKeyBearer + openAIApiK;
	    RestTemplate restTemplate = new RestTemplate();
	    HttpHeaders headers = new HttpHeaders();

	    headers.set("Authorization", openAIApiKey);
	    headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

	    JSONObject body = new JSONObject();

	    body.put("model", "gpt-3.5-turbo");

	    Boolean isFirstMessage = (Boolean) session.getAttribute("isFirstMessage");
	    if (isFirstMessage == null) {
	        isFirstMessage = true;
	    }

	    System.out.println("isFirstMessage: " + isFirstMessage);

	    JSONArray messages = new JSONArray();
	    JSONObject messageContent = new JSONObject();

	    if (isFirstMessage) {
	        String domainInformation = "reply in korean and You are a GaGaBot of socialling service like meeting, club for people connecting:";
	        String fullPrompt = domainInformation + " " + prompt;
	        System.out.println("첫메시지");
	        messageContent.put("role", "user");
	        messageContent.put("content", fullPrompt);
	        isFirstMessage = false;
	    } else if (prompt.contains("가가") || prompt.contains("GAGA")) {
	        String fullPrompt = "GaGa(가치가자)는 클럽과 모임으로 이뤄진 소셜링 서비스입니다." + " " + prompt;
	        System.out.println("가가에 관한 질문1");
	        messageContent.put("role", "user");
	        messageContent.put("content", fullPrompt);
	    } else {
	    	System.out.println("그냥질문!");
	        messageContent.put("role", "user");
	        messageContent.put("content", prompt);
	    }

	    messages.add(messageContent);

	    body.put("messages", messages);

	    session.setAttribute("isFirstMessage", false);

	    HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
	    ResponseEntity<String> response = restTemplate.postForEntity(openAIApiUrl, entity, String.class);
	    System.out.println("보통" + response);

	    JSONParser parser = new JSONParser();
	    JSONObject responseBody = (JSONObject) parser.parse(response.getBody());
	    JSONArray choices = (JSONArray) responseBody.get("choices");
	    JSONObject choice = (JSONObject) choices.get(0);
	    JSONObject message = (JSONObject) choice.get("message");
	    String gptResponse = (String) message.get("content");

	    return gptResponse;
	    }
}