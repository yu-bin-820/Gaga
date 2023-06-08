package com.gaga.bo.service.domain;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

public class Meeting {

    private int meetingNo;
    private int entryFee;
    private Date meetingDate;
    private Time meetingStartTime;
    private Time meetingEndTime;
    private int parentClubNo;
    private int meetingSuccess;
    private String meetingAddr;
    private String meetingDetailAddr;
    private double meetingLat;
    private double meetingLng;
    private String meetingName;
    private String meetingIntro;
    private int meetingLeaderNo;
    private int meetingMaxMemberNo;
    private Date meetingRegDate;
    private int meetingState;
    private String meetingImg;
    private int filterGender;
    private int filterMinAge;
    private int filterMaxAge;
    private int mainCategoryNo;
    private String filterTag;
    private Timestamp adjustmentTime;
    private int adjustmentState;
    private String accountNo;
    private String bankName;
    private int state;
    private int count;
    private int parentMeetingNo;
    
    public Meeting() {
    	
    }
    
	public int getMeetingNo() {
		return meetingNo;
	}
	public void setMeetingNo(int meetingNo) {
		this.meetingNo = meetingNo;
	}
	public int getEntryFee() {
		return entryFee;
	}
	public void setEntryFee(int entryFee) {
		this.entryFee = entryFee;
	}
	public Date getMeetingDate() {
		return meetingDate;
	}
	public void setMeetingDate(Date meetingDate) {
		this.meetingDate = meetingDate;
	}
	public Time getMeetingStartTime() {
		return meetingStartTime;
	}
	public void setMeetingStartTime(Time meetingStartTime) {
		this.meetingStartTime = meetingStartTime;
	}
	public Time getMeetingEndTime() {
		return meetingEndTime;
	}
	public void setMeetingEndTime(Time meetingEndTime) {
		this.meetingEndTime = meetingEndTime;
	}
	public int getParentClubNo() {
		return parentClubNo;
	}
	public void setParentClubNo(int parentClubNo) {
		this.parentClubNo = parentClubNo;
	}
	public int getMeetingSuccess() {
		return meetingSuccess;
	}
	public void setMeetingSuccess(int meetingSuccess) {
		this.meetingSuccess = meetingSuccess;
	}
	public String getMeetingAddr() {
		return meetingAddr;
	}
	public void setMeetingAddr(String meetingAddr) {
		this.meetingAddr = meetingAddr;
	}
	public String getMeetingDetailAddr() {
		return meetingDetailAddr;
	}
	public void setMeetingDetailAddr(String meetingDetailAddr) {
		this.meetingDetailAddr = meetingDetailAddr;
	}
	public double getMeetingLat() {
		return meetingLat;
	}
	public void setMeetingLat(double meetingLat) {
		this.meetingLat = meetingLat;
	}
	public double getMeetingLng() {
		return meetingLng;
	}
	public void setMeetingLng(double meetingLng) {
		this.meetingLng = meetingLng;
	}
	public String getMeetingName() {
		return meetingName;
	}
	public void setMeetingName(String meetingName) {
		this.meetingName = meetingName;
	}
	public String getMeetingIntro() {
		return meetingIntro;
	}
	public void setMeetingIntro(String meetingIntro) {
		this.meetingIntro = meetingIntro;
	}
	public int getMeetingLeaderNo() {
		return meetingLeaderNo;
	}
	public void setMeetingLeaderNo(int meetingLeaderNo) {
		this.meetingLeaderNo = meetingLeaderNo;
	}
	public int getMeetingMaxMemberNo() {
		return meetingMaxMemberNo;
	}
	public void setMeetingMaxMemberNo(int meetingMaxMemberNo) {
		this.meetingMaxMemberNo = meetingMaxMemberNo;
	}
	public Date getMeetingRegDate() {
		return meetingRegDate;
	}
	public void setMeetingRegDate(Date meetingRegDate) {
		this.meetingRegDate = meetingRegDate;
	}
	public int getMeetingState() {
		return meetingState;
	}
	public void setMeetingState(int meetingState) {
		this.meetingState = meetingState;
	}
	public String getMeetingImg() {
		return meetingImg;
	}
	public void setMeetingImg(String meetingImg) {
		this.meetingImg = meetingImg;
	}
	public int getFilterGender() {
		return filterGender;
	}
	public void setFilterGender(int filterGender) {
		this.filterGender = filterGender;
	}
	public int getFilterMinAge() {
		return filterMinAge;
	}
	public void setFilterMinAge(int filterMinAge) {
		this.filterMinAge = filterMinAge;
	}
	public int getFilterMaxAge() {
		return filterMaxAge;
	}
	public void setFilterMaxAge(int filterMaxAge) {
		this.filterMaxAge = filterMaxAge;
	}
	public String getFilterTag() {
		return filterTag;
	}
	public void setFilterTag(String filterTag) {
		this.filterTag = filterTag;
	}
	
	public Timestamp getAdjustmentTime() {
		return adjustmentTime;
	}

	public void setAdjustmentTime(Timestamp adjustmentTime) {
		this.adjustmentTime = adjustmentTime;
	}

	public Integer getAdjustmentState() {
		return adjustmentState;
	}
	public void setAdjustmentState(Integer adjustmentState) {
		this.adjustmentState = adjustmentState;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public void setAdjustmentState(int adjustmentState) {
		this.adjustmentState = adjustmentState;
	}

	public int getMainCategoryNo() {
		return mainCategoryNo;
	}

	public void setMainCategoryNo(int mainCategoryNo) {
		this.mainCategoryNo = mainCategoryNo;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getParentMeetingNo() {
		return parentMeetingNo;
	}

	public void setParentMeetingNo(int parentMeetingNo) {
		this.parentMeetingNo = parentMeetingNo;
	}

	@Override
	public String toString() {
		return "Meeting [meetingNo=" + meetingNo + ", entryFee=" + entryFee + ", meetingDate=" + meetingDate
				+ ", meetingStartTime=" + meetingStartTime + ", meetingEndTime=" + meetingEndTime + ", parentClubNo="
				+ parentClubNo + ", meetingSuccess=" + meetingSuccess + ", meetingAddr=" + meetingAddr
				+ ", meetingDetailAddr=" + meetingDetailAddr + ", meetingLat=" + meetingLat + ", meetingLng="
				+ meetingLng + ", meetingName=" + meetingName + ", meetingIntro=" + meetingIntro + ", meetingLeaderNo="
				+ meetingLeaderNo + ", meetingMaxMemberNo=" + meetingMaxMemberNo + ", meetingRegDate=" + meetingRegDate
				+ ", meetingState=" + meetingState + ", meetingImg=" + meetingImg + ", filterGender=" + filterGender
				+ ", filterMinAge=" + filterMinAge + ", filterMaxAge=" + filterMaxAge + ", mainCategoryNo="
				+ mainCategoryNo + ", filterTag=" + filterTag + ", adjustmentTime=" + adjustmentTime
				+ ", adjustmentState=" + adjustmentState + ", accountNo=" + accountNo + ", bankName=" + bankName
				+ ", state=" + state + ", count=" + count + ", parentMeetingNo=" + parentMeetingNo + "]";
	}

    
}
