package com.gaga.bo.service.club.test;

import static org.junit.Assert.assertNotNull;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.gaga.bo.service.club.ClubService;
import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Filter;

@SpringBootTest
public class ClubServiceTest {
	
	//Field
	@Autowired
	@Qualifier("clubServiceImpl")
	ClubService clubService;
	
	//@Test
	public void addClubTest() throws Exception{
		
		Club club = new Club();
		
		club.setClubNo(5);
		club.setClubName("test55"); 
		club.setClubLeaderNo(3);
		club.setClubIntro("test55");
		club.setClubRegDate(LocalDateTime.now()); 
		club.setClubState(0);
		club.setClubImg("testImg55"); 
		club.setClubRegion("test55");
		club.setFilterGender(0); 
		club.setFilterMinAge(55); 
		club.setFilterMaxAge(60);
		club.setFilterTag("탁구");
		club.setMainCategoryNo(1); 
		 
		clubService.addClub(club);

	}
	
	//@Test
	public void getClubTest() throws Exception{
		
		Club club = new Club();
		
		club = clubService.getClub(1);
		
		System.out.println(club.toString());

	}
	
	//@Test
	public void getCreateClubListTest() throws Exception{
		
		List<Club> clubList = clubService.getCreateClubList(3);
		
		assertNotNull(clubList);
		
		for(Club club : clubList) {
			System.out.println(club);
		}	
	}
	
	
	//@Test  //=> 필터적용 후 검색되는지 다시 확인
	public void getSearchClubListTest() throws Exception{
		
		Filter filter = new Filter();
		
		//filter.setMainCategoryNo(1);
		
		List<Club> clubList = clubService.getSearchClubList(filter);
	
		System.out.println("검색 결과 출력 시작");
		if (clubList != null) {
		    for (Club club : clubList) {
		        System.out.println(club);
		    }
		} else {
		    System.out.println("출력할 정보가 없습니다.");
		}
		
		System.out.println("검색 결과 출력 끝");

	}
	
	//@Test
	public void getMyClubListTest() throws Exception{
		
		List<Club> clubList = clubService.getMyClublist(2);
		
		for(Club club : clubList) {
			System.out.println(club);
		}
		
	}
	
	//@Test
	public void updateClubTest() throws Exception{
		
		Club club = new Club();
		
		//업데이트 전
		club = clubService.getClub(1);
		
		club.setClubIntro("change");
		club.setClubMaxMemberNo(100);
		club.setClubImg("changeImg");
		club.setClubRegion("change");
		
		clubService.updateClub(club);
		
		System.out.println(club.toString());
	}
	
	//@Test
	public void deleteClubTest() throws Exception{
		clubService.deleteClub(1);
		System.out.println("삭제는 잘 되었니" + clubService.getClub(1));	
		
	}
	
	//@Test
	public void addClubMemberTest() throws Exception{
		
		Map<String, String> map = new HashMap<>();
		map.put("userNo", "2");
		map.put("clubNo", "3");
		
		clubService.addClubMember(map);
		
	}
	
	//@Test
	public void updateClubMemberTest() throws Exception{
		
		Map<String, String> map = new HashMap<>();
		map.put("clubNo", "3");
		map.put("userNo", "2");
		
		clubService.updateClubMember(map);
		
	}
	
	@Test
	public void deleteClubMember() throws Exception{
		
		clubService.deleteClubMember(2);
	}

	
	

}
