package com.gaga.bo.service.user.test;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.UserService;
import java.time.LocalDate;

@SpringBootTest
class UserServiceTest {
    @Autowired
    @Qualifier("userServiceImpl")
    UserService userService;

    @Test
    public void addUserTest() throws Exception{
        User user = new User();
        
        user.setUserId("송용범");
        user.setPassword("1234");
        user.setUserName("song");
        user.setBirthday(LocalDate.of(2000, 1, 1));
        user.setGender(1);
        user.setNickName("song");
        user.setPhoneNo(01011111111);
        user.setFilterMinAge(14);
        user.setFilterMaxAge(100);
        // 필요한 필드들을 추가로 설정하세요.

        userService.addUser(user);

        // 데이터베이스에 실제로 추가되었는지 확인하는 방법은 데이터베이스에서 조회하는 방법 등이 있습니다.
        // 예를 들면, userService.getUser(user.getUserNo()); 와 같이 조회한 후 assertEquals 등을 사용하여 확인할 수 있습니다.
        // 이 부분은 당신의 환경과 요구 사항에 따라 다를 수 있습니다.
    }
    
    //@Test
//    public void updateUserTest() throws Exception{
//        User user = new User();
//        user.setUserNo(9);
//        user.setUserId("이현석");
//        user.setPassword("1234");
//        user.setUserName("lee수정되냐??");
//        user.setBirthday(LocalDate.of(2000, 1, 1));
//        user.setGender(1);
//        user.setNickName("lee");
//        user.setPhoneNo(01011111111);
//        user.setFilterMinAge(14);
//        user.setFilterMaxAge(14);
//
//       
//
//        userService.updateUser(user);
//
//        // 데이터베이스에 실제로 추가되었는지 확인하는 방법은 데이터베이스에서 조회하는 방법 등이 있습니다.
//        // 예를 들면, userService.getUser(user.getUserNo()); 와 같이 조회한 후 assertEquals 등을 사용하여 확인할 수 있습니다.
//        // 이 부분은 당신의 환경과 요구 사항에 따라 다를 수 있습니다.
//    }
    
    //@Test
    public void getUserTest() throws Exception{
    	int userNo=8;
    	
    	User user = userService.getUser(userNo);
    	
    	System.out.println("회원정보8번의 유저정보 겟 테스트"+user);
    }
}