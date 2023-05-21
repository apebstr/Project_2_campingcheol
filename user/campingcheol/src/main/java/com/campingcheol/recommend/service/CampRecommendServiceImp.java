package com.campingcheol.recommend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campingcheol.campSite.dto.CampPayDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.prod.dto.ProdDTO;
import com.campingcheol.recommend.dao.CampRecommendDAO;


@Service
public class CampRecommendServiceImp implements CampRecommendService{

	@Autowired
	private CampRecommendDAO campRecommendDAO;

	//유저가 마지막으로 결제한 CampKeyNum 가져오기
	@Override
	public String getCampKeyNumProcess(String userKeyNum) {
		
		return campRecommendDAO.getCampKeyNum(userKeyNum);
	}

	//큐레이팅결과 -> 캠핑장정보 가져오기
	@Override
	public CampSiteDTO campInfoProcess(int campKeyNum) {
		return campRecommendDAO.campInfo(campKeyNum);
	}

	@Override
	public List<CampSiteDTO> callTopCampSite() {
		return campRecommendDAO.topCampSite();
	}

	
//	메인페이지 상품정보 가져오기
	@Override
	public List<ProdDTO> callRecentProdList() {
		return campRecommendDAO.recentProdList();
	}


	

}
