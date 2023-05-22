package com.gaga.bo.service.user;

import java.io.IOException;
import java.util.HashMap;

import org.springframework.web.multipart.MultipartFile;

import com.gaga.bo.service.domain.User;

public interface UserService {
	
	public void addUser(User user) throws Exception;
	
//	public void addProfileImg(String userId, MultipartFile file) throws IOException;
	
	public User getUser(int userNo) throws Exception;
	
	public User getUserById(String userId) throws Exception;
	
	public User getUserByPhoneNo(String phoneNo) throws Exception;
	
	public void updateUser(User user) throws Exception;
	
	public boolean checkDuplication(String userId) throws Exception;
	
	public void deleteUser(int userNo) throws Exception;
	
	public void addKakaoUser(User user) throws Exception;
	
	public String getAccessKakaoToken(String authorize_code) throws Exception;
	
	public HashMap<String, Object> getKakaoUserInfo(String access_Token) throws Exception;
}
