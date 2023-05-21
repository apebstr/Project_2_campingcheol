package com.campingcheol.campSite.dto;





import org.springframework.stereotype.Component;



//campReservNum number CONSTRAINT campReserv_seq PRIMARY KEY,
//campKeyNum number, --FK
//userID varchar2(50), --FK
//campRoom varchar2(50),
//campRoomCount varchar2(50),
//campReservStart date NOT NULL, --사용시작일
//campReservEnd date NOT NULL, --사용종료일
//campReservPerson number NOT NULL,
//campReservDate date, --예약일자
//campReservCheck varchar2(50)--결제여부


@Component
public class CampReservDTO {

	private int campReservNum;
	private int campKeyNum;
	private String userKeyNum;
	private String campRoom;
	private int campRoomCount;
	private String campReservStart;
	private String campReservEnd;
	private String campReservPerson;
	private String campReservDate;
	private String campReservCheck;

	public CampReservDTO() {
		
	}

	public int getCampReservNum() {
		return campReservNum;
	}

	public void setCampReservNum(int campReservNum) {
		this.campReservNum = campReservNum;
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
		this.userKeyNum =userKeyNum;
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

	public String getCampReservPerson() {
		return campReservPerson;
	}

	public void setCampReservPerson(String campReservPerson) {
		this.campReservPerson = campReservPerson;
	}

	public String getCampReservDate() {
		return campReservDate;
	}

	public void setCampReservDate(String campReservDate) {
		this.campReservDate = campReservDate;
	}

	public String getCampReservCheck() {
		return campReservCheck;
	}

	public void setCampReservCheck(String campReservCheck) {
		this.campReservCheck = campReservCheck;
	}



}
