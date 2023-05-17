package com.gaga.bo.service.domain;

public class ReportCategory {

	///field
	 private int reportCategoryNo;
	 private String reportCategoryName;

	///constructor
	public ReportCategory() {
	}

	///getter, setter
	public int getReportCategoryNo() {
		return reportCategoryNo;
	}

	public void setReportCategoryNo(int reportCategoryNo) {
		this.reportCategoryNo = reportCategoryNo;
	}

	public String getReportCategoryName() {
		return reportCategoryName;
	}

	public void setReportCategoryName(String reportCategoryName) {
		this.reportCategoryName = reportCategoryName;
	}

	///toString()
	@Override
	public String toString() {
		return "ReportCategory [reportCategoryNo=" + reportCategoryNo + ", reportCategoryName=" + reportCategoryName
				+ "]";
	}
	
}
