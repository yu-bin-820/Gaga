package com.gaga.bo.service.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.domain.User;
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
	public void updateUser(User user) throws Exception {
		userDao.updateUser(user);
	}

	@Override
	public User getUser(int userNo) throws Exception {
		
		return userDao.getUser(userNo);
	}

}
