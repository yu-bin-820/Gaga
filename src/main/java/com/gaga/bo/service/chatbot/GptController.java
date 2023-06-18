package com.gaga.bo.service.chatbot;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.gaga.bo.service.domain.Meeting;

@RestController
@RequestMapping("/rest/*")
public class GptController {

	@Value("${openai.apiUrl}")
	private String openAIApiUrl;
	
	@Autowired
	private GagaService gagaService;
	
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
	        String domainInformation = "reply in korean and You are a GaGaBot of socialnetworking service GAGA, For connecting people with club and meeting:";
	        String fullPrompt = domainInformation + " " + prompt;
	        System.out.println("첫메시지");
	        messageContent.put("role", "user");
	        messageContent.put("content", fullPrompt);
	        isFirstMessage = false;
	    } else if (prompt.contains("가가") || prompt.contains("GAGA")) {
	        String fullPrompt = "GaGa(가치가자)는 비트원에서 개발한 클럽과 모임으로 이뤄진 소셜링 서비스입니다. 언제나 어디에나 같이 가자는 뜻을 담으셨다고 해요!" + " " + prompt;
	        System.out.println("가가에 관한 질문1");
	        messageContent.put("role", "user");
	        messageContent.put("content", fullPrompt);
	    } else if (prompt.contains("모임") || prompt.contains("클럽") || prompt.contains("미팅")) {
	        String fullPrompt = "클럽과 모임이 궁금하시군요, 클럽과 모임은 저희 GAGA서비스에서 필터와 지도, 검색으로 쉽게 찾으실 수 있어요, 자신의 관심사, 나이, 성별등을"
	        		+ "직접 입력해서 맞춤으로 검색하실수 있게끔 필터를 설정하실 수 있고, 첫 화면의 지도기능을 사용해서 인근의 모임정보를 쉽게 얻으실 수 있습니다."
	        		+ "혹시 아직 마음에 드는 클럽이나 모임을 찾지 못하셨다면, 이번에 한번 직접 클럽장이나 모임장이 되어보는건 어떨까요? 모임이나 클럽을 만들어서 운영하는 것으로"
	        		+ "얻을 수 있는 타이틀도 있으니 이번 기회에 새롭게 원하시는 모임이나 클럽을 직접 만들어 보시는것도 나쁘지 않겠네요! 좋은 하루 보내시고 원하시는 즐거운 만남이 있기를 소망합니다! 가치가자!! GAGA!" + " " + prompt;
	        System.out.println("모임, 클럽에 관한 질문1");
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
	
	/*
	private String handleUserRequest(String prompt) {
	    // "미팅" 또는 "모임"이라는 키워드가 포함된 경우
	    if (prompt.contains("미팅") || prompt.contains("모임")) {
	        // 해당 키워드로 미팅을 찾습니다.
	        List<Meeting> meetings = gagaService.findMeeting(prompt, null, null);
	        // 결과를 문자열 형태로 변환합니다.
	        return meetings.toString();
	    }
	    // 기타 요청 처리...
	}*/

}