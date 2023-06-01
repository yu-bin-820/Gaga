package com.gaga.bo.service.domain;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

public class Report {
	///field
	private int reportNo;
	private int reportingNo;
	private int reportedNo;
	private int reportCategoryNo;
	private String reportContent;
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private LocalDateTime reportDate;
	private String reportImg;
	private String reportImg2;
	private String reportImg3;
	//신고게시판 화면용도
	private String reportedId;
	private String reportingId;
	private String reportedNickName;
	private String reportingNickName;
	
	///Constructor()
	public Report() {
	}
	
	///getter,setter()
	public int getReportNo() {
		return reportNo;
	}

	public void setReportNo(int reportNo) {
		this.reportNo = reportNo;
	}

	public int getReportingNo() {
		return reportingNo;
	}

	public void setReportingNo(int reportingNo) {
		this.reportingNo = reportingNo;
	}

	public int getReportedNo() {
		return reportedNo;
	}

	public void setReportedNo(int reportedNo) {
		this.reportedNo = reportedNo;
	}

	public int getReportCategoryNo() {
		return reportCategoryNo;
	}

	public void setReportCategoryNo(int reportCategoryNo) {
		this.reportCategoryNo = reportCategoryNo;
	}

	public String getReportContent() {
		return reportContent;
	}

	public void setReportContent(String reportContent) {
		this.reportContent = reportContent;
	}

	public LocalDateTime getReportDate() {
		return reportDate;
	}

	public void setReportDate(LocalDateTime reportDate) {
		this.reportDate = reportDate;
	}

	public String getReportImg() {
		return reportImg;
	}

	public void setReportImg(String reportImg) {
		this.reportImg = reportImg;
	}

	public String getReportImg2() {
		return reportImg2;
	}

	public void setReportImg2(String reportImg2) {
		this.reportImg2 = reportImg2;
	}

	public String getReportImg3() {
		return reportImg3;
	}

	public void setReportImg3(String reportImg3) {
		this.reportImg3 = reportImg3;
	}

	public String getReportedId() {
		return reportedId;
	}

	public void setReportedId(String reportedId) {
		this.reportedId = reportedId;
	}

	public String getReportingId() {
		return reportingId;
	}

	public void setReportingId(String reportingId) {
		this.reportingId = reportingId;
	}

	public String getReportedNickName() {
		return reportedNickName;
	}

	public void setReportedNickName(String reportedNickName) {
		this.reportedNickName = reportedNickName;
	}

	public String getReportingNickName() {
		return reportingNickName;
	}

	public void setReportingNickName(String reportingNickName) {
		this.reportingNickName = reportingNickName;
	}

	///toString()
	@Override
	public String toString() {
		return "Report [reportNo=" + reportNo + ", reportingNo=" + reportingNo + ", reportedNo=" + reportedNo
				+ ", reportCategoryNo=" + reportCategoryNo + ", reportContent=" + reportContent + ", reportDate="
				+ reportDate + ", reportImg=" + reportImg + ", reportImg2=" + reportImg2 + ", reportImg3=" + reportImg3
				+ ", reportedId=" + reportedId + ", reportingId=" + reportingId + ", reportedNickName="
				+ reportedNickName + ", reportingNickName=" + reportingNickName + "]";
	}
	


		

}
