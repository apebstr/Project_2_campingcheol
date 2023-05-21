package com.campingcheol.campSite.dto;

import org.springframework.stereotype.Component;

@Component
public class CampPicDTO {

	private int campKeyNum;
	private String campPic;
	
	public CampPicDTO() {
	}

	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
	}

	public String getCampPic() {
		return campPic;
	}

	public void setCampPic(String campPic) {
		this.campPic = campPic;
	}
	
	
}
