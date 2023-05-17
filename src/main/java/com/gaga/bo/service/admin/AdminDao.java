package com.gaga.bo.service.admin;

import java.util.List;

import com.gaga.bo.service.domain.Admin;

public interface AdminDao {
	List<Admin> listNoticePosts();

	Admin getNoticePost(int noticePostNo);

	void addNoticePost(Admin noticePost);

	void updateNoticePost(Admin noticePost);

	void deleteNoticePost(int noticePostNo);

	List<Admin> searchNoticePost(String keyword);
}