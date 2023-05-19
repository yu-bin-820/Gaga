package com.gaga.bo.service.admin.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.admin.AdminDao;
import com.gaga.bo.service.admin.AdminService;
import com.gaga.bo.service.domain.NoticePost;

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
	public void addNoticePost(NoticePost noticePost) {
		adminDao.addNoticePost(noticePost);
		System.out.println(noticePost);

	}

	@Override
	public List<NoticePost> listNoticePost() {
		return adminDao.listNoticePost();
	}

	@Override
	public NoticePost getNoticePost(int noticePostNo) {
		return adminDao.getNoticePost(noticePostNo);
	}

	@Override
	public void updateNoticePost(NoticePost noticePost) {
		adminDao.updateNoticePost(noticePost);
	}

	@Override
	public void deleteNoticePost(int noticePostNo) {
		adminDao.deleteNoticePost(noticePostNo);
	}

	//@Override
	//public List<NoticePost> searchNoticePost(String keyword) {
	//	return adminDao.searchNoticePost(keyword);
	//}

}