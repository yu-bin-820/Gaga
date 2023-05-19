package com.gaga.bo.service.club.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.club.ClubDao;
import com.gaga.bo.service.club.ClubService;
import com.gaga.bo.service.domain.Club;
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
	  
		  System.out.println("회원의 클럽 목록 조회"); 
		  // TODO Auto-generated method stub return
		  return clubDao.getCreateClubList(clubLeaderNo);
	  
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
	 
	 
}
