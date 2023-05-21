package com.campingcheol.campSite.dto;

import java.util.Date;

//campRewNum number CONSTRAINT campRewNum_seq PRIMARY KEY,
//campKeyNum number, --FK
//userKeynum number, --FK
//campReviewContent varchar2(2000) NOT NULL,
//campReviewRating number NOT NULL,
//campReviewDate date NOT NULL

public class CampRevDTO {

	private int campRewNum;
	private int campKeyNum;
	private int userKeynum;
	private String campReviewContent;
	private int campReviewRating;
	private String campReviewDate;
	private String userNick;

	public CampRevDTO() {
	}

	
	public int getCampRewNum() {
		return campRewNum;
	}

	public void setCampRewNum(int campRewNum) {
		this.campRewNum = campRewNum;
	}

	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
	}

	public int getUserKeynum() {
		return userKeynum;
	}

	public void setUserKeynum(int userKeynum) {
		this.userKeynum = userKeynum;
	}

	public String getCampReviewContent() {
		return campReviewContent;
	}

	public void setCampReviewContent(String campReviewContent) {
		this.campReviewContent = campReviewContent;
	}

	public int getCampReviewRating() {
		return campReviewRating;
	}

	public void setCampReviewRating(int campReviewRating) {
		this.campReviewRating = campReviewRating;
	}

	public String getCampReviewDate() {
		return campReviewDate;
	}

	public void setCampReviewDate(String campReviewDate) {
		this.campReviewDate = campReviewDate;
	}


	public String getUserNick() {
		return userNick;
	}


	public void setUserNick(String userNick) {
		this.userNick = userNick;
	}

}
