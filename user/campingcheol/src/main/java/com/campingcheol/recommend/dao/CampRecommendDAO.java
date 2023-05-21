package com.campingcheol.recommend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.campingcheol.campSite.dto.CampPayDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.prod.dto.ProdDTO;

@Mapper
@Repository
public interface CampRecommendDAO {
	
    // 결제 내역 가져오기
//    public List<CampPayDTO> getCampPayList(String userID);
//
//    //마지막 결제
//    public int getLatestPaidCampKeyNum(String userID);
	
	//유저가 마지막으로 결제한 CampKeyNum 가져오기 
	public String getCampKeyNum(String userKeyNum);

	//큐레이팅결과 -> 캠핑장정보 가져오기
	public CampSiteDTO campInfo(int campKeyNum);
	
//	큐레이팅이 없을 경우 후기 평균이 높은 거 가져오
	public List<CampSiteDTO> topCampSite();
	
//	메인페이지 상품리스트 가져오기 
	public List<ProdDTO> recentProdList();
	
}
