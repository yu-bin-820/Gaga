package com.gaga.bo.web.meeting;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
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

import com.gaga.bo.objectSotrage.S3Uploader;
import com.gaga.bo.service.domain.Filter;
import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.MeetingReview;
import com.gaga.bo.service.domain.Search;
import com.gaga.bo.service.meeting.MeetingService;
import com.gaga.bo.service.user.UserService;

@RestController
@RequestMapping("/rest/meeting")
public class MeetingRestController {
	
	///Field
	@Autowired
	@Qualifier("meetingServiceImpl")
	private MeetingService meetingService;
	
	
	@Autowired
	@Qualifier("userServiceImpl")
	private UserService userService;
	
	@Autowired
	private ResourceLoader resourceLoader;
	
	@Value("${fileUploadPath}")
	String fileUploadPath;
	
	@Autowired
	@Value("${pageSize}")
	int pageSize;
	
	public MeetingRestController() {
		System.out.println(this.getClass());
	}
	
    private S3Uploader s3Uploader;
    
    @Autowired
    public void setS3Uploader(S3Uploader s3Uploader) {
        this.s3Uploader = s3Uploader;
    }
	
	
	//미팅관련
	@GetMapping("no/{meetingNo}")
	public Meeting getMeeting( @PathVariable int meetingNo) throws Exception{
		//System.out.println(meetingNo);
		return meetingService.getMeeting(meetingNo);
	}
	
	//test 미완료
	@GetMapping("list/clubno/{clubNo}")
	public List<Meeting> getMeetingListFromParentClubNo(@PathVariable int clubNo) throws Exception{
		
		return meetingService.getMeetingListFromParentClubNo(clubNo);
	}
	
	@GetMapping("list/inchat/no/{userNo}")
	public List<Meeting> getMeetingListInChat(@PathVariable int userNo) throws Exception{
		
		return meetingService.getMeetingListInChat(userNo);
	}
	
	@PostMapping("list")
	public List<Meeting> getMeetingList(@RequestBody Filter filter) throws Exception{
		
		System.out.println(filter);
		
		List<Meeting> list = meetingService.getMeetingList(filter);
		return list;
	}
	
	@PostMapping("search")
	public List<Meeting> getMeetingListByKeyword(@RequestBody Search search) throws Exception{
				
		if(search.getCurrentPage() ==0 ){
			search.setCurrentPage(1);
		}
		
		System.out.println("searchmeeting : " + search);
		
		search.setPageSize(pageSize);
		
		System.out.println(search.getStartRowNum());
		
		System.out.println("searchmeeting : " + search);

		
		List<Meeting> list = meetingService.getMeetingListByKeyword(search);
//		System.out.println(list);
		return list;
	}
	
	@PatchMapping("")
	public void updateMeeting(@ModelAttribute Meeting meeting,
	 		   				  @RequestParam(value = "file", required = false) MultipartFile file
							  ) throws Exception{
		
		
		System.out.println("img변경 전 : "+meeting);
		
		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;

//			file.transferTo(new File(uploadDir,"/meeting/"+uuidFileName));
		
			meeting.setMeetingImg(uuidFileName);
			String fileName = "meeting/" + uuidFileName;
	        String message = s3Uploader.uploadFiles(file, fileName);
	        System.out.println(message);
		}
		
		System.out.println("img변경 후 : "+meeting);
		
		meetingService.updateMeeting(meeting);
	}
	
	@PatchMapping("meetingsuccess")
	public void updateMeetingSuccess(@RequestBody Meeting meeting) throws Exception{
		meetingService.updateMeetingSuccess(meeting);
	}
	
	@PostMapping("")
	public void addMeeting(@ModelAttribute Meeting meeting,
				 		   @RequestParam(value = "file", required = false) MultipartFile file
						   ) throws Exception{

		System.out.println("img변경 전 : "+meeting);
		
		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;

//			file.transferTo(new File(uploadDir,"/meeting/"+uuidFileName));
		
			meeting.setMeetingImg(uuidFileName);
			String fileName = "meeting/" + uuidFileName;
	        String message = s3Uploader.uploadFiles(file, fileName);
	        System.out.println(message);
		}

		
		System.out.println("img변경 후 : "+meeting);
		

		meetingService.addMeeting(meeting);

	}
	
	@PatchMapping("delete")
	public void deleteMeeting(@RequestBody Meeting meeting)throws Exception{
		System.out.println("delete"+meeting);
		meetingService.deleteMeeting(meeting.getMeetingNo());
	}
	
	
	//멤버관련
	@GetMapping("list/mymeeting/{userNo}")
	public List<Meeting> getMyMeetingList(@PathVariable int userNo ) throws Exception{
		
		System.out.println("list/mymeeting");
		return meetingService.getMyMeetingList(userNo);
	}
	
	@PostMapping("member")
	public void addMember(@RequestBody Map<String, String> requestParams) throws Exception{
		
		meetingService.addMeetingMember(requestParams);
	}
	
	@PatchMapping("member")
	public void updateMember(@RequestBody Map<String, String> requestParams) throws Exception{
		
		meetingService.updateMember(requestParams);
	}
	
	@DeleteMapping("member")
	public void deleteMember(@RequestBody Map<String, String> requestParams) throws Exception{
		
		meetingService.deleteMeetingMember(requestParams);
	}
	
	//미팅리뷰관련
	@PostMapping("review")
	public void addMeetingReview(@ModelAttribute MeetingReview meetingReview,
			  					 @RequestParam(value = "file", required = false) MultipartFile file
								) throws Exception{
		
		System.out.println("img변경 전 : "+meetingReview);


		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;

//			file.transferTo(new File(uploadDir,"/meeting/"+uuidFileName));
		
			meetingReview.setMeetingReviewImg(uuidFileName);
			String fileName = "meeting/" + uuidFileName;
	        String message = s3Uploader.uploadFiles(file, fileName);
	        System.out.println(message);
		}
		
		System.out.println("img변경 후 : "+meetingReview);

        meetingService.addMeetingReview(meetingReview);
        

	}
	
	@GetMapping("review/{meetingNo}")
	public List<MeetingReview> getMeetingReviewList(@PathVariable int meetingNo) throws Exception {
		
		return meetingService.getMeetingReviewList(meetingNo);
	}
	
	@GetMapping("review/no/{meetingReviewNo}")
	public MeetingReview getMeetingReview(@PathVariable int meetingReviewNo) throws Exception{
		
		return meetingService.getMeetingReview(meetingReviewNo);
		
	}
	
	@PatchMapping("review")
	public void updateMeetingReview(@ModelAttribute MeetingReview meetingReview,
				 					@RequestParam(value = "file", required = false) MultipartFile file
				 					) throws Exception {
		
		System.out.println("img변경 전 : "+meetingReview);

		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;

//			file.transferTo(new File(uploadDir,"/meeting/"+uuidFileName));
		
			meetingReview.setMeetingReviewImg(uuidFileName);
			String fileName = "meeting/" + uuidFileName;
	        String message = s3Uploader.uploadFiles(file, fileName);
	        System.out.println(message);
		}
		
		System.out.println("img변경 후 : "+meetingReview);
		
		meetingService.updateMeetingReview(meetingReview);
	}
	
	@DeleteMapping("review")
	public void deleteMeetingReview(@RequestBody MeetingReview meetingReview) throws Exception{
		
		meetingService.deleteMeetingReview(meetingReview.getMeetingReviewNo());
	}
	
	
	//카테고리관련
	@GetMapping("maincategory")
	public List getMainCategoryList() throws Exception {
		System.out.println("meeting.getmaincategory : Get");
		
		return meetingService.getMainCategory();
	}
	
	@GetMapping("subcategory")
	public List getSubCategoryList() throws Exception {
		System.out.println("meeting.getsubcategory : Get");
		
		return meetingService.getSubCategory();
	}
	

}
