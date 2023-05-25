package com.gaga.bo.service.admin;

import java.util.List;

import com.gaga.bo.service.domain.NoticePost;
import com.gaga.bo.service.domain.User;

public interface AdminService {
	
	void addNoticePost(NoticePost noticePost) throws Exception;
	
	List<NoticePost> listNoticePost() throws Exception;
	
	NoticePost getNoticePost(int noticePostNo) throws Exception;

	void updateNoticePost(NoticePost noticePost) throws Exception;

	void deleteNoticePost(int noticePostNo) throws Exception;
	
	//List<NoticePost> searchNoticePost(String keyword);
	
	void addBlackList(int userNo) throws Exception;
	
	User getBlackList(int userNo) throws Exception;
	
	List<User> listBlackList() throws Exception;
	
}