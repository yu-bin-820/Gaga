package com.gaga.bo.service.community;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.Title;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.domain.UserReview;

@Mapper
public interface CommunityDao {

//   public List<Title> getTitleList(int userNo);
//


//
//   
//   
//	 public Report getReportByUserNo(Map<String,Integer> reportingNoReportedNo);
//
//   public void deleteReport(int reportNo);
//
//   public void updateReport(Report report);
//
//   public void addUserReview(UserReview userReview);
//
//   public UserReview getUserReview(int userReviewNo);
//
//   public void deleteUserReview(int userReviewNo);
//
//   public void updateUserReview(UserReview userReview);
//   
//   public ReportCategory getReportCategory();
//   
//   List<ReportCategory> getReportCategoryList();
	
	///Report Method
	public void addReport(Report report) throws Exception;
	
	public Report getReport(int reportNo) throws Exception;
	
	public Report getReportByUserNo(Report report) throws Exception;
	
	public List<Report> getReportList(User user) throws Exception;
	
	public void updateReport(Report report) throws Exception;
	
	public void deleteReport(int reportNo) throws Exception;
	
	///Review Method
	public void addUserReview(UserReview userReview) throws Exception;
	
	public UserReview getUserReview(UserReview userReview) throws Exception;
	
	public void updateUserReview(UserReview userReview) throws Exception;
	
	public void deleteUserReview(UserReview userReview) throws Exception;
	
	///Title Method
	public void addUserEarnedTitle(Map<String,Integer> userNoMainCategoryNoLeaderState) throws Exception;
	
	public List<Title> getUserEarnedTitleList(int userNo) throws Exception;
}
