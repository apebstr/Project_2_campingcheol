package com.campingcheol.campSite.dto;

//campKeyNum number, --FK(캠핑장 고유번호)
//tagKeynum number --FK

import org.springframework.stereotype.Component;

@Component
public class CampTagDTO {
	private int campKeyNum;
	private int tagKeyNum;

	public CampTagDTO() {

	}

	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
	}

	public int getTagKeyNum() {
		return tagKeyNum;
	}

	public void setTagKeyNum(int tagKeyNum) {
		this.tagKeyNum = tagKeyNum;
	}

}
