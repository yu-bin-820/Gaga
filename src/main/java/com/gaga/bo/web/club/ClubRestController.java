package com.gaga.bo.web.club;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
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
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.gaga.bo.objectSotrage.S3Uploader;
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
	
	@Autowired
	private ResourceLoader resourceLoader;
	
	@Value("${fileUploadPath}")
	String fileUploadPath;
	
	@Autowired
	@Value("${pageSize}")
	int pageSize;	

	//Constructor
	public ClubRestController() {
		System.out.println(this.getClass());
	}
	
    private S3Uploader s3Uploader;
    
    @Autowired
    public void setS3Uploader(S3Uploader s3Uploader) {
        this.s3Uploader = s3Uploader;
    }
    
    //공간정보포탈 API 호출
    private RestTemplate restTemplate;
	
	//클럽관리
	
	@PostMapping("")
	public int addClub(@ModelAttribute Club club,
				 		   @RequestParam(value = "file", required = false) MultipartFile file
						   ) throws Exception{
		
		System.out.println("클럽 생성 Ctrl");
		
		System.out.println("img변경 전 : "+club);
		
		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			//file.transferTo(new File(uploadDir,"club/"+uuidFileName));
			
			club.setClubImg(uuidFileName);
			
			String fileName = "club/" + uuidFileName;
	        String message = s3Uploader.uploadFiles(file, fileName);
	        System.out.println(message);
		}
		
		System.out.println("img변경 후 : "+club);
		
		int clubNo = clubService.addClub(club);
		
		System.out.println("clubNo : "+clubNo);
		
		return clubNo;
	

	}
	
	/* 파일업로드가 포함 안된 클럽생성
	 * @PostMapping("") public void addClub(@RequestBody Club club) throws
	 * Exception{
	 * 
	 * System.out.println("클럽 생성 Ctrl");
	 * 
	 * clubService.addClub(club); }
	 */
	
	
	@GetMapping("/region/sido")
    public ResponseEntity<String> getSido() {
        String sidoKey = "12685d425f1af0872d756c";
        String sidoUrl = "http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admCodeList.json" + "?authkey=" + sidoKey;

        System.out.println("공간정보포탈 시도 API 호출" + sidoUrl);

        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(sidoUrl).openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder content = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
                }

                in.close();
                connection.disconnect();

                return ResponseEntity.ok(content.toString());
            } else {
                System.out.println("Error: " + responseCode);
                return ResponseEntity.status(responseCode).body("Failed to retrieve Sido information.");
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving Sido information.");
        }
    }
	
	@GetMapping("/region/sigungu/{sido}")
	public ResponseEntity<String> getSigungu(@PathVariable int sido) {
	    String sigunguKey = "b0888bae39fbd0463a9252";
	    String sigunguUrl = String.format("http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admSiList.json?authkey=%s&admCode=%02d", sigunguKey, sido);

	    System.out.println("공간정보포탈 시군구 API 호출: " + sigunguUrl);

	    try {
	        HttpURLConnection connection = (HttpURLConnection) new URL(sigunguUrl).openConnection();
	        connection.setRequestMethod("GET");
	        int responseCode = connection.getResponseCode();

	        if (responseCode == HttpURLConnection.HTTP_OK) {
	            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
	            String inputLine;
	            StringBuilder content = new StringBuilder();

	            while ((inputLine = in.readLine()) != null) {
	                content.append(inputLine);
	            }

	            in.close();
	            connection.disconnect();

	            return ResponseEntity.ok(content.toString());
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
	
	@GetMapping("search")
	public List<Club> getSearchClubList(@RequestParam int page, @RequestParam String searchKeyword) throws Exception{
		
		System.out.println("클럽 목록 검색 Ctrl");
		
		System.out.println("page: " + page);
	    System.out.println("searchKeyword: " + searchKeyword);
		
		 Search search = new Search();
		 search.setCurrentPage(page);
		 search.setSearchKeyword(searchKeyword);
		 search.setPageSize(pageSize);
		    
		 System.out.println("search: " + search);

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
		
		System.out.println("회원이 참여/신청/생성한 클럽 목록 조회 Ctrl");
		
		return clubService.getMyClubList(userNo);
	}
	
	@GetMapping("list/joincreate/{userNo}")
	public List<Club> getMyIngClubList(@PathVariable int userNo) throws Exception{
		
		System.out.println("회원이 참여/생성한 클럽 목록 조회 Ctrl");
		
		return clubService.getMyIngClubList(userNo);
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
	 		   				  @RequestParam(value ="file", required = false) MultipartFile file
							  ) throws Exception{
		
		System.out.println("클럽 정보 수정 Ctrl");
		
		System.out.println("img변경 전 : "+club);
		
		if (file != null) {
			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String uuidFileName = UUID.randomUUID().toString()+ext;
	
			//file.transferTo(new File(uploadDir,"club/"+uuidFileName));
			
			club.setClubImg(uuidFileName);
			String fileName = "club/" + uuidFileName;
	        String message = s3Uploader.uploadFiles(file, fileName);
	        System.out.println(message);
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
