package com.gaga.bo.service.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.NoticePost;
import com.gaga.bo.service.domain.Report;
import com.gaga.bo.service.domain.User;

@Mapper
public interface AdminDao {

	public void addNoticePost(NoticePost noticePost) throws Exception;

	List<NoticePost> getNoticePostList() throws Exception;

	NoticePost getNoticePost(int noticePostNo) throws Exception;

	void updateNoticePost(NoticePost noticePost) throws Exception;

	void deleteNoticePost(int noticePostNo) throws Exception;
	//기능필요없이 데이터요청하면 수정예정<5/25>
	/* List<NoticePost> searchNoticePost(String keyword); */
	
	//#블랙리스트 
	void addBlackList(int userNo) throws Exception;

	User getBlackList(int userNo) throws Exception;

	List<User> getBlackListList() throws Exception;
	
	//#신고게시판
	List<Report> getReportAdmin(int reportingNo);
	
    List<Report> getReportAdminList();
}