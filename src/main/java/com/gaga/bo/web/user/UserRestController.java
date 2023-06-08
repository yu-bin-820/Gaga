package com.gaga.bo.web.user;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
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
	
	@Value("${redirectUrl}")
    private String redirectUrl;
	
	public UserRestController(){
		System.out.println(this.getClass());
	}
	
	@GetMapping("/userno/{userNo}")		//회원번호로 유저정보 얻기
	public User getUser( @PathVariable int userNo ) throws Exception{
		
		System.out.println("/rest/user/getUser : GET");
		
		//Business Logic
		return userService.getUser(userNo);
	}
	
	@GetMapping("/userid/{userId}")	//아이디로 유저정보 얻기
	public User getUserById( @PathVariable String userId ) throws Exception{
		
		System.out.println("/rest/user/getUserId : GET");
		
		//Business Logic
		return userService.getUserById(userId);
	}
	
	@GetMapping("/phoneno/{phoneNo}") //아이디찾기, 비밀번호찾기용
	public User getUserByPhoneNo( @PathVariable String phoneNo ) throws Exception{
		
		System.out.println("/rest/user/getUserPhoneNo : GET");
		
		//Business Logic
		return userService.getUserByPhoneNo(phoneNo);
	}
	
	@GetMapping("/login")
	public User getLoginUser(HttpSession session) throws Exception {

		System.out.println("::: get/login : " + (User)session.getAttribute("user"));
		
		return (User)session.getAttribute("user");
	}
	
	
	@PostMapping("/login")
	public User login(	@RequestBody User user,
									HttpSession session ) throws Exception{
		System.out.println("/rest/user/login : POST");
		
		//Business Logic
		User dbUser=userService.getUserById(user.getUserId());

		if( dbUser!=null ) {
			if( user.getPassword().equals(dbUser.getPassword())){
				session.setAttribute("user", dbUser);
			}
		}
		System.out.println("::"+user);	
		return dbUser;
		
	}
	
    @PostMapping("/checkDuplicateId")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateId(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        boolean isDuplicate;
        System.out.println("아이디중복체크 아이디는="+userId);
        
        try {
            isDuplicate = userService.checkDuplication(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("isDuplicate", isDuplicate);
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	@DeleteMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session, HttpServletResponse response,
			 HttpServletRequest request) throws Exception{
		
		System.out.println("/rest/user/logout : DELETE 로그아웃 요청옴");
		
//		session.removeAttribute("user");
		session.removeAttribute("access_token"); 	// 네이버/카카오 로그인 토큰 정보 제거
		session.invalidate();
	    Cookie[] cookies = request.getCookies();	// 쿠키 삭제
	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            cookie.setMaxAge(0);
	            response.addCookie(cookie);
	        }
	    }
	    System.out.println("로그아웃 완료");
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
	public ResponseEntity<User> addUser(@RequestBody User user, HttpSession session) throws Exception {
		System.out.println("/resr/user/addUser : POST");
		String userId = user.getUserId();
		System.out.println("회원가입 요청온 유저정보: "+user);
		// 아이디 중복 확인
//	    boolean isDuplicate = userService.checkDuplication(user.getUserId());
//	    if (isDuplicate) {
//	    	System.out.println("아이디 중복임");
//	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	    }
		// Business Logic
		userService.addUser(user);
		
		// 회원 가입 후 자동 로그인 처리를 위해 세션에 사용자 정보 저장
	    session.setAttribute("user", user);

		// 일반적으로 새로 생성된 리소스를 반환합니다.
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/updateUser")
	public ResponseEntity<User> updateUser(@RequestBody User user,HttpSession session) throws Exception {
		System.out.println("/rest/user/updateUser : POST");

		userService.updateUser(user);
		System.out.println();

		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/deleteUser")
    public ResponseEntity<User> deleteUser(@RequestBody User user) throws Exception{
        try {
            userService.deleteUser(user);
            System.out.println("회원번호="+user+"유저정보 삭제완료");
            System.out.println((userService.getUser(user.getUserNo())));
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
        	System.out.println("오류가 발생했습니다: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
        
    }

	@GetMapping("/naverLogin")
	public void naverLogin(@RequestParam(value = "code", required = false) String code, HttpSession session, HttpServletResponse response) throws Exception {
	    String access_Token = userService.getAccessNaverToken(code);
	    Map<String, Object> userInfoMap = userService.getNaverUserInfo(access_Token);
	    System.out.println("usercontroller nlogin= " + userInfoMap);

	    String userId = (String) userInfoMap.get("id");
	    // 아이디가 데이터베이스에 존재하는지 확인
	    boolean isExistingUser = userService.checkDuplication(userId);

	    if (isExistingUser) {
	        // 기존에 가입된 아이디인 경우, 로그인 처리
	        User user = userService.getUserById(userId);
	        session.setAttribute("user", user);
	        System.out.println("네이버 로그인 유저 정보: " + user);
	        response.sendRedirect(redirectUrl); 
	    } else {		// 존재하지 않는 아이디인 경우, 유저 객체에 정보 담기
	        User user = new User();
	        user.setUserId(userId);
	        user.setUserName((String) userInfoMap.get("name"));
	        user.setNickName((String) userInfoMap.get("nickname"));
	        user.setPhoneNo((String) userInfoMap.get("mobile"));
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        LocalDate birthday = LocalDate.parse((String) userInfoMap.get("birthday"), formatter);
	        user.setBirthday(birthday);
	        user.setGender((Integer) userInfoMap.get("gender"));

	        session.setAttribute("user", user);
	        System.out.println("네이버 로그인 유저 정보: " + user);
	        response.sendRedirect(redirectUrl+"/user/addnaveruser"); 
	    }
	}
	
	@GetMapping("/kakaoLogin")
	public void kakaoLogin(@RequestParam(value = "code", required = false) String code, HttpSession session, HttpServletResponse response) throws Exception {
	    String access_Token = userService.getAccessKakaoToken(code);
	    Map<String, Object> userInfoMap = userService.getKakaoUserInfo(access_Token);
	    System.out.println("usercontroller klogin= " + userInfoMap);

	    String userId = (String) userInfoMap.get("email");

	    // 아이디가 데이터베이스에 존재하는지 확인
	    boolean isExistingUser = userService.checkDuplication(userId);

	    if (isExistingUser) {
	        // 기존에 가입된 아이디인 경우, 로그인 처리
	        User user = userService.getUserById(userId);
	        session.setAttribute("user", user);
	        System.out.println("카카오 로그인 유저 정보: " + user);
	        response.sendRedirect(redirectUrl); 
	    } else {
	        // 존재하지 않는 아이디인 경우, 유저 객체에 정보 담기, 카카오는 id 닉네임 2개만 우리가 사용함
	        User user = new User();
	        user.setUserId(userId);
	        user.setNickName((String) userInfoMap.get("nickname"));

	        session.setAttribute("user", user);
	        System.out.println("카카오 로그인 유저 정보: " + user);
	        response.sendRedirect(redirectUrl+"/user/addkakaouser");
	    }
	}

	@GetMapping("/list/grouptype/{groupType}/no/{groupNo}/state/{state}")
	public List<User> getGroupMemberList(@PathVariable("groupType") int groupType,
										@PathVariable("groupNo") int groupNo,
										@PathVariable("state") int state) throws Exception{
		
		Map<String, Integer> map = new HashMap<String,Integer>();
		map.put("groupType", groupType);
	    map.put("groupNo", groupNo);
	    map.put("state", state);
	    
	    System.out.println(":: 멤버 검색조건 map :: "+map);
	    
		return userService.getGroupMemberList(map);
	} 

//	//회원,비회원이 핸드폰 인증을 요청하면 회원핸드폰번호에 인증코드 발송하여 요청 처리
//	@PostMapping("/phoneAuth")
//	public Boolean phoneAuth(@RequestBody String userPhoneNo, HttpSession session) {
//		System.out.println("핸드폰 인증 요청 옴");
//	    try {
//	        // 이미 가입된 전화번호가 있는지 확인
//	        User user = userService.getUserByPhoneNo(userPhoneNo);
//	        if(user != null && user.getPhoneNo().equals(userPhoneNo)) {
//	            return true;
//	        }
//	    } catch (Exception e) {
//	        System.out.println("폰인증 에러"+e);
//	        e.printStackTrace();
//	    }
//	    System.out.println("phoneAuth session ID: " + session.getId());
//	    String code = userService.sendRandomSmsMessage(userPhoneNo);
//	    System.out.println("codeeeeeeeee"+code);
//	    session.setAttribute("rand", code);
//	    
//	    return false;
//	}
//	//서버의 핸드폰 인증코드와, 회원이 입력한 코드를 비교
//	@PostMapping("/phoneAuthOk")
//	public Boolean phoneAuthOk(@RequestBody String phoneAuthCode, HttpSession session,HttpServletRequest request) {
//	    String rand = (String) session.getAttribute("rand");
//	    String code = (String) request.getParameter("code");
//	    System.out.println("rand"+rand);
//	    System.out.println(rand + " <-서버발송 인증번호 || 회원이입력한 인증번호-> " + phoneAuthCode);
//	    phoneAuthCode = phoneAuthCode.replace("=", ""); // = 기호 제거
//	    if (rand.equals(phoneAuthCode)) {
//	        session.removeAttribute("rand");
//	        return true;
//	    } 
//	    System.out.println("phoneAuthOk session ID: " + session.getId());
//	    return false;
//	}
	@PostMapping(value= "/phoneNo")
	public String phoneNo(@RequestBody Map<String, String> body) throws Exception{
		String userPhoneNo=body.get("phoneNo");
		String phoneAuthCode= userService.sendRandomSmsMessage(userPhoneNo);
		return phoneAuthCode;
	}
	@PostMapping(value = "/mailAuth") 		//이메일 인증, 회원 아이디(이메일)에 대해 인증 코드 발송
	public String mailConfirm(@RequestBody Map<String, String> body) throws Exception {
	    String userEmail = body.get("email");
	    String emailAuthCode = userService.sendEmailContent(userEmail);
	    System.out.println("사용자에게 발송한 인증코드 ==> " + emailAuthCode);

	    return emailAuthCode;
	}

}
