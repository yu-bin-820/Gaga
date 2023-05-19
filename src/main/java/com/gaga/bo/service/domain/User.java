package com.gaga.bo.service.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;


public class User {
	
	private int userNo;
    private String userId;
    private String password;
    private String userName;
    // LocalDate 날짜만 필요해서 LocalDate 타입 사용
    private LocalDate birthday;
    private int gender;
    private String nickName;
    private int phoneNo;
    private int role;
    // 가입일은 날짜+시분초 필요해서 LocalDateTime 타입 사용
    private LocalDateTime joinDay;
    private Float temperature;
    private LocalDateTime outDay;
    private String outReason;
    private String profileImg;
    private String activityImg;
    private String activityImg2;
    private String activityImg3;
    private String userIntro;
    private int mainTitleNo;
    private String bankCode;
    private String bankName;
    private String accountNo;
    private int blacklist;
    private int filterGender;
    private int filterMaxAge;
    private int filterMinAge;
    private String filterTag;
    private String filterTag2;
    private String filterTag3;
    
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public LocalDate getBirthday() {
		return birthday;
	}
	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public int getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(int phoneNo) {
		this.phoneNo = phoneNo;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public LocalDateTime getJoinDay() {
		return joinDay;
	}
	public void setJoinDay(LocalDateTime joinDay) {
		this.joinDay = joinDay;
	}
	public Float getTemperature() {
		return temperature;
	}
	public void setTemperature(Float temperature) {
		this.temperature = temperature;
	}
	public LocalDateTime getOutDay() {
		return outDay;
	}
	public void setOutDay(LocalDateTime outDay) {
		this.outDay = outDay;
	}
	public String getOutReason() {
		return outReason;
	}
	public void setOutReason(String outReason) {
		this.outReason = outReason;
	}
	public String getProfileImg() {
		return profileImg;
	}
	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}
	public String getActivityImg() {
		return activityImg;
	}
	public void setActivityImg(String activityImg) {
		this.activityImg = activityImg;
	}
	public String getActivityImg2() {
		return activityImg2;
	}
	public void setActivityImg2(String activityImg2) {
		this.activityImg2 = activityImg2;
	}
	public String getActivityImg3() {
		return activityImg3;
	}
	public void setActivityImg3(String activityImg3) {
		this.activityImg3 = activityImg3;
	}
	public String getUserIntro() {
		return userIntro;
	}
	public void setUserIntro(String userIntro) {
		this.userIntro = userIntro;
	}
	public int getMainTitleNo() {
		return mainTitleNo;
	}
	public void setMainTitleNo(int mainTitleNo) {
		this.mainTitleNo = mainTitleNo;
	}
	public String getBankCode() {
		return bankCode;
	}
	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public int getBlacklist() {
		return blacklist;
	}
	public void setBlacklist(int blacklist) {
		this.blacklist = blacklist;
	}
	public int getFilterGender() {
		return filterGender;
	}
	public void setFilterGender(int filterGender) {
		this.filterGender = filterGender;
	}
	public int getFilterMaxAge() {
		return filterMaxAge;
	}
	public void setFilterMaxAge(int filterMaxAge) {
		this.filterMaxAge = filterMaxAge;
	}
	public int getFilterMinAge() {
		return filterMinAge;
	}
	public void setFilterMinAge(int filterMinAge) {
		this.filterMinAge = filterMinAge;
	}
	public String getFilterTag() {
		return filterTag;
	}
	public void setFilterTag(String filterTag) {
		this.filterTag = filterTag;
	}
	public String getFilterTag2() {
		return filterTag2;
	}
	public void setFilterTag2(String filterTag2) {
		this.filterTag2 = filterTag2;
	}
	public String getFilterTag3() {
		return filterTag3;
	}
	public void setFilterTag3(String filterTag3) {
		this.filterTag3 = filterTag3;
	}
	@Override
	public String toString() {
		return "User [userNo=" + userNo + ", userId=" + userId + ", password=" + password + ", userName=" + userName
				+ ", birthday=" + birthday + ", gender=" + gender + ", nickName=" + nickName + ", phoneNo=" + phoneNo
				+ ", role=" + role + ", joinDay=" + joinDay + ", temperature=" + temperature + ", outDay=" + outDay
				+ ", outReason=" + outReason + ", profileImg=" + profileImg + ", activityImg=" + activityImg
				+ ", activityImg2=" + activityImg2 + ", activityImg3=" + activityImg3 + ", userIntro=" + userIntro
				+ ", mainTitleNo=" + mainTitleNo + ", bankCode=" + bankCode + ", bankName=" + bankName + ", accountNo="
				+ accountNo + ", blacklist=" + blacklist + ", filterGender=" + filterGender + ", filterMaxAge="
				+ filterMaxAge + ", filterMinAge=" + filterMinAge + ", filterTag=" + filterTag + ", filterTag2="
				+ filterTag2 + ", filterTag3=" + filterTag3 + "]";
	}
    
	
}
