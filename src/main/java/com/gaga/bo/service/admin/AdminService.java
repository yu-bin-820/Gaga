package com.gaga.bo.service.admin;

import java.util.List;

import com.gaga.bo.service.domain.NoticePost;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;

public interface AdminService {
	
	void addNoticePost(NoticePost noticePost) throws Exception;
	
	List<NoticePost> getNoticePostList() throws Exception;
	
	NoticePost getNoticePost(int noticePostNo) throws Exception;

	void updateNoticePost(NoticePost noticePost) throws Exception;

	void deleteNoticePost(int noticePostNo) throws Exception;
	
	//List<NoticePost> searchNoticePost(String keyword);
	
	//블랙리스트 게시판
	void addBlackList(int userNo) throws Exception;
	
	User getBlackList(int userNo) throws Exception;
	
	List<User> getBlackListList() throws Exception;
	
	//신고게시판
	List<Report> getReportAdmin(int reportedNo);
    
	List<Report> getReportAdminList();
    
}