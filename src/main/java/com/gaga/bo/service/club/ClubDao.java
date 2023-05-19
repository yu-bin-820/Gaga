package com.gaga.bo.service.club;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.gaga.bo.service.domain.Club;

@Mapper
public interface ClubDao {
	
	//클럽관리
	//INSERT
	public void addClub(Club club) throws Exception;

	//SELECT ONE 
	public Club getClub(int clubNo) throws Exception;
	  
	//SELECT LIST 회원이 생성한 클럽 목록 조회 
	public List<Club> getClubList(int clubLeaderNo) throws Exception;
	  
	//UPDATE 
	public void updateClub(Club club) throws Exception;
	
	//DELETE
	public void deleteClub(int clubNo) throws Exception;
	 

}
