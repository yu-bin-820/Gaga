package com.gaga.bo.service.user;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

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
	
	public void deleteUser(User user) throws Exception;
	
	public String getAccessNaverToken(String authorize_code) throws Exception;
	
	public String getAccessKakaoToken(String authorize_code) throws Exception;
	
	public Map<String, Object> getNaverUserInfo(String access_Token) throws Exception;
	
	public Map<String, Object> getKakaoUserInfo(String access_Token) throws Exception;
	
	public List<User> getGroupMemberList(Map<String, Integer> map) throws Exception;

	public String sendRandomSmsMessage(String userPhoneNo);
	
	public MimeMessage creatEmailContent(String userEmail) throws MessagingException, UnsupportedEncodingException;
    // 랜덤 인증코드 생성
    public String createEmailKey() throws Exception;
    // 메일 발송
    public String sendEmailContent(String userEmail) throws Exception;


}
