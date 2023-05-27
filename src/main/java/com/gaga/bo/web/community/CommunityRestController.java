package com.gaga.bo.web.community;

import java.io.File;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gaga.bo.service.community.CommunityService;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.UserService;

@RestController
@RequestMapping("/rest/community")
public class CommunityRestController {
	
	///field
	@Autowired
	@Qualifier("communityServiceImpl")
	CommunityService communityService;
	
	@Autowired
	@Qualifier("userServiceImpl")
	UserService userService;
	
	@Value("${fileUploadPath}")
	String fileUploadPath;
	
	///Constructor()
	public CommunityRestController() {
		System.out.println(this.getClass());
	}
	
	@PatchMapping("profileimg/userno/{userNo}")
	public void updateProfileImg(@PathVariable int userNo, @RequestParam("file") MultipartFile file, HttpSession session) throws Exception {
		User user = userService.getUser(userNo);
		System.out.println("profileImg 변경 전 :: " + user);
		System.out.println(file.getOriginalFilename()+file.isEmpty());
		String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
		String uuidFileName = UUID.randomUUID().toString()+ext;

		file.transferTo(new File(fileUploadPath+"\\user\\"+uuidFileName));
		
		user.setProfileImg(uuidFileName);
		userService.updateUser(user);
		System.out.println("profileImg 변경 후 :: " + user);
		session.setAttribute("user", user);
	}
	
	@PatchMapping("activityimg/userno/{userNo}")
	public void updateActivityImg(
								  @PathVariable int userNo, 
								  @RequestParam(value = "file", required = false) MultipartFile file, 
								  @RequestParam(value = "file2", required = false) MultipartFile file2, 
								  @RequestParam(value = "file3", required = false) MultipartFile file3, 
								  HttpSession session
								  											  ) throws Exception {
		
		User user = userService.getUser(userNo);
		
		System.out.println("ActivityImg 변경 전 :: " + user);
		System.out.println(file.getOriginalFilename());

		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file.transferTo(new File(fileUploadPath+"\\user\\"+uuidFileName));
			
			user.setActivityImg(uuidFileName);
		}
		
		if (file2 != null) {
			String ext = file2.getOriginalFilename().substring(file2.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file2.transferTo(new File(fileUploadPath+"\\user\\"+uuidFileName));
			
			user.setActivityImg2(uuidFileName);
		}
		
		if (file3 != null) {
			String ext = file3.getOriginalFilename().substring(file3.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file3.transferTo(new File(fileUploadPath+"\\user\\"+uuidFileName));
			
			user.setActivityImg3(uuidFileName);
		}
		
		userService.updateUser(user);
		System.out.println("ActivityImg 변경 후 :: " + user);
		session.setAttribute("user", user);
	}
}
