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
import com.gaga.bo.service.domain.Title;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.domain.UserReview;

@Service
public class CommunityServiceImpl implements CommunityService {
	
	///field
	@Autowired
	@Qualifier("communityDao")
	CommunityDao communityDao;
	
	///Constructor()
	public CommunityServiceImpl() {
		System.out.println(this.getClass());
	}

	@Override
	public void addReport(Report report)  throws Exception{
		communityDao.addReport(report);
//		System.out.println("addReport");
//		System.out.println(report);
	}

	//Report method
	@Override
	public Report getReport(int reportNo)  throws Exception{
		return communityDao.getReport(reportNo);
	}

//	@Override
//	public Report getReportByUserNo(Map<String, Integer> reportingNoReportedNo) {
//		return null;
//	}

	@Override
	public List<Report> getReportList(User user) throws Exception {
		return communityDao.getReportList(user);
	}
	
	@Override
	public Report getReportByUserNo(Report report) throws Exception {
		return communityDao.getReportByUserNo(report);
	}
	
	
	@Override
	public void updateReport(Report report) throws Exception {
		communityDao.updateReport(report);
	}


	@Override
	public void deleteReport(int reportNo) throws Exception {
		communityDao.deleteReport(reportNo);
	}

//	@Override
//	public ReportCategory getReportCategory() {
//		return null;
//	}
//
//	@Override
//	public List<ReportCategory> getReportCategoryList() {
//		return null;
//	}

	//ReviewMethod
	@Override
	public void addUserReview(UserReview userReview) throws Exception {
		communityDao.addUserReview(userReview);
	}

	@Override
	public UserReview getUserReview(UserReview userReview) throws Exception {
		return communityDao.getUserReview(userReview);
	}

	@Override
	public void updateUserReview(UserReview userReview) throws Exception {
		communityDao.updateUserReview(userReview);
	}
	
	@Override
	public void deleteUserReview(UserReview userReview) throws Exception {
		communityDao.deleteUserReview(userReview);
	}

	///TitleMethod
	@Override
	public void addUserEarnedTitle(Map<String, Integer> userNoMainCategoryNoLeaderState) throws Exception {
		communityDao.addUserEarnedTitle(userNoMainCategoryNoLeaderState);
	}

	@Override
	public List<Title> getUserEarnedTitleList(int userNo) throws Exception {
		return communityDao.getUserEarnedTitleList(userNo);
	}



}
