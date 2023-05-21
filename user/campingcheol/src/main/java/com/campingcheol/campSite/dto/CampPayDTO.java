package com.campingcheol.campSite.dto;

//campPayKeyNum number CONSTRAINT campPayKeyNum_seq PRIMARY KEY,-- 결제정보번호
//campKeyNum number, --FK
//userID VARCHAR2(50), --FK
//campPayment varchar2(50),-- 결제수단
//campPayCheck varchar2(50),-- 결제여부
//campPayAmt varchar2(50)-- 결제금액

public class CampPayDTO {

	private int campPayKeyNum;
	private int campKeyNum;
	private String userKeyNum;
	private String campPayment;
	private String campPayCheck;
	private String campPayAmt;
	private int campReservNum;
	private String campReviewCheck;
	
	public CampPayDTO() {
		
	}

	public int getCampPayKeyNum() {
		return campPayKeyNum;
	}

	public void setCampPayKeyNum(int campPayKeyNum) {
		this.campPayKeyNum = campPayKeyNum;
	}

	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
	}

	public String getUserKeyNum() {
		return userKeyNum;
	}

	public void setUserKeyNum(String userKeyNum) {
		this.userKeyNum = userKeyNum;
	}

	public String getCampPayment() {
		return campPayment;
	}

	public void setCampPayment(String campPayment) {
		this.campPayment = campPayment;
	}

	public String getCampPayCheck() {
		return campPayCheck;
	}

	public void setCampPayCheck(String campPayCheck) {
		this.campPayCheck = campPayCheck;
	}

	public String getCampPayAmt() {
		return campPayAmt;
	}

	public void setCampPayAmt(String campPayAmt) {
		this.campPayAmt = campPayAmt;
	}

	public int getCampReservNum() {
		return campReservNum;
	}

	public void setCampReservNum(int campReservNum) {
		this.campReservNum = campReservNum;
	}

	public String getCampReviewCheck() {
		return campReviewCheck;
	}

	public void setCampReviewCheck(String campReviewCheck) {
		this.campReviewCheck = campReviewCheck;
	}
	
	
	
}
