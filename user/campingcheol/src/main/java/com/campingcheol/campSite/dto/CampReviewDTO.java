package com.campingcheol.campSite.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;

@Component
public class CampReviewDTO {
	
	private int campRewNum;
	private int campKeyNum;
	private String userKeynum;
	private String campReviewContent;
	private int campReviewRating;
	private Date campReviewDate;
	
	
    //후기를 위해 추가함 
	private String campName;
	private String campImg;
	
	
	
	
	public CampReviewDTO() {
		
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

	public String getUserKeynum() {
		return userKeynum;
	}


	public void setUserKeynum(String userKeynum) {
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


	public Date getCampReviewDate() {
		return campReviewDate;
	}


	public void setCampReviewDate(Date campReviewDate) {
		this.campReviewDate = campReviewDate;
	}


	public String getCampName() {
		return campName;
	}


	public void setCampName(String campName) {
		this.campName = campName;
	}


	
	public String getCampImg() {
		return campImg;
	}
	
	public void setCampImg(String campImg) {
		this.campImg = campImg;
	}

}
