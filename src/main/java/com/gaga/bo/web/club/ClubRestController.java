package com.gaga.bo.web.club;

import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.gaga.bo.service.club.ClubService;
import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Filter;
import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Search;

@RestController
@RequestMapping("rest/club")
public class ClubRestController {
	
	//Field
	@Autowired
	@Qualifier("clubServiceImpl")
	private ClubService clubService;
	
	@Value("${fileUploadPath}")
	String fileUploadPath;
	
	@Value("${pageSize}")
	int pageSize;	

	//Constructor
	public ClubRestController() {
		System.out.println(this.getClass());
	}
	
	//클럽관리
	
	@PostMapping("")
	public void addClub(@ModelAttribute Club club,
				 		   @RequestParam(value = "file", required = false) MultipartFile file
						   ) throws Exception{
		
		System.out.println("클럽 생성 Ctrl");
		
		System.out.println("img변경 전 : "+club);
		
		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file.transferTo(new File(fileUploadPath+"\\club\\"+uuidFileName));
			
			club.setClubImg(uuidFileName);
		}
		
		System.out.println("img변경 후 : "+club);
		

		clubService.addClub(club);

	}
	
	/* 파일업로드가 포함 안된 클럽생성
	 * @PostMapping("") public void addClub(@RequestBody Club club) throws
	 * Exception{
	 * 
	 * System.out.println("클럽 생성 Ctrl");
	 * 
	 * clubService.addClub(club); }
	 */
	
	@GetMapping("/region/sigu")
    public ResponseEntity<String> getSiGu() {
	    String key = "CEB52025-E065-364C-9DBA-44880E3B02B8";
	    //String ip = "192.168.0.4"; 
	    String url = "https://api.vworld.kr/req/data?key="+key+"&domain=http://localhost:8080&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIDO_INFO";
	    
	    	
	    System.out.println("시구정보 받아오기 잘됨?" + url);
	    try {
	        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
	        connection.setRequestMethod("GET");
	        int responseCode = connection.getResponseCode();

	        if (responseCode == HttpURLConnection.HTTP_OK) {
	            try (InputStream responseStream = connection.getInputStream()) {
	                byte[] buffer = new byte[1024];
	                StringBuilder responseBuilder = new StringBuilder();
	                int bytesRead;
	                while ((bytesRead = responseStream.read(buffer)) != -1) {
	                    responseBuilder.append(new String(buffer, 0, bytesRead));
	                }
	                System.out.println("성공했을때는 여기야");
	                return ResponseEntity.ok(responseBuilder.toString());
	            }
	        } else {
	            System.out.println("Error: " + responseCode);
	            return ResponseEntity.status(responseCode).body("Failed to retrieve region information.");
	        }
	    } catch (Exception e) {
	        System.out.println("Exception: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving region information.");
	    }
	}
	
	@GetMapping("/region/sigungu/{sigu}")
    public ResponseEntity<String> getSiGunGu(@PathVariable int sigu) {
	    String key = "CEB52025-E065-364C-9DBA-44880E3B02B8";
	    //String ip = "192.168.0.4"; 
	    String url = "https://api.vworld.kr/req/data?key="+key+"&domain=http://localhost:8080&service=data"
	    		+ "&version=2.0&request=getfeature&format=json"
	    		+ "&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857"
	    		+ "&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)"
	    		+ "&data=LT_C_ADSIGG_INFO&attrfilter=sig_cd:like:"+sigu;
	    
	    	
	    System.out.println("시군구 정보 받아오기 잘됨?" + url);
	    try {
	        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
	        connection.setRequestMethod("GET");
	        int responseCode = connection.getResponseCode();

	        if (responseCode == HttpURLConnection.HTTP_OK) {
	            try (InputStream responseStream = connection.getInputStream()) {
	                byte[] buffer = new byte[1024];
	                StringBuilder responseBuilder = new StringBuilder();
	                int bytesRead;
	                while ((bytesRead = responseStream.read(buffer)) != -1) {
	                    responseBuilder.append(new String(buffer, 0, bytesRead));
	                }
	                System.out.println("성공했을때는 여기야");
	                return ResponseEntity.ok(responseBuilder.toString());
	            }
	        } else {
	            System.out.println("Error: " + responseCode);
	            return ResponseEntity.status(responseCode).body("Failed to retrieve region information.");
	        }
	    } catch (Exception e) {
	        System.out.println("Exception: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving region information.");
	    }
	}

	
	@GetMapping("no/{ClubNo}")
	public Club getClub(@PathVariable int ClubNo) throws Exception{
		
		System.out.println("클럽 상세 조회 Ctrl");
		
		return clubService.getClub(ClubNo);
		
	}
	
	
	
	@GetMapping("list/create/{clubLeaderNo}")
	public List<Club> getCreateClubList(@PathVariable int clubLeaderNo) throws Exception{
		
		System.out.println("회원이 생성한 클럽 목록 조회 Ctrl");
		
		return clubService.getCreateClubList(clubLeaderNo);
		
	}
	
	@PostMapping("search")
	public List<Club> getSearchClubList(@RequestBody Search search) throws Exception{
		
		System.out.println("클럽 목록 검색 Ctrl");
		
		if(search.getCurrentPage() ==0 ){
			search.setCurrentPage(1);
		}
		
		System.out.println("searchClub : " + search);
		
		search.setPageSize(pageSize);
		
		System.out.println(search.getStartRowNum());
		
		List<Club> list = clubService.getSearchClubList(search);
		
		System.out.println(list);
		
		return list;
	}
	
	@PostMapping("list/filter")
	public List<Club> getFilterClubList(@RequestBody Filter filter) throws Exception{
		
		System.out.println("클럽 목록 필터적용 Ctrl");
		
		//{ "gender" : 0, "maxAge" : 50, "minAge" : 20, "birthday" : "1994-09-01" }
		
		return clubService.getFilterClubList(filter);
	}
	
	@GetMapping("list/join/{userNo}")
	public List<Club> getMyClubList(@PathVariable int userNo) throws Exception{
		
		System.out.println("회원이 참여한 클럽 목록 조회 Ctrl");
		
		return clubService.getMyClublist(userNo);
	}
	
	@GetMapping("list/nonuser/{mainCategoryNo}")
	public List<Club> getMainClubList(@PathVariable int mainCategoryNo) throws Exception{
		
		System.out.println("비회원, 미인증 회원 메인화면 클럽 목록 Ctrl");
		
		return clubService.getMainClubList(mainCategoryNo);
	}
	
	/* 파일업로드가 포함 안된 클럽수정
	 * @PatchMapping("") public void updateClub(@RequestBody Club club) throws
	 * Exception{
	 * 
	 * System.out.println("클럽 정보 수정 Ctrl");
	 * 
	 * clubService.updateClub(club); }
	 */
	
	@PatchMapping("")
	public void updateClub(@ModelAttribute Club club,
	 		   				  @RequestParam(value = "file", required = false) MultipartFile file
							  ) throws Exception{
		
		System.out.println("클럽 정보 수정 Ctrl");
		
		System.out.println("img변경 전 : "+club);
		
		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			file.transferTo(new File(fileUploadPath+"\\club\\"+uuidFileName));
			
			club.setClubImg(uuidFileName);
		}
		
		System.out.println("img변경 후 : "+club);
		
		clubService.updateClub(club);
	}
	
	@PatchMapping("delete")
	public void deleteClub(@RequestBody Club club) throws Exception{
		
		System.out.println("클럽 삭제 Ctrl");
		
		clubService.deleteClub(club.getClubNo());
	}

	//멤버관리
	@PostMapping("member")
	public void addClubMember(@RequestBody Map<String, Integer> member) throws Exception{
		
		System.out.println("클럽 참여 신청 Ctrl");
		
		clubService.addClubMember(member);
	}
	
	@PatchMapping("member")
	public void updateClubMember(@RequestBody Map<String, Integer> member) throws Exception{
		
		System.out.println("클럽 참여 신청 멤버 상태 변경 Ctrl");
		
		clubService.updateClubMember(member);
	
	}
	
	@DeleteMapping("member")
	public void deleteClubMember(@RequestBody Map<String, Integer> member) throws Exception{
		
		System.out.println("클럽 참여 멤버 제거 Ctrl");
		
		clubService.deleteClubMember(member);
	}

}
