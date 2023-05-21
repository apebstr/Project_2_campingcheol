package com.campingcheol.prod.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;

@Component
public class ProdReviewDTO {

	private int prodReviewNum;
	private int userKeynum;
	private int prodKeyNum;
	private String prodReviewContent;
	private int prodReviewRating;
	private Date prodReviewDate;
	private String userNick;

	//후기를 위해 추가함 
	private String prodTitle;
	private String prodImage;
	
	
	public ProdReviewDTO() {
		// TODO Auto-generated constructor stub
	}

	public int getProdReviewNum() {
		return prodReviewNum;
	}
	public void setProdReviewNum(int prodReviewNum) {
		this.prodReviewNum = prodReviewNum;
	}
	public int getUserKeynum() {
		return userKeynum;
	}
	public void setUserKeynum(int userKeynum) {
		this.userKeynum = userKeynum;
	}
	public int getProdKeyNum() {
		return prodKeyNum;
	}
	public void setProdKeyNum(int prodKeyNum) {
		this.prodKeyNum = prodKeyNum;
	}
	public String getProdReviewContent() {
		return prodReviewContent;
	}
	public void setProdReviewContent(String prodReviewContent) {
		this.prodReviewContent = prodReviewContent;
	}
	public int getProdReviewRating() {
		return prodReviewRating;
	}
	public void setProdReviewRating(int prodReviewRating) {
		this.prodReviewRating = prodReviewRating;
	}
	public Date getProdReviewDate() {
		return prodReviewDate;
	}
	public void setProdReviewDate(Date prodReviewDate) {
		this.prodReviewDate = prodReviewDate;
	}
	public String getUserNick() {
		return userNick;
	}
	public void setUserNick(String userNick) {
		this.userNick = userNick;
	}

	public String getProdTitle() {
		return prodTitle;
	}

	public void setProdTitle(String prodTitle) {
		this.prodTitle = prodTitle;
	}

	public String getProdImage() {
		return prodImage;
	}

	public void setProdImage(String prodImage) {
		this.prodImage = prodImage;
	}

}
