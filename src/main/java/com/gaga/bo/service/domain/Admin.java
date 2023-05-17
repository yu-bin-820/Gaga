package com.gaga.bo.service.domain;


import java.util.Date;

public class Admin {
    private int noticePostNo;
    private int noticePostCategoryNo;
    private String noticePostTitle;
    private String noticePostText;
    private String noticePostImg;
    private Date noticePostRegDate;
    private int userNo;

    // 기본 생성자
    public Admin() {}

    // 모든 필드를 포함하는 생성자
    public Admin(int noticePostNo, int noticePostCategoryNo, String noticePostTitle, String noticePostText, 
                      String noticePostImg, Date noticePostRegDate, int userNo) {
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

	public Date getNoticePostRegDate() {
		return noticePostRegDate;
	}

	public void setNoticePostRegDate(Date noticePostRegDate) {
		this.noticePostRegDate = noticePostRegDate;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	

    // getter와 setter 메서드들
    // 생략 가능하다면 Lombok 라이브러리의 @Data 어노테이션을 사용하면 좋습니다.
}