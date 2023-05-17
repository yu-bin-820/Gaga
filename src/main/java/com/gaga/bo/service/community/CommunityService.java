package com.gaga.bo.service.community;

import java.util.List;
import java.util.Map;

import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.ReportCategory;
import com.gaga.bo.service.domain.UserReview;

public interface CommunityService {
	 public Report getReport(int reportNo);
	 
	 public void addReport(Report report);
	   
	   public Report getReportByUserNo(Map<String,Integer> reportingNoReportedNo);

	   public void deleteReport(int reportNo);

	   public void updateReport(Report report);

	   public void addUserReview(UserReview userReview);

	   public UserReview getUserReview(int userReviewNo);

	   public void deleteUserReview(int userReviewNo);

	   public void updateUserReview(UserReview userReview);
	   
	   public ReportCategory getReportCategory();
	   
	   List<ReportCategory> getReportCategoryList();
}
