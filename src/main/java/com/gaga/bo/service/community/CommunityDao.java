package com.gaga.bo.service.community;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.ReportCategory;
import com.gaga.bo.service.domain.Title;
import com.gaga.bo.service.domain.UserReview;

//@Mapper
public interface CommunityDao {

   public List<Title> getTitleList(int userNo);

   public void addReport(Report report);

   //TODO User도메인 객체 필요.
   //public List<Report> getReportList(User user);

   public Report getReport(int reportNo);
   
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
