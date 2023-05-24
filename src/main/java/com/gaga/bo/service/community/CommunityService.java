package com.gaga.bo.service.community;

import java.util.List;
import java.util.Map;

import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.ReportCategory;
import com.gaga.bo.service.domain.Title;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.domain.UserReview;

public interface CommunityService {

	//ReportMethod
	public void addReport(Report report) throws Exception;
	
	public Report getReport(int reportNo) throws Exception;
	
	//public Report getReportByUserNo(Map<String,Integer> reportingNoReportedNo);
	
	public List<Report> getReportList(User user) throws Exception;
	
	public void updateReport(Report report) throws Exception;

	public void deleteReport(int reportNo) throws Exception;
//	public ReportCategory getReportCategory();
//	   
//	List<ReportCategory> getReportCategoryList();
//
	
	///ReviewMethod
	public void addUserReview(UserReview userReview) throws Exception;
	
	public UserReview getUserReview(UserReview userReview) throws Exception;

	public void updateUserReview(UserReview userReview) throws Exception;
	
	public void deleteUserReview(UserReview userReview) throws Exception;

	///TitleMethod
	public void addUserEarnedTitle(Map<String,Integer> userNoMainCategoryNoLeaderState) throws Exception;
	
	public List<Title> getUserEarnedTitleList(int userNo) throws Exception;
	   
	

}
