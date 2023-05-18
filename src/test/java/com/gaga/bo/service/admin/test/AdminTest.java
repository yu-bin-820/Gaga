package com.gaga.bo.service.admin.test;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.gaga.bo.service.admin.AdminService;
import com.gaga.bo.service.domain.NoticePost;

@SpringBootTest
class AdminTest {

	///field
	@Autowired
	@Qualifier("adminServiceImpl")
	AdminService adminService;
	
	@Test
	public void testAddNoticePost() {
		NoticePost noticePost = new NoticePost();
		
	    noticePost.setNoticePostNo(999);
	    noticePost.setNoticePostCategoryNo(1);
	    noticePost.setNoticePostTitle("junit테스트");
	    noticePost.setNoticePostText("junit테스트");
	    noticePost.setNoticePostImg("asdasdsad.jpg");
	    noticePost.setNoticePostRegDate(LocalDateTime.now());
	    noticePost.setUserNo(5);
	    		
	    adminService.addNoticePost(noticePost);
	}

}
