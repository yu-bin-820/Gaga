package com.gaga.bo.service.community.test;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.gaga.bo.service.community.CommunityService;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.domain.UserReview;

@SpringBootTest
class CommunityServiceTest {

	///field
	@Autowired
	@Qualifier("communityServiceImpl")
	CommunityService communityService;
	
	///Report Test
	//@Test
	public void testAddReport() throws Exception {
		Report report = new Report();
		
	    report.setReportingNo(2);
	    report.setReportedNo(3);
	    report.setReportCategoryNo(1);
	    report.setReportContent("This is a report.");
	    report.setReportDate(LocalDateTime.now());
	    report.setReportImg("report_img1.jpg");
	    report.setReportImg2("report_img2.jpg");
	    report.setReportImg3("report_img3.jpg");
		
	    communityService.addReport(report);
	    
	    
	}
	
	//@Test
	public void testGetReportList() throws Exception {

		User user = new User();
		
		user.setUserNo(1);
		user.setRole(1);
		
		List<Report> reportList = communityService.getReportList(user);
		
		System.out.println(reportList);

	}
	
	//@Test
	public void testGetReport() throws Exception {
		System.out.println(communityService.getReport(2));
	}
	
	//@Test
	public void testUpdateReport() throws Exception {
		Report report = communityService.getReport(1);
		report.setReportImg("updateTestImg2");
		communityService.updateReport(report);
		System.out.println(communityService.getReport(1).getReportImg());
	}
	
	//@Test
	public void testDeleteReport() throws Exception {
		communityService.deleteReport(1);
		System.out.println(communityService.getReport(1));
	}
	
	///ReviewTest
	//@Test
	public void testAddUserReview() throws Exception {
		UserReview userReview = new UserReview();
		userReview.setReviewerNo(3);
		userReview.setReviewedNo(4);
		userReview.setUserScore(1);
		communityService.addUserReview(userReview);
	}
	//@Test
	public void testGetUserReview() throws Exception {
		UserReview userReview = new UserReview();
		userReview.setReviewerNo(3);
		userReview.setReviewedNo(4);
		System.out.println("testGetUserReview"+communityService.getUserReview(userReview));
	}
	
	//@Test
	public void testUpdateUserReview() throws Exception {
		UserReview userReview = new UserReview();
		userReview.setReviewerNo(3);
		userReview.setReviewedNo(4);
		userReview.setUserScore(2);
		communityService.updateUserReview(userReview);
		System.out.println(communityService.getUserReview(userReview));
	}
	
	@Test
	public void testDeleteUserReview() throws Exception {
		UserReview userReview = new UserReview();
		userReview.setReviewerNo(3);
		userReview.setReviewedNo(4);
		communityService.deleteUserReview(userReview);
		System.out.println("after Delete : " + communityService.getUserReview(userReview));
	}
}
