package com.campingcheol.recommend.service;


import java.util.List;

import com.campingcheol.campSite.dto.CampPayDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.prod.dto.ProdDTO;

public interface CampRecommendService {
	
	//유저가 마지막으로 결제한 CampKeyNum 가져오기
	public String getCampKeyNumProcess(String userKeyNum);

	//큐레이팅결과 -> 캠핑장정보 가져오기
	public CampSiteDTO campInfoProcess(int campKeyNum);
	

	//캠핑장정보나 유저keynum이 없을 경우 후기 높은순 
	public List<CampSiteDTO> callTopCampSite();
	
	//메인페이지 상품리스트 가져오기 
	public List<ProdDTO> callRecentProdList();
}