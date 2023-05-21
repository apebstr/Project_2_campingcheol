package com.campingcheol.campSite.dto;

//campKeyNum number, --FK(캠핑장 고유번호)
//userKeyNum number, --FK
//campLike varchar2(50)

import org.springframework.stereotype.Component;

@Component
public class CampJjimDTO {

	private String userID;
	private int campKeyNum;

	public CampJjimDTO() {

	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
	}



}
