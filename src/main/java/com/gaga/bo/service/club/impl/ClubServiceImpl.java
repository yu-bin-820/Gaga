package com.gaga.bo.service.club.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.club.ClubDao;
import com.gaga.bo.service.club.ClubService;
import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Filter;
import com.gaga.bo.service.domain.Search;

@Service
public class ClubServiceImpl implements ClubService {

	//Field
	@Autowired
	@Qualifier("clubDao")
	private ClubDao clubDao;

	// Constructor
	public ClubServiceImpl() {
		System.out.println(this.getClass());
		// TODO Auto-generated constructor stub
	}

	@Override
	public int addClub(Club club) throws Exception {

		System.out.println("클럽 생성 서비스");
		
		int a = clubDao.addClub(club);
		
		int clubNo = club.getClubNo();

		System.out.println("a는 뭐야?"+a);
		System.out.println("생성은 잘 됐는지?"+clubNo);
		// TODO Auto-generated method stub

		return clubNo;
	}
	
	 @Override 
	 public Club getClub(int clubNo) throws Exception {
	  
		 System.out.println("클럽 상세 조회 서비스"); 
		 // TODO Auto-generated method stub return
		 return clubDao.getClub(clubNo);
	 }
	  
	  
	  @Override 
	  public List<Club> getCreateClubList(int clubLeaderNo) throws Exception {
	  
		  System.out.println("회원이 생성한 클럽 목록 조회 서비스"); 
		  // TODO Auto-generated method stub return
		  return clubDao.getCreateClubList(clubLeaderNo);
	  
	  }
	  
	@Override
	public List<Club> getSearchClubList(Search search) throws Exception {
		// TODO Auto-generated method stub
		return clubDao.getSearchClubList(search);
	}

	@Override
	public List<Club> getFilterClubList(Filter filter) throws Exception {
			
		System.out.println("클럽 목록 필터적용 서비스");
		// TODO Auto-generated method stub
		return clubDao.getFilterClubList(filter);
	}

	@Override
	public List<Club> getMyClubList(int userNo) throws Exception {
			
		System.out.println("회원이 참여/신청/생성한 클럽 목록 조회 서비스");
		// TODO Auto-generated method stub
		return clubDao.getMyClubList(userNo);
	}
	
	@Override
	public List<Club> getMyIngClubList(int userNo) throws Exception {
			
		System.out.println("회원이 참여/생성한 클럽 목록 조회 서비스");
		// TODO Auto-generated method stub
		return clubDao.getMyIngClubList(userNo);
	}
	  
	@Override
	public List<Club> getMainClubList(int mainCategoryNo) throws Exception {
			
		System.out.println("비회원, 미인증 회원 메인화면 클럽 목록 서비스");
			
		return clubDao.getMainClubList(mainCategoryNo);
	}

	@Override
	public void updateClub(Club club) throws Exception {
	  
		  System.out.println("클럽 정보 수정 서비스");
		  
		  clubDao.updateClub(club);
	  
	}

	@Override
	public void updateParentClubNoToNull(int clubNo) throws Exception {
		
		System.out.println("부모클럽번호 수정 서비스");
		
		clubDao.updateParentClubNoToNull(clubNo);
		
	}

	@Override
	public void deleteClub(int clubNo) throws Exception {
		
		System.out.println("클럽 삭제 서비스");
		
		clubDao.deleteClub(clubNo);
		
	}

	@Override
	public void addClubMember(Map<String, Integer> map) throws Exception {
		
		System.out.println("클럽 참여 신청 서비스");
		// TODO Auto-generated method stub
		clubDao.addClubMember(map);
		
	}

	@Override
	public void updateClubMember(Map<String, Integer> map) throws Exception {
		
		System.out.println("클럽 참여 신청 멤버 상태 변경 서비스");
		// TODO Auto-generated method stub
		clubDao.updateClubMember(map);
		
	}

	@Override
	public void deleteClubMember(Map<String, Integer> map) throws Exception {
		
		System.out.println("클럽 참여 멤버 제거 서비스");
		// TODO Auto-generated method stub
		clubDao.deleteClubMember(map);
		
	}

	//대분류, 소분류는 미팅에서 가져오기
}
