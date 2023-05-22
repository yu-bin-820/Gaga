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
import com.gaga.bo.service.payment.PaymentDao;

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
	public void addClub(Club club) throws Exception {

		System.out.println("클럽 생성");
		clubDao.addClub(club);

		// TODO Auto-generated method stub

	}
	
	 @Override 
	 public Club getClub(int clubNo) throws Exception {
	  
		 System.out.println("클럽 상세 조회"); 
		 // TODO Auto-generated method stub return
		 return clubDao.getClub(clubNo);
	 }
	  
	  
	  @Override 
	  public List<Club> getCreateClubList(int clubLeaderNo) throws Exception {
	  
		  System.out.println("회원이 생성한 클럽 목록 조회"); 
		  // TODO Auto-generated method stub return
		  return clubDao.getCreateClubList(clubLeaderNo);
	  
	  }
	  
		@Override
		public List<Club> getSearchClubList(Filter filter) throws Exception {
			
			System.out.println("클럽 목록 검색");
			// TODO Auto-generated method stub
			return clubDao.getSearchClubList(filter);
		}

		@Override
		public List<Club> getMyClublist(int userNo) throws Exception {
			System.out.println("회원이 참여한 클럽 목록 조회");
			// TODO Auto-generated method stub
			return clubDao.getMyClubList(userNo);
		}
	  
	  @Override
	  public void updateClub(Club club) throws Exception {
	  
		  System.out.println("클럽 정보 수정");
		  
		  clubDao.updateClub(club);
	  
	  }

	@Override
	public void deleteClub(int clubNo) throws Exception {
		
		System.out.println("클럽 삭제");
		
		clubDao.deleteClub(clubNo);
		// TODO Auto-generated method stub
		
	}


	@Override
	public void addClubMember(Map<String, String> map) throws Exception {
		
		System.out.println("클럽 참여 신청");
		// TODO Auto-generated method stub
		clubDao.addClubMember(map);
		
	}

	@Override
	public void updateClubMember(Map<String, String> map) throws Exception {
		
		System.out.println("클럽 신청 멤버 상태 변경");
		// TODO Auto-generated method stub
		clubDao.updateClubMember(map);
		
	}

	@Override
	public void deleteClubMember(int memberNo) throws Exception {
		
		System.out.println("클럽 참여 멤버 제거");
		// TODO Auto-generated method stub
		clubDao.deleteClubMember(memberNo);
		
	}

	@Override
	public List<HashMap<Integer, String>> getMainCategory() throws Exception {
		
		System.out.println("대분류 카테고리 불러오기");
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<HashMap<Integer, String>> getSubCategory(int mainCatedoryNo) throws Exception {
		
		System.out.println("소분류 카테고리 불러오기");
		// TODO Auto-generated method stub
		return null;
	}
	 
	 
}
