package com.gaga.bo.web.club;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gaga.bo.service.club.ClubService;
import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Filter;

@RestController
@RequestMapping("rest/club")
public class ClubRestController {
	
	//Field
	@Autowired
	@Qualifier("clubServiceImpl")
	private ClubService clubService;
	
	

	//Constructor
	public ClubRestController() {
		System.out.println(this.getClass());
		// TODO Auto-generated constructor stub
	}
	
	//클럽관리
	@PostMapping("")
	public void addClub(@RequestBody Club club) throws Exception{
		
		System.out.println("클럽 생성 Ctrl");
		
		clubService.addClub(club);
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
	
	@PostMapping("list")
	public List<Club> getSearchClubList(@RequestBody Filter filter) throws Exception{
		
		System.out.println("클럽 목록 검색 Ctrl");
		
		return clubService.getSearchClubList(filter);
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
	
	@PatchMapping("")
	public void updateClub(@RequestBody Club club) throws Exception{
		
		System.out.println("클럽 정보 수정 Ctrl");
		
		clubService.updateClub(club);
	}
	
	@DeleteMapping("{clubNo}") //==> 외래키 조건 다시 확인하기
	public void deleteClub(@PathVariable int clubNo) throws Exception{
		
		System.out.println("클럽 삭제 Ctrl");
		
		clubService.updateParentClubNoToNull(clubNo);
		clubService.deleteClub(clubNo);
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
	
	@PostMapping("member/delete")
	public void deleteClubMember(@RequestBody Map<String, Integer> member) throws Exception{
		
		System.out.println("클럽 참여 멤버 제거 Ctrl");
		
		clubService.deleteClubMember(member);
	}

}
