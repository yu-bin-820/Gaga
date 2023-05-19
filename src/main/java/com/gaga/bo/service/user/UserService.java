package com.gaga.bo.service.user;

import com.gaga.bo.service.domain.User;

public interface UserService {
	
	public void addUser(User user) throws Exception;
	
	public User getUser(int userNo) throws Exception;
	
	public User getUserId(String userId) throws Exception;
	
	public void updateUser(User user) throws Exception;
	
	public boolean checkDuplication(String userId) throws Exception;
	
	public void deleteUser(int userNo) throws Exception;
}
