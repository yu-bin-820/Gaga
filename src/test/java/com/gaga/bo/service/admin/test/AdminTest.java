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
	@Qualifier("AdminServiceImpl")
	AdminService adminService;
	
	@Test
	public void testAddNoticePost() {
		NoticePost noticePost = new NoticePost();
		
	    noticePost.setNoticePostNo(9990);
	    noticePost.setNoticePostCategoryNo(1001);
	    noticePost.setNoticePostTitle("junit단테");
	    noticePost.setNoticePostText("단테내용물");
	    noticePost.setNoticePostImg("단테.jpg");
	    noticePost.setNoticePostRegDate(LocalDateTime.now());
	    noticePost.setUserNo(1212);
	    		
	    adminService.addNoticePost(noticePost);
	}

}
