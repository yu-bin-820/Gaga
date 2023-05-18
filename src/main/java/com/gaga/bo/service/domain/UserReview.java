package com.gaga.bo.service.domain;

public class UserReview {
	
	///field
	private int userReviewNo;
	private int reviewerNo;
	private int reviewedNo;
	private int userScore;
	
	///Constructor()
	public UserReview() {
	}
	
	///getter,setter()
	public int getUserReviewNo() {
		return userReviewNo;
	}

	public void setUserReviewNo(int userReviewNo) {
		this.userReviewNo = userReviewNo;
	}

	public int getReviewerNo() {
		return reviewerNo;
	}

	public void setReviewerNo(int reviewerNo) {
		this.reviewerNo = reviewerNo;
	}

	public int getReviewedNo() {
		return reviewedNo;
	}

	public void setReviewedNo(int reviewedNo) {
		this.reviewedNo = reviewedNo;
	}

	public int getUserScore() {
		return userScore;
	}

	public void setUserScore(int userScore) {
		this.userScore = userScore;
	}
	
	///toString()s
	@Override
	public String toString() {
		return "UserReview [userReviewNo=" + userReviewNo + ", reviewerNo=" + reviewerNo + ", reviewedNo=" + reviewedNo
				+ ", userScore=" + userScore + "]";
	}
	
	

}
