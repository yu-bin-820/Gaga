package com.gaga.bo.service.domain;

public class Title {
	
	///field
	private int titleNo;
	private String titleName;
	
	///Constructor()
	public Title() {
	}
	
	///getter,setter()
	public int getTitleNo() {
		return titleNo;
	}

	public void setTitleNo(int titleNo) {
		this.titleNo = titleNo;
	}

	public String getTitleName() {
		return titleName;
	}

	public void setTitleName(String titleName) {
		this.titleName = titleName;
	}

	///toString()
	@Override
	public String toString() {
		return "Title [titleNo=" + titleNo + ", titleName=" + titleName + "]";
	}
	
	
	

}
