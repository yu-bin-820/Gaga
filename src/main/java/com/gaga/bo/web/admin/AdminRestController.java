package com.gaga.bo.web.admin;

import java.io.File;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gaga.bo.service.admin.AdminService;
import com.gaga.bo.service.domain.NoticePost;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.UserService;

@RestController
@RequestMapping("/rest/admin/*") // 레스트 API의 기본 경로를 /api/notices로 설정
//@CrossOrigin(origins = "http://*:[5173]")  // CORS 허용을 위한 설정
public class AdminRestController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private ResourceLoader resourceLoader;

	@Value("${fileUploadPath}")
	String fileUploadPath;
/*
	@PostMapping("addNoticePost")
	public void addNoticePost(
			@ModelAttribute NoticePost noticePost, @RequestParam(value = "file", required = false) MultipartFile file,
	                                             @RequestParam("noticePostTitle") String noticePostTitle,
	                                             @RequestParam("noticePostText") String noticePostText,
	                                             @RequestParam("noticePostCategory") int noticePostCategoryNo,
	                                             @RequestParam("userNo") int userNo,
	                                             HttpSession session) throws Exception {

	    Resource resource = resourceLoader.getResource("classpath:" + fileUploadPath);
		File uploadDir = resource.getFile();
		
		File dir = new File(uploadDir, "admin");
		    if (!dir.exists()) {
		        dir.mkdirs();
		    }

		    
	    if (file != null) {
	        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
	        String uuidFileName = UUID.randomUUID().toString() + ext;
	        file.transferTo(new File(uploadDir, "admin/"+uuidFileName));
	        noticePost.setNoticePostImg(uuidFileName);
	    }
	    noticePost.setNoticePostTitle(noticePostTitle);
	    noticePost.setNoticePostText(noticePostText);
	    
	    noticePost.setNoticePostRegDate(LocalDateTime.now());
	    noticePost.setNoticePostCategoryNo(noticePostCategoryNo);
	    noticePost.setUserNo(userNo);
	    adminService.addNoticePost(noticePost);
	    int noticePostNo = noticePost.getNoticePostNo();
	    System.out.println(noticePostNo + "노티스포스트남바");

	}
	*/
	@PostMapping("addNoticePost")
	public void addNoticePost(
	        @ModelAttribute NoticePost noticePost,
	        @RequestParam(value = "file", required = false) MultipartFile file,
	        @RequestParam(value = "thumbNailFile", required = false) MultipartFile thumbNailFile,
	        @RequestParam("noticePostTitle") String noticePostTitle,
	        @RequestParam("noticePostText") String noticePostText,
	        @RequestParam("noticePostCategory") int noticePostCategoryNo,
	        @RequestParam("userNo") int userNo,
	        @RequestParam(value = "qnaCategory", required = false) Integer qnaCategory) throws Exception {

	    String uuidFileName = handleFileUpload(file);
	    if (uuidFileName != null) {
	        noticePost.setNoticePostImg(uuidFileName);
	    }
	    System.out.println(uuidFileName+"uuidFIle");
	    System.out.println("noticePostCategoryNo :  ::: :::"+noticePostCategoryNo);
	    System.out.println("thumbNail :  ::: :::"+thumbNailFile);
	    if (noticePostCategoryNo == 1 && thumbNailFile != null) {
	        String thumbNailName = handleFileUpload(thumbNailFile);
	        if (thumbNailName != null) {
	        	noticePost.setThumbNail(thumbNailName);
	        	System.out.println("썸넬팔 이름이에용"+thumbNailName);
		    }	        
	    }
	    
	    if (noticePostCategoryNo == 2 && qnaCategory != null) {
	    	noticePost.setQnaCategory(qnaCategory);
	    } 
	    
	    noticePost.setNoticePostTitle(noticePostTitle);
	    noticePost.setNoticePostText(noticePostText);
	    noticePost.setNoticePostRegDate(LocalDateTime.now());
	    noticePost.setNoticePostCategoryNo(noticePostCategoryNo);
	    noticePost.setUserNo(userNo);

	    adminService.addNoticePost(noticePost);
	    System.out.println(noticePost+"결과보여줘용?");
	    int noticePostNo = noticePost.getNoticePostNo();
	    System.out.println(noticePostNo + "노티스포스트남바");
	}
	
	public String handleFileUpload(MultipartFile file) throws Exception {
	    if (file == null) {
	        return null;
	    }

	    String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
	    String uuidFileName = UUID.randomUUID().toString() + ext;

	    Resource resource = resourceLoader.getResource("classpath:" + fileUploadPath);
	    File uploadDir = resource.getFile();
	    File dir = new File(uploadDir, "admin");
	    if (!dir.exists()) {
	        dir.mkdirs();
	    }

	    file.transferTo(new File(dir, uuidFileName));

	    return uuidFileName;
	}
	
	@PutMapping(value = "updateNoticePost/noticePostNo/{noticePostNo}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<NoticePost> updateNoticePost(
	        @PathVariable int noticePostNo,
	        @RequestParam(value = "file", required = false) MultipartFile file,
	        @RequestParam("noticePostTitle") String noticePostTitle,
	        @RequestParam("noticePostText") String noticePostText,
	        @RequestParam("noticePostCategory") int noticePostCategoryNo,
	        @RequestParam(value = "thumbNailFile", required = false) MultipartFile thumbNailFile,
	        @RequestParam(value = "qnaCategory", required = false) Integer qnaCategory) throws Exception {

	    NoticePost noticePost = adminService.getNoticePost(noticePostNo);
	    if (noticePost == null) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    String uuidFileName = handleFileUpload(file);
	    if (uuidFileName != null) {
	        noticePost.setNoticePostImg(uuidFileName);
	    }

	    if (noticePostCategoryNo == 1 && thumbNailFile != null) {
	        String thumbNailName = handleFileUpload(thumbNailFile);
	        if (thumbNailName != null) {
	        	noticePost.setThumbNail(thumbNailName);
		    }	        
	    }
	    
	    if (noticePostCategoryNo == 2 && qnaCategory != null) {
	    	noticePost.setQnaCategory(qnaCategory);
	    } 
	    
	    noticePost.setNoticePostTitle(noticePostTitle);
	    noticePost.setNoticePostText(noticePostText);
	    noticePost.setNoticePostCategoryNo(noticePostCategoryNo);

	    adminService.updateNoticePost(noticePost);

	    return new ResponseEntity<>(noticePost, HttpStatus.OK);
	}
	
	@GetMapping("getNoticePostList")
	public ResponseEntity<List<NoticePost>> getNoticePostList(
	        @RequestParam("noticePostCategoryNo") int noticePostCategoryNo) throws Exception {
	    // 해당 카테고리 번호에 해당하는 최신 게시물 가져오기
	    List<NoticePost> noticePosts = adminService.getNoticePostList(noticePostCategoryNo);
	    return new ResponseEntity<>(noticePosts, HttpStatus.OK);
	}

	@GetMapping("getNoticePostListByCategoryNo")
	public ResponseEntity<List<NoticePost>> getNoticePostListByCategoryNo(
	        @RequestParam("noticePostCategoryNo") int noticePostCategoryNo,
	        @RequestParam(value = "lastPostId", required = false) int lastPostId) throws Exception {
	    // 해당 카테고리 번호와 lastPostId에 해당하는 게시물 가져오기
	    List<NoticePost> noticePosts = adminService.getNoticePostListByCategoryNo(noticePostCategoryNo, lastPostId);
	    System.out.println(noticePosts+"ㅇㅇ 진짜잘나오나 보러옴");
	    return new ResponseEntity<>(noticePosts, HttpStatus.OK);
	}
	
	@GetMapping("getLatestPostId")
	public ResponseEntity<Integer> getLatestPostId() throws Exception {
	    Integer latestPostId = adminService.getLatestPostId();
	    System.out.println("저 막번인데 뽑혔어요 "+latestPostId);
	    if (latestPostId == null) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } else {
	        return new ResponseEntity<>(latestPostId, HttpStatus.OK);
	    }
	}
	
	@GetMapping("searchNoticePost")
	public List<NoticePost> searchNoticePost(@RequestParam("searchKeyword") String searchKeyword, @RequestParam("searchCategoryNo") int searchCategoryNo) throws Exception {
		System.out.println("서버로부터 날라온 키워드"+searchKeyword);
		System.out.println("서버로부터 날라온 남바"+searchCategoryNo);
	    String decodedKeyword = URLDecoder.decode(searchKeyword, "UTF-8");
	    return adminService.searchNoticePost(decodedKeyword, searchCategoryNo);
	}
	
	@GetMapping("getLatestPostByCategoryNo")
	public ResponseEntity<List<NoticePost>> getLatestPostByCategoryNo(@RequestParam("lastPostId") int lastPostId, @RequestParam("noticePostCategoryNo") int noticePostCategoryNo) throws Exception {
		System.out.println("wow yochung coming"+ lastPostId+": 공백임 : " +noticePostCategoryNo);
		List<NoticePost> noticePosts = adminService.getLatestPostByCategoryNo(lastPostId, noticePostCategoryNo);
		System.out.println(noticePosts+"결과 보여주세요!");
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

		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
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
	
	@GetMapping("searchBlackList")
	public List<User> searchBlackList(@RequestParam("searchKeyword") String searchKeyword) throws Exception {
	    System.out.println("서버로부터 날라온 키워드"+searchKeyword);
	    String decodedKeyword = URLDecoder.decode(searchKeyword, "UTF-8");
	    return adminService.searchBlackList(decodedKeyword);
	}
	
	@GetMapping("searchUser")
	public List<User> searchUser(String searchKeyword) throws Exception {
		System.out.println("서버로부터 날라온 키워드"+searchKeyword);
	    String decodedKeyword = URLDecoder.decode(searchKeyword, "UTF-8");
	    return adminService.searchUser(decodedKeyword);
	}
/*
	@GetMapping("getUserList")
	public ResponseEntity<List<User>> getUserList(@RequestParam int lastUserNo) throws Exception {
		List<User> users = adminService.getUserList(lastUserNo);
		return ResponseEntity.ok(users);
	}
	*/
	@GetMapping("getUserList")
	public List<User> getUserList(@RequestParam int lastUserNo) throws Exception {
        return adminService.getUserList(lastUserNo);
    }
	@GetMapping("getUser/userNo/{userNo}")
	public ResponseEntity<User> getUser(@PathVariable int userNo) throws Exception {
		User user = adminService.getUser(userNo);
		return ResponseEntity.ok(user);
	}

	@PostMapping("toggleBlackList/{userNo}")
	public ResponseEntity<String> toggleBlackList(@PathVariable int userNo) {
		try {
			User user = adminService.getUser(userNo);
			int blacklistStatus = user.getBlacklist();

			if (blacklistStatus == 1 || blacklistStatus == 2) {
				user.setBlacklist(0);
				adminService.deleteBlackList(userNo);
				return ResponseEntity.ok("블랙리스트에서 제거되었습니다.");
			} else if (blacklistStatus == 0) {
				user.setBlacklist(2);
				adminService.addBlackList(userNo);
				return ResponseEntity.ok("블랙리스트에 추가되었습니다.");
			} else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("신고 누적으로 블랙리스트에 등록된 사용자는 변경할 수 없습니다.");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("블랙리스트 변경 중 오류가 발생했습니다.");
		}
	}
/*
	@GetMapping("getBlackListList")
	public ResponseEntity<List<User>> getBlackListList(@RequestParam int lastUserNo) {
		System.out.println("hi it is blackList");
		try {
			List<User> blacklist = adminService.getBlackListList(lastUserNo);
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
	*/
	@GetMapping("getBlackListList")
	public List<User> getBlackListList(@RequestParam int lastUserNo) throws Exception {
        return adminService.getBlackListList(lastUserNo);
    }
	
	@GetMapping("getLatestUserNo")
    public int getLatestUserNo() throws Exception {
        return adminService.getLatestUserNo();
    }
	
	@GetMapping("getBlackList/{userNo}")
	public ResponseEntity<User> getBlacklist(@PathVariable int userNo) throws Exception {
		User user = adminService.getBlackList(userNo);
		return ResponseEntity.ok(user);
	}

	// 신고게시판
//	@GetMapping("getReportAdmin/{reportedNo}")
//	public ResponseEntity<List<Report>> getReportAdmin(@PathVariable int reportedNo) throws Exception {
//		List<Report> reports = adminService.getReportAdmin(reportedNo);
//		return ResponseEntity.ok(reports);
//	}

	@GetMapping("getReportAdminList")
	public ResponseEntity<List<Report>> getReportList(@RequestParam("userNo") int userNo,
			@RequestParam("role") int role) {
		try {
			List<Report> reports = adminService.getReportList(userNo, role);
			if (!reports.isEmpty()) {
				return ResponseEntity.ok(reports);
			}
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

//	@GetMapping("getReportAdminList")
//	public ResponseEntity<List<Report>> getReportAdminList(@RequestParam(required = false) Integer lastId) throws Exception {
//	    System.out.println("Received lastId: " + lastId);
//	    System.out.println("did u call me??????????????");			
//	    
//	    List<Report> reports = adminService.getReportAdminList();
//
//	    if (!reports.isEmpty()) {
//	        return ResponseEntity.ok(reports);
//	    }
//
//	    return ResponseEntity.notFound().build();
//	}
//	
	@GetMapping("getReportAdmin/reportNo/{reportNo}")
	public Report getReport(@PathVariable("reportNo") int reportNo) throws Exception {

		Report report = adminService.getReport(reportNo);
		System.out.println(":: getReport :: " + report);

		return report;
	}
}
