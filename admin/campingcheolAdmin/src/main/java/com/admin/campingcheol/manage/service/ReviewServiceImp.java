package com.admin.campingcheol.manage.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dao.ReviewDAO;
import com.admin.campingcheol.manage.dto.ReviewDTO;

@Service
public class ReviewServiceImp implements ReviewService{

	@Autowired
	private ReviewDAO reviewDao;

	public ReviewServiceImp() {
		// TODO Auto-generated constructor stub
	}

	////////////////////////////////////////////////
	//캠핑용품 리뷰 갯수
	@Override
	public int countProdReviewProcess(Map<String, String> search) {
		return reviewDao.countProdReview(search);
	}

	//전체 캠핑용품 리뷰 리스트
	@Override
	public List<ReviewDTO> listAllProdReviewProcess(PageDTO pv) {
		return reviewDao.listAllProdReview(pv);
	}
	
	//캠핑용품 리뷰삭제
	@Override
	public void deleteProdReviewProcess(String prodKeyNum) {
		reviewDao.deleteProdReview(prodKeyNum);
		
	}

	////////////////////////////////////////////////////
	//캠핑장 후기 갯수
	@Override
	public int countCampReviewProcess(Map<String, String> search) {
		return reviewDao.countCampReview(search);
	}

	//전체 캠핑장 후기 리스트
	@Override
	public List<ReviewDTO> listAllCampReviewProcess(PageDTO pv) {
		return reviewDao.listAllCampReview(pv);
	}

	//캠핑장 리뷰 삭제
	@Override
	public void deleteCampReviewProcess(String campRewNum) {
		reviewDao.deleteCampReview(campRewNum);
		
	}
	
	////////////////////////////////////////////////


}
