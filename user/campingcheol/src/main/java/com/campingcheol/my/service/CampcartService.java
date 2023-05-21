package com.campingcheol.my.service;

import java.util.List;

import com.campingcheol.campSite.dto.CampPicDTO;
import com.campingcheol.campSite.dto.CampRoomDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.my.dto.CampMyPageDTO;
import com.campingcheol.my.dto.MyPageDTO;
import com.campingcheol.prod.dto.ProdOrderDetailDTO;

public interface CampcartService {

	
	//유저별 찜목록 개수 가져오기 
	public int campLikeCountProcess(String userID);
		
	//찜목록에 있는 캠핑장 정보 가져오기
	public List<CampSiteDTO> listProcess(MyPageDTO pv);
	
	

	//찜목록에서 삭제
	public void deleteCartProcess(int campKeyNum);
	
	
	///////////////////////////////////////////////////////
	
	//캠핑장 이용내역 개수 가져오기
	public int countByCampProcess(int userKeynum);
		
	//캠핑장 이용내역 가져오기
	public List<CampRoomDTO> selectByCampProcess(CampMyPageDTO pv);
	
	 //유저별 주문내역 개수 가져오기 
	public int prodOrderCountProcess(String userKeynum);
	
	//캠핑용품 결제내역 가져오기
	public List<ProdOrderDetailDTO> selectByProdProcess(MyPageDTO pv);	
}
