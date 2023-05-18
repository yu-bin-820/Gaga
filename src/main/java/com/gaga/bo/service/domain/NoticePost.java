package com.gaga.bo.service.domain;


import java.time.LocalDateTime;

public class NoticePost {
	//field
    private int noticePostNo;
    private int noticePostCategoryNo;
    private String noticePostTitle;
    private String noticePostText;
    private String noticePostImg;
    private LocalDateTime noticePostRegDate;
    private int userNo;

    //constructor
    public NoticePost() {}

    // 모든 필드를 포함하는 생성자
    public NoticePost(int noticePostNo, int noticePostCategoryNo, String noticePostTitle, String noticePostText, 
                      String noticePostImg, LocalDateTime noticePostRegDate, int userNo) {
        this.noticePostNo = noticePostNo;
        this.noticePostCategoryNo = noticePostCategoryNo;
        this.noticePostTitle = noticePostTitle;
        this.noticePostText = noticePostText;
        this.noticePostImg = noticePostImg;
        this.noticePostRegDate = noticePostRegDate;
        this.userNo = userNo;
    }

	public int getNoticePostNo() {
		return noticePostNo;
	}

	public void setNoticePostNo(int noticePostNo) {
		this.noticePostNo = noticePostNo;
	}

	public int getNoticePostCategoryNo() {
		return noticePostCategoryNo;
	}

	public void setNoticePostCategoryNo(int noticePostCategoryNo) {
		this.noticePostCategoryNo = noticePostCategoryNo;
	}

	public String getNoticePostTitle() {
		return noticePostTitle;
	}

	public void setNoticePostTitle(String noticePostTitle) {
		this.noticePostTitle = noticePostTitle;
	}

	public String getNoticePostText() {
		return noticePostText;
	}

	public void setNoticePostText(String noticePostText) {
		this.noticePostText = noticePostText;
	}

	public String getNoticePostImg() {
		return noticePostImg;
	}

	public void setNoticePostImg(String noticePostImg) {
		this.noticePostImg = noticePostImg;
	}

	public LocalDateTime getNoticePostRegDate() {
		return noticePostRegDate;
	}

	public void setNoticePostRegDate(LocalDateTime noticePostRegDate) {
		this.noticePostRegDate = noticePostRegDate;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	@Override
	public String toString() {
		return "NoticePost [noticePostNo=" + noticePostNo + ", noticePostCategoryNo=" + noticePostCategoryNo
				+ ", noticePostTitle=" + noticePostTitle + ", noticePostText=" + noticePostText + ", noticePostImg="
				+ noticePostImg + ", noticePostRegDate=" + noticePostRegDate + ", userNo=" + userNo + "]";
	}

}