package com.gaga.bo.service.club.test;

import static org.junit.Assert.assertNotNull;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
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
		
		//club.setClubNo(1);
		club.setClubName("test11"); 
		club.setClubLeaderNo(5);
		club.setClubIntro("test11");
		club.setClubRegDate(LocalDateTime.now()); 
		club.setClubState(0);
		club.setClubImg("testImg11"); 
		club.setClubRegion("test11");
		club.setFilterGender(0); 
		club.setFilterMinAge(55); 
		club.setFilterMaxAge(60);
		club.setFilterTag("탁구");
		club.setMainCategoryNo(1); 
		 
		clubService.addClub(club);

	}
	
	//@Test
	public void getClubTest() throws Exception{
		System.out.println("결과내놔11");
		Club club = new Club();
		
		club = clubService.getClub(10);
		System.out.println("결과내놔22");
		System.out.println("결과내놔33");

		System.out.println("출력이 되는가"+club);
		
	}
	
	//@Test
	public void getCreateClubListTest() throws Exception{
		
		List<Club> clubList = clubService.getCreateClubList(3);
		
		assertNotNull(clubList);
		
		for(Club club : clubList) {
			System.out.println(club);
		}	
	}
	
	
	//@Test
	public void getSearchClubListTest() throws Exception{
		
		Filter filter = new Filter();
		
		filter.setMainCategoryNo(1);
		filter.setMaxAge(100);
		filter.setMinAge(10);
		filter.setGender(0);
		filter.setAge(57);
		filter.setTag("축구");
		
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
		
		List<Club> clubList = clubService.getMyClublist(4);
		
		System.out.println("클럽리스트 결과 출력 시작");
		if (clubList != null) {
		    for (Club club : clubList) {
		        System.out.println(club);
		    }
		} else {
		    System.out.println("출력할 정보가 없습니다.");
		}
		
		System.out.println("클럽리스트 결과 출력 끝");
		
	}
	
	//@Test
	public void getMainClubList() throws Exception{
		
		List<Club> clubList = clubService.getMainClubList(1);
		
		for(Club club : clubList) { 
			
			System.out.println(club); 
		}
	}
	
	
	//@Test
	public void updateClubTest() throws Exception{
		
		Club club = new Club();
		
		//업데이트 전
		club = clubService.getClub(10);
		
		club.setClubIntro("change");
		club.setClubMaxMemberNo(100);
		club.setClubImg("changeImg");
		club.setClubRegion("change");
		
		clubService.updateClub(club);
		
		System.out.println(club.toString());
	}
	
	//@Test
	public void deleteClubTest() throws Exception{
		clubService.deleteClub(10);
		System.out.println("삭제는 잘 되었니" + clubService.getClub(10));	
		
	}
	
	//@Test
	public void addClubMemberTest() throws Exception{
		
		Map<String, String> map = new HashMap<>();
		map.put("userNo", "7");
		map.put("clubNo", "7");
		
		clubService.addClubMember(map);
		
	}
	
	//@Test
	public void updateClubMemberTest() throws Exception{
		
		Map<String, String> map = new HashMap<>();
		map.put("clubNo", "7");
		map.put("userNo", "7");
		
		clubService.updateClubMember(map);
		
	}
	
	//@Test
	public void deleteClubMember() throws Exception{
		
		Map<String, String> map = new HashMap<>();
		map.put("clubNo", "7");
		map.put("userNo", "7");
		
		clubService.deleteClubMember(map);
	}

	
	

}
