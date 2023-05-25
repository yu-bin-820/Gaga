package com.gaga.bo.service.domain;

import java.time.LocalDate;

public class Filter {
	
    private int gender;
    private int maxAge;
    private int minAge;
    private String tag;
    private String tag2;
    private String tag3;
    private int mainCategoryNo;
    private double swLat;
    private double swLng;
    private double neLat;
    private double neLng;
    private int pageSize;
    private LocalDate birthday;
    private int age;
    
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public int getMaxAge() {
		return maxAge;
	}
	public void setMaxAge(int maxAge) {
		this.maxAge = maxAge;
	}
	public int getMinAge() {
		return minAge;
	}
	public void setMinAge(int minAge) {
		this.minAge = minAge;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getTag2() {
		return tag2;
	}
	public void setTag2(String tag2) {
		this.tag2 = tag2;
	}
	public String getTag3() {
		return tag3;
	}
	public void setTag3(String tag3) {
		this.tag3 = tag3;
	}
	public int getMainCategoryNo() {
		return mainCategoryNo;
	}
	public void setMainCategoryNo(int mainCategoryNo) {
		this.mainCategoryNo = mainCategoryNo;
	}
	public double getSwLat() {
		return swLat;
	}
	public void setSwLat(double swLat) {
		this.swLat = swLat;
	}
	public double getSwLng() {
		return swLng;
	}
	public void setSwLng(double swLng) {
		this.swLng = swLng;
	}
	public double getNeLat() {
		return neLat;
	}
	public void setNeLat(double neLat) {
		this.neLat = neLat;
	}
	public double getNeLng() {
		return neLng;
	}
	public void setNeLng(double neLng) {
		this.neLng = neLng;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public LocalDate getBirthday() {
		return birthday;
	}
	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public String toString() {
		return "Filter [gender=" + gender + ", maxAge=" + maxAge + ", minAge=" + minAge + ", tag=" + tag + ", tag2="
				+ tag2 + ", tag3=" + tag3 + ", mainCategoryNo=" + mainCategoryNo + ", swLat=" + swLat + ", swLng="
				+ swLng + ", neLat=" + neLat + ", neLng=" + neLng + ", pageSize=" + pageSize + ", birthday=" + birthday
				+ ", age=" + age + ", getGender()=" + getGender() + ", getMaxAge()=" + getMaxAge() + ", getMinAge()="
				+ getMinAge() + ", getTag()=" + getTag() + ", getTag2()=" + getTag2() + ", getTag3()=" + getTag3()
				+ ", getMainCategoryNo()=" + getMainCategoryNo() + ", getSwLat()=" + getSwLat() + ", getSwLng()="
				+ getSwLng() + ", getNeLat()=" + getNeLat() + ", getNeLng()=" + getNeLng() + ", getPageSize()="
				+ getPageSize() + ", getBirthday()=" + getBirthday() + ", getAge()=" + getAge() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

}
