package com.gaga.bo.service.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.gaga.bo.service.domain.NoticePost;

//@Mapper
public interface AdminDao {
	public void addNoticePost(NoticePost noticePost);
	/*
	 * List<NoticePost> listNoticePost();
	NoticePost getNoticePost(int noticePostNo);

	

	void updateNoticePost(NoticePost noticePost);

	void deleteNoticePost(int noticePostNo);

	List<NoticePost> searchNoticePost(String keyword);*/
}