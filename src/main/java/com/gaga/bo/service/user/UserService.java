package com.gaga.bo.service.user;

import java.util.HashMap;

import com.gaga.bo.service.domain.User;

public interface UserService {
	
	public void addUser(User user) throws Exception;
	
	public User getUser(int userNo) throws Exception;
	
	public User getUserById(String userId) throws Exception;
	
	public User getUserPhoneNo(String phoneNo) throws Exception;
	
	public void updateUser(User user) throws Exception;
	
	public boolean checkDuplication(String userId) throws Exception;
	
	public void deleteUser(int userNo) throws Exception;
	
	public void addKakaoUser(User user) throws Exception;
	
	public String getAccessKakaoToken(String authorize_code) throws Exception;
	
	public HashMap<String, Object> getKakaoUserInfo(String access_Token) throws Exception;
}
