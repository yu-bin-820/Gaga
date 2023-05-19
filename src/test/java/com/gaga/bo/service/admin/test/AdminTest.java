package com.gaga.bo.service.admin.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;
import java.util.List;

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
	
	//@Test
	public void testAddNoticePost() {
		NoticePost noticePost = new NoticePost();
		
	    noticePost.setNoticePostNo(999);
	    noticePost.setNoticePostCategoryNo(1);
	    noticePost.setNoticePostTitle("junit테스트1");
	    noticePost.setNoticePostText("junit테스트");
	    noticePost.setNoticePostImg("asdasdsad.jpg");
	    noticePost.setNoticePostRegDate(LocalDateTime.now());
	    noticePost.setUserNo(5);
	    		
	    adminService.addNoticePost(noticePost);
	  
	}
	
	//@Test
	public void testListNoticePost() {
		List<NoticePost> noticePost = adminService.listNoticePost();

		// Verify if the list is not empty
		assertTrue(noticePost.size() > 0);
	}
	
	//@Test
	public void testGetNoticePost() {
		// Test the getNoticePost method with an existing post number
		NoticePost noticePost = adminService.getNoticePost(3);

		// Verify the returned NoticePost
		//assertNotNull(noticePost);
		assertEquals(3, noticePost.getNoticePostNo());
	}
	//@Test
	public void testUpdateNoticePost() {
		NoticePost noticePost = adminService.getNoticePost(3);

		// Update the NoticePost
		noticePost.setNoticePostTitle("Updated Title업데이트 업업");
		adminService.updateNoticePost(noticePost);

		// Verify the updated NoticePost
		NoticePost updatedNoticePost = adminService.getNoticePost(3);
		assertEquals("Updated Title업데이트 업업", updatedNoticePost.getNoticePostTitle());
	}
	//@Test
	public void testDeleteNoticePost() {
		// Delete an existing NoticePost
		adminService.deleteNoticePost(3);

		// Verify if the post was deleted
		NoticePost deletedNoticePost = adminService.getNoticePost(3);
		assertNull(deletedNoticePost);
	}
}
