package com.gaga.bo.service.user;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.User;

@Mapper
public interface UserDao {
	
	public void addUser(User user) throws Exception;
	
	public User getUser(int userNo) throws Exception;
	
	public User getUserId(String userId) throws Exception;
	
	public User getUserPhoneNo(String phoneNo) throws Exception;
	
	public void updateUser(User user) throws Exception;
		
	public void deleteUser(int userNo) throws Exception;
	
	public boolean chechDuplication(String userId) throws Exception;
	
}
