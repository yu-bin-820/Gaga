package com.gaga.bo.service.admin.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.admin.AdminDao;
import com.gaga.bo.service.admin.AdminService;
import com.gaga.bo.service.domain.NoticePost;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	@Qualifier("adminDao")
	AdminDao adminDao;

	/// Constructor()
	public AdminServiceImpl() {
		System.out.println(this.getClass());
	}

	@Override
	public void addNoticePost(NoticePost noticePost) throws Exception {
		adminDao.addNoticePost(noticePost);
		System.out.println(noticePost);

	}

	@Override
	public List<NoticePost> getNoticePostList() throws Exception {
		return adminDao.getNoticePostList();
	}

	@Override
	public List<NoticePost> getNoticePostListByCategoryNo(int noticePostCategoryNo, int lastPostId) throws Exception {
		return adminDao.getNoticePostListByCategoryNo(noticePostCategoryNo, lastPostId);
	}

	@Override
	public int getLatestPostId() throws Exception {
		Integer latestPostId = adminDao.getLatestPostId();
		return latestPostId != null ? latestPostId : 0; // If latestPostId is null, return 0.
	}

	@Override
	public NoticePost getNoticePost(int noticePostNo) throws Exception {
		return adminDao.getNoticePost(noticePostNo);
	}

	@Override
	public void updateNoticePost(NoticePost noticePost) throws Exception {
		adminDao.updateNoticePost(noticePost);
	}

	@Override
	public void deleteNoticePost(int noticePostNo) throws Exception {
		adminDao.deleteNoticePost(noticePostNo);
	}

	@Override
	public List<NoticePost> searchNoticePost(String searchKeyword) throws Exception {
		return adminDao.searchNoticePost(searchKeyword);
	}

	@Override
	public void addBlackList(int userNo) throws Exception {
		adminDao.addBlackList(userNo);

	}

	@Override
	public void deleteBlackList(int userNo) throws Exception {
		adminDao.deleteBlackList(userNo);

	}

	@Override
	public List<User> searchUser(String searchKeyword) throws Exception {
		return adminDao.searchUser(searchKeyword);
	}

	@Override
	public List<User> getUserList(int lastUserNo) throws Exception {
		return adminDao.getUserList(lastUserNo);
	}

	@Override
	public User getUser(int userNo) throws Exception {
		return adminDao.getUser(userNo);
	}

	@Override
	public User getBlackList(int userNo) throws Exception {
		return adminDao.getBlackList(userNo);
	}

	@Override
	public List<User> getBlackListList(int lastUserNo) throws Exception {
	    return adminDao.getBlackListList(lastUserNo);
	}
	
	@Override
	public List<User> searchBlackList(String searchKeyword) {
	    return adminDao.searchBlackList(searchKeyword);
	}
	
	@Override
	public int getLatestUserNo() throws Exception {
	    return adminDao.getLatestUserNo();
	}

//	@Override
//	public List<Report> getReportAdmin(int reportedNo) throws Exception {
//		return adminDao.getReportAdmin(reportedNo);
//	}

//	@Override
//	public List<Report> getReportAdminList() {
//		return adminDao.getReportAdminList();
//	} 

	@Override
	public Report getReport(int reportNo) throws Exception {
		return adminDao.getReport(reportNo);
	}

	@Override
	public List<Report> getReportList(int userNo, int role) throws Exception {
		return adminDao.getReportList(userNo, role);
	}
}