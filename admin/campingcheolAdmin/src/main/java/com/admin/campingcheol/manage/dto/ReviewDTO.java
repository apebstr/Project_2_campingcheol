package com.admin.campingcheol.manage.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class ReviewDTO {
	
	//상품리뷰
	private String prodReviewNum;
	private String userKeynum;
	private String prodKeyNum;
	private String prodReviewContent;
	private String prodReviewRating;
	private String prodReviewDate;
	
	//유저정보
	private String userID;
	private String userNick;
	
	//상품정보
	private String prodTitle;
	private String prodImage;
	
	//캠핑장리뷰
	private String campRewNum;
	private String campKeyNum;
	private String campReviewContent;
	private String campReviewRating;
	private String campReviewDate;
	
	//캠핑장정보
	private String campName;
	private String campImg;
	


	
}
