package com.gaga.bo.service.admin.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaga.bo.service.admin.AdminDao;
import com.gaga.bo.service.admin.AdminService;
import com.gaga.bo.service.domain.Admin;

//@Service
public class AdminPostServiceImpl implements AdminService {

    private final AdminDao noticePostDao;

    @Autowired
    public AdminPostServiceImpl(AdminDao noticePostDao) {
        this.noticePostDao = noticePostDao;
    }

    @Override
    public List<Admin> listNoticePosts() {
        return noticePostDao.listNoticePosts();
    }

    @Override
    public Admin getNoticePost(int noticePostNo) {
        return noticePostDao.getNoticePost(noticePostNo);
    }

    @Override
    public void addNoticePost(Admin noticePost) {
        noticePostDao.addNoticePost(noticePost);
    }

    @Override
    public void updateNoticePost(Admin noticePost) {
        noticePostDao.updateNoticePost(noticePost);
    }

    @Override
    public void deleteNoticePost(int noticePostNo) {
        noticePostDao.deleteNoticePost(noticePostNo);
    }
    
    @Override
    public List<Admin> searchNoticePost(String keyword) {
        return noticePostDao.searchNoticePost(keyword);
    }
}