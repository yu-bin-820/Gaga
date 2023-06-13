package com.gaga.bo.service.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.NoticePost;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;

@Mapper
public interface AdminDao {

	public void addNoticePost(NoticePost noticePost) throws Exception;

	List<NoticePost> getNoticePostList(int noticePostCategoryNo) throws Exception;
	
	List<NoticePost> getNoticePostListByCategoryNo(int noticePostCategoryNo, int lastPostId) throws Exception;
	
	int getLatestPostId() throws Exception;

	NoticePost getNoticePost(int noticePostNo) throws Exception;

	void updateNoticePost(NoticePost noticePost) throws Exception;

	void deleteNoticePost(int noticePostNo) throws Exception;
	
	List<NoticePost> searchNoticePost(String searchKeyword, int searchCategoryNo) throws Exception;
	
	List<NoticePost> getLatestPostByCategoryNo(int lastPostId, int noticePostCategoryNo) throws Exception;
		
	//#블랙리스트 
	List<User> searchUser(String searchKeyword) throws Exception;
	
	List<User> getUserList(int lastUserNo) throws Exception;
	
	User getUser(int userNo) throws Exception;
	
	void addBlackList(int userNo) throws Exception;
	
	void deleteBlackList(int userNo) throws Exception;
	
	User getBlackList(int userNo) throws Exception;

	List<User> getBlackListList(int lastUserNo) throws Exception;
	
	int getLatestUserNo() throws Exception;
	
	public List<User> searchBlackList(String searchKeyword);
	
	//#신고게시판
	//List<Report> getReportAdmin(int reportingNo) throws Exception;
	
    List<Report> getReportAdminList() throws Exception;
    
    Report getReport(int reportNo) throws Exception;
    
    List<Report> getReportList(int userNo, int role) throws Exception;
}