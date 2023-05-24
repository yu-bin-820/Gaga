package com.gaga.bo.service.user.impl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.NaverSens;
import com.gaga.bo.service.user.UserDao;
import com.gaga.bo.service.user.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	@Qualifier("userDao")
	UserDao userDao;
	
	public UserServiceImpl() {
		System.out.println(this.getClass());
	}
	
	public void addUser(User user) throws Exception{
		userDao.addUser(user);
	}
	
	@Override
	public User getUser(int userNo) throws Exception {
		
		return userDao.getUser(userNo);
	}
	

	public User getUserById(String userId) throws Exception {
	    return userDao.getUserById(userId);

	}
	
	@Override
	public User getUserByPhoneNo(String phoneNo) throws Exception {
		return userDao.getUserByPhoneNo(phoneNo);
	}

	@Override
	public void updateUser(User user) throws Exception {
		userDao.updateUser(user);
	}


	@Override
	public void deleteUser(int userNo) throws Exception {
		userDao.deleteUser(userNo);
		
	}

	public boolean checkDuplication(String userId) throws Exception {
	    User user = userDao.getUserById(userId);
	    return user != null;
	}

	public String getAccessNaverToken(String authorize_code) throws Exception {

		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://nid.naver.com/oauth2.0/token";
		try {
			URL url = new URL(reqURL);
			System.out.println("");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=FzMGbETEgw2xNeSUlIIF"); 
			sb.append("&redirect_uri=http://192.168.0.159:8080/rest/user/naverLogin"); 
			sb.append("&code=" + authorize_code);
			sb.append("&client_secret=voluTpxuLM");
//			sb.append("&state=test"); 
			bw.write(sb.toString());
			bw.flush();

			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			String line = "";
			String result = "";
			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("NaverService.java response body1 : " + result);
			
			ObjectMapper objectMapper = new ObjectMapper();

			Map<String, Object> jsonMap = objectMapper.readValue(result, Map.class);
				
			access_Token = jsonMap.get("access_token").toString();
			refresh_Token = jsonMap.get("refresh_token").toString();

			System.out.println("NaverService access_token : " + access_Token);
			System.out.println("NaverService refresh_token : " + refresh_Token);
            
			br.close();
			bw.close();			
			
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Error in getAccessToken: " + e.getMessage());
		}
		return access_Token;
	}

	@Override
	public Map<String, Object> getNaverUserInfo(String access_Token) throws Exception {
		
		Map<String, Object> userInfo = new HashMap<>();
		String postURL = "https://openapi.naver.com/v1/nid/me";
		
		try {
			URL url = new URL(postURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			
			conn.setRequestProperty("Authorization", "Bearer " + access_Token);
			
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);
			
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
	        String result ="";

	        while ((line = br.readLine()) != null) {
				result += line;
			}
	        System.out.println("response body : " + result);

	        ObjectMapper objectMapper = new ObjectMapper();
	        Map<String, Object> elvis_presley = objectMapper.readValue(result, Map.class);
	        
	        System.out.println("5678"+elvis_presley+"5678");
	        
	        Map<String, Object> properties = (Map<String, Object>) elvis_presley.get("response");
	        
	        String id = properties.get("email").toString();
	        String email = properties.get("id").toString();
	        String name = properties.get("name").toString();
	        String nickname = properties.get("nickname").toString();
	        String mobile = properties.get("mobile").toString().replaceAll("-", "");
	        String genderStr = properties.get("gender").toString().equals("M") ? "1" : "2";
	        int gender = Integer.parseInt(genderStr);
	        String birthday = properties.get("birthyear").toString() + "-" + properties.get("birthday").toString().replace("-", "-");
	        
	        userInfo.put("id", id);
	        userInfo.put("email", email);
	        userInfo.put("name", name);
	        userInfo.put("nickname", nickname);
	        userInfo.put("mobile", mobile);
	        userInfo.put("gender", gender);
	        userInfo.put("birthday", birthday);
	        
	        System.out.println(userInfo);
	        
	    if(!this.checkDuplication(id)) {
	    
	    	User user = new User();
            user.setUserId(id);
            user.setPassword(id);
            user.setUserName(name);
            user.setNickName(nickname);
            user.setBirthday(LocalDate.parse(birthday, DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            user.setPhoneNo(mobile);
            user.setGender(gender);

	    	userDao.addUser(user);
	    }
	        
		}catch (IOException exception) {
			exception.printStackTrace();
		}
		return userInfo;
	}
	
	public String getAccessKakaoToken(String authorize_code) throws Exception {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";

		try {
			URL url = new URL(reqURL);
            
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
            
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
            
			sb.append("&client_id=3d89a9ef169b204afc54cc08fa20632d"); 
			sb.append("&redirect_uri=http://192.168.0.159:8080/rest/user/kakaoLogin");

			sb.append("&code=" + authorize_code);
			bw.write(sb.toString());
			bw.flush();

			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			String line = "";
			String result = "";
            
			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body1 : " + result);
			
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, Object> jsonMap = objectMapper.readValue(result, new TypeReference<Map<String, Object>>() {
			});
				
			access_Token = jsonMap.get("access_token").toString();
			refresh_Token = jsonMap.get("refresh_token").toString();

			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);
            
			br.close();
			bw.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return access_Token;
	}
	
	@Override
	public Map<String, Object> getKakaoUserInfo(String access_Token) throws Exception {
		Map<String, Object> userInfo = new HashMap<String, Object>();
		String reqURL = "https://kapi.kakao.com/v2/user/me";
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
	
			conn.setRequestProperty("Authorization", "Bearer " + access_Token);
			
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);
			
			ObjectMapper mapper = new ObjectMapper();

			JSONObject element = (JSONObject) JSONValue.parse(result);
			
			String userId = mapper.readValue(element.get("id").toString(), String.class);
			System.out.println("카카오 id : "+userId);
			JSONObject properties = mapper.convertValue(element.get("properties"), JSONObject.class);
			System.out.println("properties : "+properties);
			JSONObject kakao_account = mapper.convertValue(element.get("kakao_account"), JSONObject.class);
			System.out.println("카카오 어카운트에 대한 정보 찍어보기"+kakao_account);
			String nickname = mapper.convertValue(properties.get("nickname"), String.class);
			String email = mapper.convertValue(kakao_account.get("email"), String.class);
			//String nickname = (String) element.get("nickname");
			//String email = (String) element.get("email");

			userInfo.put("nickname", nickname);
			userInfo.put("email", email);
			userInfo.put("id", userId);
			
			System.out.println("카카오 아이디 잘오냐?"+userInfo.get("id"));
			System.out.println("카카오 닉네임 잘오냐?"+userInfo.get("nickname"));
			System.out.println("카카오 이메일 잘오냐?"+userInfo.get("email"));
			
			if(!this.checkDuplication(userId)) {
				User user = new User();
				user.setUserId(email);
				user.setPassword(email);
				user.setUserName(nickname);
				user.setNickName(nickname);
				user.setPhoneNo("01051884079");
				user.setBirthday(LocalDate.of(1980, 1, 8));
				
				userDao.addUser(user);
			}
				
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userInfo;
	}

	@Override			//네이버 핸드폰 인증을 위한 랜덤 난수 생성+문자 보내기 메소드
	public String sendRandomSmsMessage(String tel) {
		NaverSens message = new NaverSens();
	    Random rand = new Random();
	    String numStr = "";
	    for (int i = 0; i < 6; i++) {
	        String ran = Integer.toString(rand.nextInt(10));
	        numStr += ran;
	    }
	    System.out.println("회원가입 문자 인증 => " + numStr);

	    message.send_msg(tel, numStr);

	    return numStr;
	}


}
