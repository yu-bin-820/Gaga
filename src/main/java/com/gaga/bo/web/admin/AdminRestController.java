package com.gaga.bo.web.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaga.bo.service.admin.AdminService;
import com.gaga.bo.service.domain.NoticePost;

@RestController
@RequestMapping("/rest/admin/*")  // 레스트 API의 기본 경로를 /api/notices로 설정
@CrossOrigin(origins = "http://*:[5173]")  // CORS 허용을 위한 설정
public class AdminRestController {

	@Autowired
	private AdminService adminService;
	
	@PostMapping("addNoticePost")
	public ResponseEntity<NoticePost> addNoticePost(@RequestBody NoticePost noticePost) throws Exception {
		adminService.addNoticePost(noticePost);
		return new ResponseEntity<>(noticePost, HttpStatus.CREATED);
	}
	
	@GetMapping("listNoticePost")
	public ResponseEntity<List<NoticePost>> listNoticePost() throws Exception {
		List<NoticePost> noticePosts = adminService.listNoticePost();
		return new ResponseEntity<>(noticePosts, HttpStatus.OK);
	}
	
	@GetMapping("getNoticePost/{noticePostNo}")
	public ResponseEntity<NoticePost> getNoticePost(@PathVariable int noticePostNo) throws Exception {
		NoticePost noticePost = adminService.getNoticePost(noticePostNo);
		if (noticePost == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(noticePost, HttpStatus.OK);
	}
	
	@PutMapping("updateNoticePost/{noticePostNo}")
	public ResponseEntity<NoticePost> updateNoticePost(@PathVariable int noticePostNo, @RequestBody NoticePost updatedNoticePost) throws Exception {
		NoticePost noticePost = adminService.getNoticePost(noticePostNo);
		if (noticePost == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		noticePost.setNoticePostTitle(updatedNoticePost.getNoticePostTitle());
		adminService.updateNoticePost(noticePost);
		
		return new ResponseEntity<>(noticePost, HttpStatus.OK);
	}
	
	@DeleteMapping("deleteNoticePost/{noticePostNo}")
	public ResponseEntity<Void> deleteNoticePost(@PathVariable int noticePostNo) throws Exception {
		NoticePost noticePost = adminService.getNoticePost(noticePostNo);
		if (noticePost == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		adminService.deleteNoticePost(noticePostNo);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}