package com.gaga.bo.service.user.impl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.UserDao;
import com.gaga.bo.service.user.UserService;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	@Qualifier("userDao")
	UserDao userDao;
//	@Autowired
//	@Qualifier("userService")
//	UserService userService;
	
	public UserServiceImpl() {
		System.out.println(this.getClass());
	}
	
	public void addUser(User user) throws Exception{
		userDao.addUser(user);
	}
	//프로필이미지 구현부 미완료
//	public void addProfileImg(String userId, MultipartFile file) throws IOException {
//	    String savedFileName = "";
//	    String originalFileName = file.getOriginalFilename();
//	    UUID uuid = UUID.randomUUID();
//	    savedFileName = uuid.toString() + "_" + originalFileName;
//	    // 파일명만 데이터베이스에 저장하므로 파일 업로드 로직은 필요하지 않습니다.
//	    // 이곳에 프로필 이미지 파일명을 데이터베이스에 저장하는 로직을 구현하세요.
//	    // ...
//	}
	
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
//		boolean result=true;
//		User user=userDao.getUserById(userId);
//		if(user != null) {
//			result=false;
//		}
//		return result;
	    User user = userDao.getUserById(userId);
	    return user != null;
	}

	@Override
	public void addKakaoUser(User user) throws Exception {
		userDao.addUser(user);
		
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
			sb.append("&redirect_uri=http://192.168.0.159:8080/user/kakaoLogin"); 
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
			// JSON String -> Map
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
	public HashMap<String, Object> getKakaoUserInfo(String access_Token) throws Exception {
		
		HashMap<String, Object> kakaoUserInfo = new HashMap<String, Object>();
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
			System.out.println("id : "+userId);

			JSONObject properties = mapper.convertValue(element.get("properties"), JSONObject.class);
			System.out.println("properties:  "+properties);
			JSONObject kakao_account = mapper.convertValue(element.get("kakao_account"), JSONObject.class);

			String nickname = mapper.convertValue(properties.get("nickname"), String.class);
			String email = mapper.convertValue(kakao_account.get("email"), String.class);

			kakaoUserInfo.put("nickname", nickname);
			kakaoUserInfo.put("email", email);
			kakaoUserInfo.put("id", userId);
			System.out.println("#####"+kakaoUserInfo.get("nickname"));
			System.out.println("#####"+kakaoUserInfo.get("email"));
			
//			UserService ks = this.userService;
			
			
			
			if(userDao.chechDuplication(userId)==false) {
				User user = new User();
				user.setUserId(userId);
				user.setPassword(userId);
				user.setUserName(nickname);
				userDao.addUser(user);
			}
				
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return kakaoUserInfo;
	}



}
