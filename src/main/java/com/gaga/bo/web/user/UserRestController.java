package com.gaga.bo.web.user;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
	
	@GetMapping("/userno/{userNo}")		//회원번호로 유저
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
	public ResponseEntity<String> logout(HttpSession session, HttpServletResponse response,
			 HttpServletRequest request) throws Exception{
		
		System.out.println("/rest/user/logout : DELETE 로그아웃 요청옴");
		
//		session.removeAttribute("user");
		session.removeAttribute("access_token"); // 네이버 로그인 토큰 정보 제거
		System.out.println("1");
		session.invalidate();
		System.out.println("2");
	    // 쿠키 삭제
	    Cookie[] cookies = request.getCookies();
	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            cookie.setMaxAge(0);
	            response.addCookie(cookie);
	        }
	    }
	    System.out.println("3");
		
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

	@GetMapping("/naverLogin")
	public ResponseEntity<User> naverLogin(@RequestParam(value = "code", required = false) String code, HttpSession session) throws Exception {
	    String access_Token = userService.getAccessNaverToken(code);
	    Map<String, Object> userInfoMap = userService.getNaverUserInfo(access_Token);
	    System.out.println("usercontroller nlogin= "+userInfoMap);

	    User user = new User();

	    session.setAttribute("user", user);
	    return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@GetMapping("/kakaoLogin")
	public ResponseEntity<User> kakaoLogin(@RequestParam(value = "code", required = false) String code, HttpSession session) throws Exception {
	    String access_Token = userService.getAccessKakaoToken(code);
	    Map<String, Object> userInfoMap = userService.getKakaoUserInfo(access_Token);
	    System.out.println("usercontroller klogin= "+userInfoMap);

	    User user = new User();

	    session.setAttribute("user", user);
	    return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@PostMapping("/phoneAuth")
	public Boolean phoneAuth(@RequestBody String tel, HttpSession session) {
		System.out.println("핸드폰 인증 요청 옴");
	    try {
	        // 이미 가입된 전화번호가 있는지 확인
	        User user = userService.getUserByPhoneNo(tel);
	        if(user != null && user.getPhoneNo().equals(tel)) {
	            return true;
	        }
	    } catch (Exception e) {
	        System.out.println("폰인증 에러"+e);
	        e.printStackTrace();
	    }
	
	    String code = userService.sendRandomSmsMessage(tel);
	    session.setAttribute("rand", code);
	    
	    return false;
	}
	
	@PostMapping("/phoneAuthOk")
	public Boolean phoneAuthOk(@RequestBody String code, HttpSession session) {
	    String rand = (String) session.getAttribute("rand");

	    System.out.println(rand + "<-인증번호 : 회원이입력한 인증번호->" + code);

	    if (rand.equals(code)) {
	        session.removeAttribute("rand");
	        return true;
	    } 

	    return false;
	}

}
