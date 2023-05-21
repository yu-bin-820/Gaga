package com.gaga.bo.web.user;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
	
	@GetMapping("/userno/{userId}")
	public User getUser( @PathVariable String userId ) throws Exception{
		
		System.out.println("/user/json/getUser : GET");
		
		//Business Logic
		return userService.getUserById(userId);
	}
	
	@GetMapping("/login")
	public User getLoginUser(HttpSession session) throws Exception {
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
	

//    @GetMapping("/kakaoLogin")
//    public String kakaoLogin(@RequestParam(value = "code", required = false) String code, HttpSession session) throws Exception {
//        String access_Token = userService.getAccessKakaoToken(code);
//        HashMap<String, Object> user = userService.getKakaoUserInfo(access_Token);
//        session.setAttribute("user", user);
//        return "redirect:/main.jsx";
//    }

}
