package com.campingcheol.tag.dto;

import org.springframework.stereotype.Component;

@Component
public class TagDTO {
	private int tagKeynum;
	private String tagName;
	
	public TagDTO() {
		// TODO Auto-generated constructor stub
	}

	public int getTagKeynum() {
		return tagKeynum;
	}

	public void setTagKeynum(int tagKeynum) {
		this.tagKeynum = tagKeynum;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	
	
}
