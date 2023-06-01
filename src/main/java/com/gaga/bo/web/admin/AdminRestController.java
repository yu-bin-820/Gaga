package com.gaga.bo.web.admin;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

	@Value("${fileUploadPath}")
	String fileUploadPath;
	
	@PostMapping("/addNoticePost")
	public ResponseEntity<Integer> addNoticePost(
	        @RequestParam(value = "file", required = false) MultipartFile file,
	        @RequestParam("noticePostTitle") String noticePostTitle,
	        @RequestParam("noticePostText") String noticePostText,
	        @RequestParam("noticePostCategory") Integer noticePostCategoryNo,
	        @RequestParam("userNo") Integer userNo
	) throws Exception {
		String noticePostImg = null;
		if (file != null) {
	        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
	        String uuidFileName = UUID.randomUUID().toString() + "." + ext;
	        
	        Path filePath = Path.of(fileUploadPath + uuidFileName);
	        
	        try (InputStream inputStream = file.getInputStream()) {
	            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
	        }
	        
	        noticePostImg = uuidFileName;
	    }

	    NoticePost noticePost = new NoticePost();
	    noticePost.setNoticePostTitle(noticePostTitle);
	    noticePost.setNoticePostText(noticePostText);
	    noticePost.setNoticePostImg(noticePostImg);
	    noticePost.setNoticePostRegDate(LocalDateTime.now());
	    noticePost.setNoticePostCategoryNo(noticePostCategoryNo);
	    noticePost.setUserNo(userNo);
	    adminService.addNoticePost(noticePost);
	    int noticePostNo = noticePost.getNoticePostNo();
	    System.out.println(noticePostNo+"노티스포스트남바");
	    return ResponseEntity.ok(noticePostNo);
	}

	@GetMapping("getNoticePostList")
	public ResponseEntity<List<NoticePost>> getNoticePostList() throws Exception {
		List<NoticePost> noticePosts = adminService.getNoticePostList();
		return new ResponseEntity<>(noticePosts, HttpStatus.OK);
	}

	@GetMapping("getNoticePostListCategory")
	public ResponseEntity<List<NoticePost>> getNoticePostList(@RequestParam("noticePostCategoryNo") int noticePostCategoryNo) throws Exception {
	    List<NoticePost> noticePosts = adminService.getNoticePostListByCategory(noticePostCategoryNo); // 해당 카테고리 번호에 해당하는 게시물 가져오기
	    return new ResponseEntity<>(noticePosts, HttpStatus.OK);
	}
	
	@GetMapping("getNoticePost/noticePostNo/{noticePostNo}")
	public ResponseEntity<NoticePost> getNoticePost(@PathVariable int noticePostNo) throws Exception {
		System.out.println("im here Master" + noticePostNo);
		NoticePost noticePost = adminService.getNoticePost(noticePostNo);
		if (noticePost == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(noticePost, HttpStatus.OK);
	}
	
	@GetMapping("getImage/{filename}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) throws Exception {
	    Path filePath = Path.of(fileUploadPath + filename);
	    Resource resource = new InputStreamResource(Files.newInputStream(filePath));

	    return ResponseEntity.ok()
	            .contentType(MediaType.IMAGE_JPEG)
	            .body(resource);
	}
	
	@PutMapping(value = "/updateNoticePost/noticePostNo/{noticePostNo}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<NoticePost> updateNoticePost(
	        @PathVariable int noticePostNo,
	        @RequestParam(value = "file", required = false) MultipartFile file,
	        @RequestParam("noticePostTitle") String noticePostTitle,
	        @RequestParam("noticePostText") String noticePostText,
	        @RequestParam("noticePostCategory") int noticePostCategoryNo
	) throws Exception {
	    NoticePost noticePost = adminService.getNoticePost(noticePostNo);
	    if (noticePost == null) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    String noticePostImg = noticePost.getNoticePostImg();
	    if (file != null) {
	        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
	        String uuidFileName = UUID.randomUUID().toString() + "." + ext;
	        
	        Path filePath = Path.of(fileUploadPath + uuidFileName);
	        
	        try (InputStream inputStream = file.getInputStream()) {
	            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
	        }
	        
	        noticePostImg = uuidFileName;
	    }

	    noticePost.setNoticePostTitle(noticePostTitle);
	    noticePost.setNoticePostText(noticePostText);
	    noticePost.setNoticePostImg(noticePostImg);
	    noticePost.setNoticePostCategoryNo(noticePostCategoryNo);
	    adminService.updateNoticePost(noticePost);

	    return new ResponseEntity<>(noticePost, HttpStatus.OK);
	}

	@DeleteMapping("deleteNoticePost/noticePostNo/{noticePostNo}")
	public ResponseEntity<Void> deleteNoticePost(@PathVariable int noticePostNo) throws Exception {
		NoticePost noticePost = adminService.getNoticePost(noticePostNo);
		if (noticePost == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		adminService.deleteNoticePost(noticePostNo);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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

	@GetMapping("getBlackListList")
	public ResponseEntity<List<User>> getBlackListList() {
		System.out.println("hi it is blackList");
		try {
			List<User> blacklist = adminService.getBlackListList();
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

	// 신고게시판
	@GetMapping("getReportAdmin/{reportedNo}")
	public ResponseEntity<List<Report>> getReportAdmin(@PathVariable int reportedNo) throws Exception {
		List<Report> reports = adminService.getReportAdmin(reportedNo);
		return ResponseEntity.ok(reports);
	}

	@GetMapping("getReportAdminList")
	public ResponseEntity<List<Report>> getReportAdminList() throws Exception {
		System.out.println("did u call me?");
		List<Report> reports = adminService.getReportAdminList();

		if (!reports.isEmpty()) {
			return ResponseEntity.ok(reports);
		}

		return ResponseEntity.notFound().build();
	}
}
