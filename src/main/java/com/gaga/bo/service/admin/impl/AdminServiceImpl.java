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
    public List<NoticePost> getNoticePostListByCategory(int noticePostCategoryNo) throws Exception {
        return adminDao.getNoticePostListByCategory(noticePostCategoryNo);
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

	// @Override 리액트로 구현
	// public List<NoticePost> searchNoticePost(String keyword) {
	// return adminDao.searchNoticePost(keyword);
	// }
	@Override
	public void addBlackList(int userNo) throws Exception {
		adminDao.addBlackList(userNo);

	}

	@Override
	public User getBlackList(int userNo) throws Exception {
		return adminDao.getBlackList(userNo);
	}

	@Override
	public List<User> getBlackListList() throws Exception {
		return adminDao.getBlackListList();
	}

	@Override
	public List<Report> getReportAdmin(int reportedNo) {
		return adminDao.getReportAdmin(reportedNo);
	}

	@Override
	public List<Report> getReportAdminList() {
		return adminDao.getReportAdminList();
	} 
}