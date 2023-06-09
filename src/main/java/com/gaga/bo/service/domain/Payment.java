package com.gaga.bo.service.domain;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class Payment {
	
	//Field
    private String payNo;
    private int userNo;
    private int meetingNo;
    private String meetingName;
    private Timestamp payTime;
    private Timestamp refundTime;
    private int payState;
    private int entryFee;

    //Constructor
    public Payment() {
		
	}
    
    //getter/setter Method
    public String getPayNo() {
        return payNo;
    }

    public void setPayNo(String payNo) {
        this.payNo = payNo;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public int getMeetingNo() {
        return meetingNo;
    }

    public void setMeetingNo(int meetingNo) {
        this.meetingNo = meetingNo;
    }

    public String getMeetingName() {
        return meetingName;
    }

    public void setMeetingName(String meetingName) {
        this.meetingName = meetingName;
    }

    public Timestamp getPayTime() {
        return payTime;
    }

    public void setPayTime(Timestamp payTime) {
        this.payTime = payTime;
    }

    public Timestamp getRefundTime() {
        return refundTime;
    }

    public void setRefundTime(Timestamp refundTime) {
        this.refundTime = refundTime;
    }

    public int getPayState() {
        return payState;
    }

    public void setPayState(int payState) {
        this.payState = payState;
    }

	public int getEntryFee() {
		return entryFee;
	}

	public void setEntryFee(int entryFee) {
		this.entryFee = entryFee;
	}

	@Override
	public String toString() {
		return "Payment [payNo=" + payNo + ", userNo=" + userNo + ", meetingNo=" + meetingNo + ", meetingName="
				+ meetingName + ", payTime=" + payTime + ", refundTime=" + refundTime + ", payState=" + payState
				+ ", entryFee=" + entryFee + "]";
	}



}