package com.gaga.bo.service.club;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Filter;

public interface ClubService {
	
	//클럽관리
	//클럽 생성
	public void addClub(Club club) throws Exception;
	
	//클럽 상세 조회 
	public Club getClub(int clubNo) throws Exception;
	  
	//회원이 생성한 클럽 목록 조회 
	public List<Club> getCreateClubList(int clubLeaderNo) throws Exception;
	
	//클럽 검색시 클럽 목록 조회
	public List<Club> getSearchClubList(Filter filter) throws Exception;
	
	//회원이 참여한 클럽 목록 조회
	public List<Club> getMyClublist(int userNo) throws Exception;
	  
	//클럽 정보 수정 
	public void updateClub(Club club) throws Exception;
	
	//클럽 삭제
	public void deleteClub(int clubNo) throws Exception;
	
	//멤버관리
	//클럽 참여 신청
	public void addClubMember(Map<String, String> map) throws Exception;
	
	//클럽 멤버 정보 수정
	public void updateClubMember(Map<String, String> map) throws Exception;
	
	//클럽 멤버 삭제
	public void deleteClubMember(int memberNo) throws Exception;
	
	//카테고리관리
	//카테고리 대분류
	public List<HashMap<Integer, String>> getMainCategory() throws Exception;
	
	//카테고리 소분류
	public List<HashMap<Integer, String>> getSubCategory(int mainCatedoryNo) throws Exception;		
	
}
