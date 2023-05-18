package com.gaga.bo.service.domain;

import java.time.LocalDateTime;

public class Club {
    private int clubNo;
    private String clubName;
    private String clubIntro;
    private int clubLeaderNo;
    private int clubMaxMemberNo;
    private LocalDateTime clubRegDate;
    private int clubState;
    private String clubImg;
    private String clubRegion;
    private int filterGender;
    private int filterMinAge;
    private int filterMaxAge;
    private String filterTag;
    private int mainCategoryNo;

    public Club(int clubNo, String clubName, String clubIntro, int clubLeaderNo, int clubMaxMemberNo, LocalDateTime clubRegDate,
                int clubState, String clubImg, String clubRegion, int filterGender, int filterMinAge, int filterMaxAge, String filterTag, int mainCategoryNo ) {
        this.clubNo = clubNo;
        this.clubName = clubName;
        this.clubIntro = clubIntro;
        this.clubLeaderNo = clubLeaderNo;
        this.clubMaxMemberNo = clubMaxMemberNo;
        this.clubRegDate = clubRegDate;
        this.clubState = clubState;
        this.clubImg = clubImg;
        this.clubRegion = clubRegion;
        this.filterGender = filterGender;
        this.filterMinAge = filterMinAge;
        this.filterMaxAge = filterMaxAge;
        this.filterTag = filterTag;
        this.mainCategoryNo = mainCategoryNo;
    }

    public int getClubNo() {
        return clubNo;
    }

    public void setClubNo(int clubNo) {
        this.clubNo = clubNo;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public String getClubIntro() {
        return clubIntro;
    }

    public void setClubIntro(String clubIntro) {
        this.clubIntro = clubIntro;
    }

    public int getClubLeaderNo() {
        return clubLeaderNo;
    }

    public void setClubLeaderNo(int clubLeaderNo) {
        this.clubLeaderNo = clubLeaderNo;
    }

    public int getClubMaxMemberNo() {
        return clubMaxMemberNo;
    }

    public void setClubMaxMemberNo(int clubMaxMemberNo) {
        this.clubMaxMemberNo = clubMaxMemberNo;
    }

    public LocalDateTime getClubRegDate() {
        return clubRegDate;
    }

    public void setClubRegDate(LocalDateTime clubRegDate) {
        this.clubRegDate = clubRegDate;
    }

    public int getClubState() {
        return clubState;
    }

    public void setClubState(int clubState) {
        this.clubState = clubState;
    }

    public String getClubImg() {
        return clubImg;
    }

    public void setClubImg(String clubImg) {
        this.clubImg = clubImg;
    }

    public String getClubRegion() {
        return clubRegion;
    }

    public void setClubRegion(String clubRegion) {
        this.clubRegion = clubRegion;
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
    
    public int getMainCategoryNo() {
        return mainCategoryNo;
    }

    public void setMainCategoryNo(int mainCategoryNo) {
        this.mainCategoryNo = mainCategoryNo;
    }

	@Override
	public String toString() {
		return "Club [clubNo=" + clubNo + ", clubName=" + clubName + ", clubIntro=" + clubIntro + ", clubLeaderNo="
				+ clubLeaderNo + ", clubMaxMemberNo=" + clubMaxMemberNo + ", clubRegDate=" + clubRegDate
				+ ", clubState=" + clubState + ", clubImg=" + clubImg + ", clubRegion=" + clubRegion + ", filterGender="
				+ filterGender + ", filterMinAge=" + filterMinAge + ", filterMaxAge=" + filterMaxAge + ", filterTag="
				+ filterTag + "]";
	}
    
}
