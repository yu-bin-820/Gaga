package com.gaga.bo.web.user;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.UserService;

@RestController
@RequestMapping("/rest/user")
public class UserRestController {
	@Autowired
	@Qualifier("userServiceImpl")
    private UserService userService;
	
	public UserRestController(){
		System.out.println(this.getClass());
	}
	
	@GetMapping("/userno/{userNo}")
	public User getUser( @PathVariable int userNo ) throws Exception{
		
		System.out.println("/rest/user/getUser : GET");
		
		//Business Logic
		return userService.getUser(userNo);
	}
	
	@GetMapping("/userid/{userId}")
	public User getUserById( @PathVariable String userId ) throws Exception{
		
		System.out.println("/rest/user/getUserId : GET");
		
		//Business Logic
		return userService.getUserById(userId);
	}
	
	@GetMapping("/phoneno/{phoneNo}")
	public User getUserByPhoneNo( @PathVariable String phoneNo ) throws Exception{
		
		System.out.println("/rest/user/getUserPhoneNo : GET");
		
		//Business Logic
		return userService.getUserByPhoneNo(phoneNo);
	}
	
	@GetMapping("/login")
	public User getLoginUser(HttpSession session) throws Exception {
		System.out.println("::: get/login");
		return (User)session.getAttribute("user");
	}
	
	@PostMapping("/login")
	public User login(	@RequestBody User user,
									HttpSession session ) throws Exception{
	
		System.out.println("/rest/user/login : POST");
		//Business Logic
		System.out.println("::"+user);
		User dbUser=userService.getUserById(user.getUserId());

		if( dbUser==null ) {
		dbUser = new User();
		}
		
		if( user.getPassword().equals(dbUser.getPassword())){
			session.setAttribute("user", dbUser);
		}
		
		return dbUser;
	}
	
	@DeleteMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session ) throws Exception{
		
		System.out.println("/rest/user/logout : DELETE");
		
//		session.removeAttribute("user");
		session.invalidate();
		
		// 성공 메시지를 반환합니다.
		return new ResponseEntity<>("로그아웃 완료!", HttpStatus.OK);
	}
	
	@GetMapping("/addUser")
	public ResponseEntity<String> addUser() throws Exception{
		System.out.println("/rest/user/addUser : GET");

		// "redirect:/main.jsx"는 RESTful API에서 일반적으로 사용되지 않습니다. 
		// 일반적으로 해당 API가 수행하는 작업을 설명하는 메시지를 반환합니다.
		return new ResponseEntity<>("User add API is ready for POST request.", HttpStatus.OK);
	}
	
	@PostMapping("/addUser")
	public ResponseEntity<User> addUser(@RequestBody User user) throws Exception {
		System.out.println("/resr/user/addUser : POST");
		String userId = user.getUserId();
		
		// 아이디 중복 확인
	    boolean isDuplicate = userService.checkDuplication(userId);
	    if (isDuplicate) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
		// Business Logic
		userService.addUser(user);

		// 일반적으로 새로 생성된 리소스를 반환합니다.
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/updateUser")
	public ResponseEntity<User> updateUser(@RequestBody User user) throws Exception {
		System.out.println("/rest/user/updateUser : POST");
//		String userId = user.getUserId();
//		
//		// 아이디 중복 확인
//	    boolean isDuplicate = userService.checkDuplication(userId);
//	    if (isDuplicate) {
//	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	    }
		// Business Logic
		userService.updateUser(user);

		// 일반적으로 새로 생성된 리소스를 반환합니다.
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/deleteUser/{userNo}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userNo) {
        try {
            userService.deleteUser(userNo);
            System.out.println("회원번호="+userNo+"유저정보 삭제완료");
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
        	System.out.println("오류가 발생했습니다: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
        
    }

    @GetMapping("/kakaoLogin")
    public String kakaoLogin(@RequestParam(value = "code", required = false) String code, HttpSession session) throws Exception {
        String access_Token = userService.getAccessKakaoToken(code);
        HashMap<String, Object> user = userService.getKakaoUserInfo(access_Token);
        session.setAttribute("user", user);
        return "redirect:/main.jsx";
    }

}
