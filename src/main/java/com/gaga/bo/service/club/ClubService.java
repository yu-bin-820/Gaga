package com.gaga.bo.service.club;

import java.util.List;
import com.gaga.bo.service.domain.Club;

public interface ClubService {
	
	//클럽 생성
	public void addClub(Club club) throws Exception;
	
	//클럽 상세 조회 
	public Club getClub(int clubNo) throws Exception;
	  
	//회원이 생성한 클럽 목록 조회 
	public List<Club> getCreateClubList(int clubLeaderNo) throws Exception;
	  
	//클럽 정보 수정 
	public void updateClub(Club club) throws Exception;
	
	//클럽 삭제
	public void deleteClub(int clubNo) throws Exception;	 

}
