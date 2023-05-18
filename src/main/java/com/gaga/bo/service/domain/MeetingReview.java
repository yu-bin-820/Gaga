package com.gaga.bo.service.domain;

import java.sql.Date;

public class MeetingReview {
	
    private int meetingReviewNo;
    private int meetingNo;
    private float meetingScore;
    private String meetingReviewImg;
    private String meetingReviewContent;
    private int meetingReviewerNo;
    private Date meetingReviewDate;
    
    public MeetingReview() {
    	
    }
    
    
	public int getMeetingReviewNo() {
		return meetingReviewNo;
	}
	public void setMeetingReviewNo(int meetingReviewNo) {
		this.meetingReviewNo = meetingReviewNo;
	}
	public int getMeetingNo() {
		return meetingNo;
	}
	public void setMeetingNo(int meetingNo) {
		this.meetingNo = meetingNo;
	}
	public float getMeetingScore() {
		return meetingScore;
	}
	public void setMeetingScore(float meetingScore) {
		this.meetingScore = meetingScore;
	}
	public String getMeetingReviewImg() {
		return meetingReviewImg;
	}
	public void setMeetingReviewImg(String meetingReviewImg) {
		this.meetingReviewImg = meetingReviewImg;
	}
	public String getMeetingReviewContent() {
		return meetingReviewContent;
	}
	public void setMeetingReviewContent(String meetingReviewContent) {
		this.meetingReviewContent = meetingReviewContent;
	}
	public int getMeetingReviewerNo() {
		return meetingReviewerNo;
	}
	public void setMeetingReviewerNo(int meetingReviewerNo) {
		this.meetingReviewerNo = meetingReviewerNo;
	}
	public Date getMeetingReviewDate() {
		return meetingReviewDate;
	}
	public void setMeetingReviewDate(Date meetingReviewDate) {
		this.meetingReviewDate = meetingReviewDate;
	}


	@Override
	public String toString() {
		return "MeetingReview [meetingReviewNo=" + meetingReviewNo + ", meetingNo=" + meetingNo + ", meetingScore="
				+ meetingScore + ", meetingReviewImg=" + meetingReviewImg + ", meetingReviewContent="
				+ meetingReviewContent + ", meetingReviewerNo=" + meetingReviewerNo + ", meetingReviewDate="
				+ meetingReviewDate + "]";
	}

}
