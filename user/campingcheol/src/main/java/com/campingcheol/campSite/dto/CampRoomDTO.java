package com.campingcheol.campSite.dto;

import java.sql.Date;

//campKeyNum number, --FK(캠핑장 고유번호)
//campRoom varchar2(100),
//campRoomCount number,
//campRoomPrice varchar2(50)


public class CampRoomDTO {

	private int campKeyNum;
	private String campRoom;
	private int campRoomCount;
	private String campRoomPrice;
	private String campReservStart;
	private String campReservEnd;

	// 추가함
	   private String campName;
	   private String campImg;
	   private String campReservCheck;
	   private int campReservPerson;
	   private Date campReservDate;
	   private String campPayAmt;
	   private int userKeyNum;
	   private int userKeynum;
	   private String campReviewCheck;
	   private int campPayKeyNum;
	   private String campReservNum;
	
	public CampRoomDTO() {
		
	}

	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
	}

	public String getCampRoom() {
		return campRoom;
	}

	public void setCampRoom(String campRoom) {
		this.campRoom = campRoom;
	}

	public int getCampRoomCount() {
		return campRoomCount;
	}

	public void setCampRoomCount(int campRoomCount) {
		this.campRoomCount = campRoomCount;
	}

	public String getCampRoomPrice() {
		return campRoomPrice;
	}

	public void setCampRoomPrice(String campRoomPrice) {
		this.campRoomPrice = campRoomPrice;
	}

	public String getCampReservStart() {
		return campReservStart;
	}

	public void setCampReservStart(String campReservStart) {
		this.campReservStart = campReservStart;
	}

	public String getCampReservEnd() {
		return campReservEnd;
	}

	public void setCampReservEnd(String campReservEnd) {
		this.campReservEnd = campReservEnd;
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

	public String getCampReservCheck() {
		return campReservCheck;
	}

	public void setCampReservCheck(String campReservCheck) {
		this.campReservCheck = campReservCheck;
	}

	public int getCampReservPerson() {
		return campReservPerson;
	}

	public void setCampReservPerson(int campReservPerson) {
		this.campReservPerson = campReservPerson;
	}

	public Date getCampReservDate() {
		return campReservDate;
	}

	public void setCampReservDate(Date campReservDate) {
		this.campReservDate = campReservDate;
	}

	public String getCampPayAmt() {
		return campPayAmt;
	}

	public void setCampPayAmt(String campPayAmt) {
		this.campPayAmt = campPayAmt;
	}

	public int getUserKeyNum() {
		return userKeyNum;
	}

	public void setUserKeyNum(int userKeyNum) {
		this.userKeyNum = userKeyNum;
	}

	public int getUserKeynum() {
		return userKeynum;
	}

	public void setUserKeynum(int userKeynum) {
		this.userKeynum = userKeynum;
	}

	public String getCampReviewCheck() {
		return campReviewCheck;
	}

	public void setCampReviewCheck(String campReviewCheck) {
		this.campReviewCheck = campReviewCheck;
	}

	public int getCampPayKeyNum() {
		return campPayKeyNum;
	}

	public void setCampPayKeyNum(int campPayKeyNum) {
		this.campPayKeyNum = campPayKeyNum;
	}

	public String getCampReservNum() {
		return campReservNum;
	}

	public void setCampReservNum(String campReservNum) {
		this.campReservNum = campReservNum;
	}
	
	
}
