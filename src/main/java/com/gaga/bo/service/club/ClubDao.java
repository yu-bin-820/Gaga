package com.gaga.bo.service.club;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import com.gaga.bo.service.domain.Club;
import com.gaga.bo.service.domain.Filter;

@Mapper
public interface ClubDao {
	
	//클럽관리
	//INSERT
	public void addClub(Club club) throws Exception;

	//SELECT ONE 
	public Club getClub(int clubNo) throws Exception;
	  
	//SELECT LIST 회원이 생성한 클럽 목록 조회 
	public List<Club> getCreateClubList(int clubLeaderNo) throws Exception;
	
	//SELECT LIST 클럽 검색시 클럽 목록 조회
	public List<Club> getSearchClubList(Filter filter) throws Exception;
	
	//SELECT LIST 내가 참여한 클럽 목록 조회
	public List<Club> getMyClubList(int userNo) throws Exception;
	  
	//UPDATE 
	public void updateClub(Club club) throws Exception;
	
	//DELETE
	public void deleteClub(int clubNo) throws Exception;
	
	//멤버관리
	
	//INSERT
	public void addClubMember(Map<String, String> map) throws Exception;
	
	//UPDATE
	public void updateClubMember(Map<String, String> map) throws Exception;
	
	//DELETE
	public void deleteClubMember(int memberNo) throws Exception;
		
	//카테고리
	//SELECT
	public List<HashMap<Integer, String>> getMainCategory() throws Exception;
	
	public List<HashMap<Integer, String>> getSubCategory() throws Exception;

}
