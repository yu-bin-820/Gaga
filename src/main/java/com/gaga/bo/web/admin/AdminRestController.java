package com.gaga.bo.web.admin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gaga.bo.service.admin.AdminService;
import com.gaga.bo.service.domain.NoticePost;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;

@RestController
@RequestMapping("/rest/admin/*") // 레스트 API의 기본 경로를 /api/notices로 설정
//@CrossOrigin(origins = "http://*:[5173]")  // CORS 허용을 위한 설정
public class AdminRestController {

	@Autowired
	private AdminService adminService;

	private static final String UPLOAD_DIR = "/resources/static/image/uploadFiles/";
	
	@PostMapping(value = "addNoticePost")
	public ResponseEntity<NoticePost> addNoticePost(@RequestParam("noticePostCategoryNo") int noticePostCategoryNo,
			@RequestParam("noticePostTitle") String noticePostTitle,
			@RequestParam("noticePostText") String noticePostText,
			@RequestParam(value = "noticePostImg", required = false) MultipartFile noticePostImg) throws Exception {

		NoticePost noticePost = new NoticePost();
		noticePost.setNoticePostCategoryNo(noticePostCategoryNo);
		noticePost.setNoticePostTitle(noticePostTitle);
		noticePost.setNoticePostText(noticePostText);

		if (noticePostImg != null && !noticePostImg.isEmpty()) {
			String imageName = saveImageAndReturnUUID(noticePostImg);
			noticePost.setNoticePostImg(imageName);
		}

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
		System.out.println("im here Master" + noticePostNo);
		NoticePost noticePost = adminService.getNoticePost(noticePostNo);
		if (noticePost == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(noticePost, HttpStatus.OK);
	}

	@PutMapping("updateNoticePost/{noticePostNo}")
	public ResponseEntity<NoticePost> updateNoticePost(@PathVariable int noticePostNo,
			@RequestBody NoticePost updatedNoticePost) throws Exception {
		System.out.println("im here Master" + noticePostNo);
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

	// 이미지로직이었던것
	private String saveImageAndReturnUUID(MultipartFile image) throws Exception {
		String imageName = UUID.randomUUID().toString();

		Path imagePath = Paths.get(UPLOAD_DIR, imageName);

		Files.copy(image.getInputStream(), imagePath);

		return imageName;
	}

	@PostMapping("addBlackList/{userNo}")
	public ResponseEntity<String> addBlackList(@PathVariable int userNo) {
		try {
			adminService.addBlackList(userNo);
			return ResponseEntity.ok("블랙리스트에 추가되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("블랙리스트 추가 중 오류가 발생했습니다.");
		}
	}

	@GetMapping("listBlackList")
	public ResponseEntity<List<User>> listBlackList() {
		System.out.println("hi it is blackList");
		try {
			List<User> blacklist = adminService.listBlackList();
			List<User> filteredBlacklist = new ArrayList<>();

			for (User user : blacklist) {
				int blackListNo = user.getBlacklist();
				if (blackListNo != 0) {
					filteredBlacklist.add(user);
				}
			}
			return ResponseEntity.ok(filteredBlacklist);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("getBlackList/{userNo}")
	public ResponseEntity<User> getBlacklist(@PathVariable int userNo) throws Exception {
		User user = adminService.getBlackList(userNo);
		return ResponseEntity.ok(user);
	}
	
	//신고게시판
	@GetMapping("getReportAdmin/{reportedNo}")
	public ResponseEntity<List<Report>> getReportAdmin(@PathVariable int reportedNo) throws Exception {
	    List<Report> reports = adminService.getReportAdmin(reportedNo);
	    return ResponseEntity.ok(reports);
	}
	
	@GetMapping("listReportAdmin")
	public ResponseEntity<List<Report>> listReportAdmin() throws Exception {
	    System.out.println("did u call me?");
		List<Report> reports = adminService.listReportAdmin();
	    
	    if (!reports.isEmpty()) {
	        return ResponseEntity.ok(reports);
	    }
	    
	    return ResponseEntity.notFound().build();
	}
}

