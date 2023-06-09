package com.gaga.bo.service.club;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Filter;
import com.gaga.bo.service.domain.Meeting;
import com.gaga.bo.service.domain.Search;

@Mapper
public interface ClubDao {
	
	//클럽관리
	//INSERT
	public int addClub(Club club) throws Exception;

	//SELECT ONE 
	public Club getClub(int clubNo) throws Exception;
	  
	//SELECT LIST 회원이 생성한 클럽 목록 조회 
	public List<Club> getCreateClubList(int clubLeaderNo) throws Exception;
	
	//SELECT LIST 검색어 클럽 목록 조회
	public List<Club> getSearchClubList(Search search) throws Exception;
	
	//SELECT LIST 필터적용 클럽 목록 조회
	public List<Club> getFilterClubList(Filter filter) throws Exception;
	
	//SELECT LIST 내가 참여/신청/생성한 클럽 목록 조회
	public List<Club> getMyClubList(int userNo) throws Exception;
	
	//SELECT LIST 내가 참여/생성한 클럽 목록 조회
	public List<Club> getMyIngClubList(int userNo) throws Exception;
	
	//SELECT LIST 비회원, 미인증회원 메인화면 클럽 목록
	public List<Club> getMainClubList(int mainCategoryNo) throws Exception;
	
	//UPDATE 
	public void updateClub(Club club) throws Exception;
	
	//UPDATE
	public void updateParentClubNoToNull(int clubNo) throws Exception;
	
	//DELETE
	public void deleteClub(int clubNo) throws Exception;

	//멤버관리
	//INSERT
	public void addClubMember(Map<String, Integer> map) throws Exception;
	
	//SELECT
	//UPDATE
	public void updateClubMember(Map<String, Integer> map) throws Exception;
	
	//DELETE
	public void deleteClubMember(Map<String, Integer> map) throws Exception;
		
	//카테고리 => 미팅에서 가져오기

}
