package com.gaga.bo.service.user.test;

import static org.junit.Assert.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.UserService;

@SpringBootTest
class UserServiceTest {
    @Autowired
    @Qualifier("userServiceImpl")
    UserService userService;

    //@Test //테스트 완료
    public void addUserTest() throws Exception{
        User user = new User();
        
        user.setUserId("limfe@gaga.com");
        user.setPassword("1234");
        user.setUserName("chul");
        user.setBirthday(LocalDate.of(2000, 1, 1));
        user.setGender(1);
        user.setNickName("fe");
        user.setPhoneNo("01011111111");
        user.setFilterMinAge(14);
        user.setFilterMaxAge(100);

        userService.addUser(user);
    }
    
    //@Test //테스트 완료
    public void updateUserTest() throws Exception{
        User user = new User();
        user.setUserId("updateTest@gaga.com");
        user.setUserNo(6);
        user.setPassword("1234");
        user.setUserName("유저네임 수정 테스트");
        user.setBirthday(LocalDate.of(2000, 1, 1));
        user.setGender(1);
        user.setNickName("fefe test");
        user.setPhoneNo("01011111111");
        user.setFilterMinAge(14);
        user.setFilterMaxAge(14);

        userService.updateUser(user);
    }
    
    //@Test //테스트 완료
    public void getUserTest() throws Exception{
    	int userNo=6;
    	
    	User user = userService.getUser(userNo);
    	
    	System.out.println("회원정보8번의 유저정보 겟 테스트"+user);
    }
    
    //@Test    //테스트 완료
    public void getUserIdTest() throws Exception{
    	String userId="updateTest@gaga.com";
    	
    	User user = userService.getUserId(userId);
    	
    	System.out.println("회원id user1의 유저정보 겟 테스트"+user);
    }	//회원 아이디로 유저정보 가져오기 완료
    
    @Test     // 테스트 완료
    public void testCheckDuplication() throws Exception {
        String userId = "xxxx";

        boolean result = userService.checkDuplication(userId);

        assertTrue(result);
    } //xxxx 인 회원 아이디 체크 듀플리케이션 확인 존재하는 회원 확인하려면 user1로 변경
    
    
}