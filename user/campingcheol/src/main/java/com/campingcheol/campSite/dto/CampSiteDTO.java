package com.campingcheol.campSite.dto;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//	  campKeyNum number, --캠핑장 고유번호
//    campName varchar2(2000) NOT NULL, 
//    campImg varchar2(2000), 
//    campDo varchar2(2000),
//    campSigun varchar2(2000),
//    campAddr varchar2(2000), 
//    campTel varchar2(2000),
//    campLineIntro varchar2(2000),
//    campIntro CLOB,
//    campEnv varchar2(2000),
//    campType varchar2(2000),
//    campFcity varchar2(2000),
//    campAvailable varchar2(2000),
//    campHomePage varchar2(2000), 
//    campMapY varchar2(2000),
//    campMapX varchar2(2000),
//    campModdate varchar2(2000)

@Component
public class CampSiteDTO {

	private int campKeyNum;
	private String campName;
	private String campImg;
	private String campDo;
	private String campSigun;
	private String campAddr;
	private String campTel;
	private String campLineIntro;
	private String campIntro;
	private String campEnv;
	private String campType;
	private String campFcity;
	private String campAvailable;
	private String campHomePage;
	private String campMapY;
	private String campMapX;
	private String campModdate;
	private String [] campPics;
	private List<CampRoomDTO> campRooms;
	private int checkJjim;
	private List<CampTagDTO> campTags;

	private String AvgRating;
//	private String campReservStart;
//	private String campReservEnd;

	
	public CampSiteDTO() {
	}
	
	

	public String[] getCampPics() {
		return campPics;
	}



	public void setCampPics(String[] campPics) {
		this.campPics = campPics;
	}



	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
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

	public String getCampDo() {
		return campDo;
	}

	public void setCampDo(String campDo) {
		this.campDo = campDo;
	}

	public String getCampSigun() {
		return campSigun;
	}

	public void setCampSigun(String campSigun) {
		this.campSigun = campSigun;
	}

	public String getCampAddr() {
		return campAddr;
	}

	public void setCampAddr(String campAddr) {
		this.campAddr = campAddr;
	}

	public String getCampTel() {
		return campTel;
	}

	public void setCampTel(String campTel) {
		this.campTel = campTel;
	}

	public String getCampLineIntro() {
		return campLineIntro;
	}

	public void setCampLineIntro(String campLineIntro) {
		this.campLineIntro = campLineIntro;
	}

	public String getCampIntro() {
		return campIntro;
	}

	public void setCampIntro(String campIntro) {
		this.campIntro = campIntro;
	}

	public String getCampEnv() {
		return campEnv;
	}

	public void setCampEnv(String campEnv) {
		this.campEnv = campEnv;
	}

	public String getCampType() {
		return campType;
	}

	public void setCampType(String campType) {
		this.campType = campType;
	}

	public String getCampFcity() {
		return campFcity;
	}

	public void setCampFcity(String campFcity) {
		this.campFcity = campFcity;
	}

	public String getCampAvailable() {
		return campAvailable;
	}

	public void setCampAvailable(String campAvailable) {
		this.campAvailable = campAvailable;
	}

	public String getCampHomePage() {
		return campHomePage;
	}

	public void setCampHomePage(String campHomePage) {
		this.campHomePage = campHomePage;
	}

	public String getCampMapY() {
		return campMapY;
	}

	public void setCampMapY(String campMapY) {
		this.campMapY = campMapY;
	}

	public String getCampMapX() {
		return campMapX;
	}

	public void setCampMapX(String campMapX) {
		this.campMapX = campMapX;
	}

	public String getCampModdate() {
		return campModdate;
	}

	public void setCampModdate(String campModdate) {
		this.campModdate = campModdate;
	}



	public List<CampRoomDTO> getCampRooms() {
		return campRooms;
	}



	public void setCampRooms(List<CampRoomDTO> campRooms) {
		this.campRooms = campRooms;
	}



	public int getCheckJjim() {
		return checkJjim;
	}



	public void setCheckJjim(int checkJjim) {
		this.checkJjim = checkJjim;
	}



	public List<CampTagDTO> getCampTags() {
		return campTags;
	}



	public void setCampTags(List<CampTagDTO> campTags) {
		this.campTags = campTags;
	}



	public String getAvgRating() {
		return AvgRating;
	}



	public void setAvgRating(String avgRating) {
		AvgRating = avgRating;
	}



//	public String getCampReservStart() {
//		return campReservStart;
//	}
//
//
//
//	public void setCampReservStart(String campReservStart) {
//		this.campReservStart = campReservStart;
//	}
//
//
//
//	public String getCampReservEnd() {
//		return campReservEnd;
//	}
//
//
//
//	public void setCampReservEnd(String campReservEnd) {
//		this.campReservEnd = campReservEnd;
//	}








	
	

}
