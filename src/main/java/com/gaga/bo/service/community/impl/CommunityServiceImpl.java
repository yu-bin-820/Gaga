package com.gaga.bo.service.community.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.community.CommunityDao;
import com.gaga.bo.service.community.CommunityService;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.ReportCategory;
import com.gaga.bo.service.domain.UserReview;

//@Service
public class CommunityServiceImpl implements CommunityService {
	
	///field
	//@Autowired
	//@Qualifier("communityDao")
	CommunityDao communityDao;
	
	///Constructor()
	public CommunityServiceImpl() {
		System.out.println(this.getClass());
	}

	@Override
	public Report getReport(int reportNo) {
		return null;
	}

	@Override
	public Report getReportByUserNo(Map<String, Integer> reportingNoReportedNo) {
		return null;
	}

	@Override
	public void deleteReport(int reportNo) {
	}

	@Override
	public void updateReport(Report report) {
	}

	@Override
	public void addUserReview(UserReview userReview) {
	}

	@Override
	public UserReview getUserReview(int userReviewNo) {
		return null;
	}

	@Override
	public void deleteUserReview(int userReviewNo) {
	}

	@Override
	public void updateUserReview(UserReview userReview) {
	}

	@Override
	public ReportCategory getReportCategory() {
		return null;
	}

	@Override
	public List<ReportCategory> getReportCategoryList() {
		return null;
	}

	@Override
	public void addReport(Report report) {
		communityDao.addReport(report);
		System.out.println("addReport");
		System.out.println(report);
	}

}
