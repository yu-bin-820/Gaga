package com.gaga.bo.web.community;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gaga.bo.service.community.CommunityService;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.domain.UserReview;
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
	
	//------------------------Profile Request Mapping----------------------------------------------------------
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
	
	
	//------------------------Report Request Mapping----------------------------------------------------------
	
	@GetMapping("report/list/userno/{userNo}/role/{role}")
	public List<Report> getReportList(
									  @PathVariable("userNo") int userNo,
									  @PathVariable("role") int role
																		) throws Exception{
		
		User user = new User();
		user.setUserNo(userNo);
		user.setRole(role);
		
		return communityService.getReportList(user);
	} 
	
	@GetMapping("report/reportno/{reportNo}")
	public Report getReport(
							@PathVariable("reportNo") int reportNo
																	) throws Exception {
		
		Report report = communityService.getReport(reportNo);
		System.out.println(":: getReport :: " + report);
		
		return report;
	}
	
	@GetMapping("report/reportingno/{reportingNo}/reportedno/{reportedNo}")
	public Report getReportByUserNo(
									@PathVariable("reportingNo") int reportingNo,
									@PathVariable("reportedNo") int reportedNo
																				 )throws Exception {
		Report report = new Report();
		report.setReportingNo(reportingNo);
		report.setReportedNo(reportedNo);
		report = communityService.getReportByUserNo(report);
		System.out.println(":: getReportByUserNo ::" + report);
		return report;
	}
	
	
	@PostMapping("report")
	public void addReport(
						  @ModelAttribute Report report, 
						  @RequestParam(value = "file", required = false) MultipartFile file, 
						  @RequestParam(value = "file2", required = false) MultipartFile file2, 
						  @RequestParam(value = "file3", required = false) MultipartFile file3
								  											       				) throws Exception {
		

		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file.transferTo(new File(fileUploadPath+"\\community\\"+uuidFileName));
			
			report.setReportImg(uuidFileName);
		}
		
		if (file2 != null) {
			String ext = file2.getOriginalFilename().substring(file2.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file2.transferTo(new File(fileUploadPath+"\\community\\"+uuidFileName));
			
			report.setReportImg2(uuidFileName);
		}
		
		if (file3 != null) {
			String ext = file3.getOriginalFilename().substring(file3.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file3.transferTo(new File(fileUploadPath+"\\community\\"+uuidFileName));
			
			report.setReportImg3(uuidFileName);
		}
		
		communityService.addReport(report);
		
	}
	
	@PatchMapping("report")
	public void updateReport(
							 @ModelAttribute Report report,
							 @RequestParam(value = "file", required = false) MultipartFile file, 
							 @RequestParam(value = "file2", required = false) MultipartFile file2, 
							 @RequestParam(value = "file3", required = false) MultipartFile file3
														  										  ) throws Exception {
		
		System.out.println(":: updateReport() - Before Set Files :: "+ report);
		
		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file.transferTo(new File(fileUploadPath+"\\community\\"+uuidFileName));
			
			report.setReportImg(uuidFileName);
		}
		
		if (file2 != null) {
			String ext = file2.getOriginalFilename().substring(file2.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file2.transferTo(new File(fileUploadPath+"\\community\\"+uuidFileName));
			
			report.setReportImg2(uuidFileName);
		}
		
		if (file3 != null) {
			String ext = file3.getOriginalFilename().substring(file3.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file3.transferTo(new File(fileUploadPath+"\\community\\"+uuidFileName));
			
			report.setReportImg3(uuidFileName);
		}
		
		System.out.println(":: updateReport() - After Set Files :: "+ report);
		
		communityService.updateReport(report);
		
	}
	
	@DeleteMapping("report/reportno/{reportNo}")
	public void deleteReport(
							 @PathVariable int reportNo
							 						   ) throws Exception {
		
		System.out.println(":: deleteReport - reportNo :: "+reportNo);
		
		communityService.deleteReport(reportNo);
		 
	}
		
	//------------------------UserReview Request Mapping----------------------------------------------------------
	@GetMapping("userreview/reviewerno/{reviewerNo}/reviewedno/{reviewedNo}")
	public UserReview getUserReview(
									@PathVariable("reviewerNo") int reviewerNo,
									@PathVariable("reviewedNo") int reviewedNo
																			  ) throws Exception {
		UserReview userReview = new UserReview();
		userReview.setReviewerNo(reviewerNo);
		userReview.setReviewedNo(reviewedNo);
		userReview = communityService.getUserReview(userReview);
		System.out.println(" :: getUserReviewByUserNo :: " + userReview);
		return userReview;
	}
	
	@PostMapping("userreview")
	public void addUserReview(
							  @RequestBody UserReview userReview
								  							    ) throws Exception {
		
		System.out.println(" :: addUserReview :: " + userReview);
		communityService.addUserReview(userReview);
		
	}
	
	@PatchMapping("userreview")
	public void updateUserReview(
								 @RequestBody UserReview userReview
																   ) throws Exception {
		System.out.println(" :: updateUserReview() :: " + userReview);
		communityService.updateUserReview(userReview);
		
	}
	
	@DeleteMapping("userreview/reviewerno/{reviewerNo}/reviewedno/{reviewedNo}")
	public void deleteUserReview(
								 @PathVariable("reviewerNo") int reviewerNo,
								 @PathVariable("reviewedNo") int reviewedNo
																			) throws Exception {
		UserReview userReview = new UserReview();
		
		userReview.setReviewerNo(reviewerNo);
		userReview.setReviewedNo(reviewedNo);
		
		System.out.println(" :: deleteUserReview() :: " + userReview);
		
		communityService.deleteUserReview(userReview);
		
	}
		
}
