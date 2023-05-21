package com.admin.campingcheol.manage.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.ReviewDTO;


@Mapper
@Repository
public interface ReviewDAO {
	
	/////캠핑용품 리뷰
	public int countProdReview(Map<String, String> search); //전체 상품 총 리뷰
	public List<ReviewDTO> listAllProdReview(PageDTO pv); //전체 상품 리뷰
	
	public void deleteProdReview(String prodKeyNum); //캠핑용품 리뷰 삭제
	
	///캠핑장 리뷰
	public int countCampReview(Map<String, String> search); //전체 캠핑장 총 리뷰
	public List<ReviewDTO> listAllCampReview(PageDTO pv); //전체 캠핑장 리뷰
	
	public void deleteCampReview(String campRewNum); //캠핑장 리뷰 삭제
}
