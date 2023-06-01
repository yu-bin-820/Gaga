package com.gaga.bo.service.user;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.User;

@Mapper
public interface UserDao {
	
	public void addUser(User user) throws Exception;
	
	public User getUser(int userNo) throws Exception;
	
	public User getUserById(String userId) throws Exception;
	
	public User getUserByPhoneNo(String phoneNo) throws Exception;
	
	public void updateUser(User user) throws Exception;
		
	public void deleteUser(User user) throws Exception;
	
	public List<User> getGroupMemberList(Map<String, Integer> map) throws Exception;
	
}
