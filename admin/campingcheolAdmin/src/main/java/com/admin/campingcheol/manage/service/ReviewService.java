package com.admin.campingcheol.manage.service;

import java.util.List;
import java.util.Map;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.ReviewDTO;

public interface ReviewService {
	
	////////////////////////////////////////////
	//캠핑용품관리
	public int countProdReviewProcess(Map<String, String> search);	//총 캠핑용품 리뷰 조회
	public List<ReviewDTO> listAllProdReviewProcess(PageDTO pv);	//전체 캠핑용품 리뷰조회
	
	public void deleteProdReviewProcess(String prodKeyNum); //캠핑용품 리뷰 삭제

	
	////////////////////////////////////////////
	//캠핑장관리
	public int countCampReviewProcess(Map<String, String> search);	//총 캠핑장 리뷰 조회
	public List<ReviewDTO> listAllCampReviewProcess(PageDTO pv);	//전체 캠핑장 리뷰조회
	
	public void deleteCampReviewProcess(String campRewNum); //캠핑장 리뷰 삭제
}
