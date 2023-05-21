package com.campingcheol.my.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.campingcheol.campSite.dto.CampPicDTO;
import com.campingcheol.campSite.dto.CampReviewDTO;
import com.campingcheol.campSite.dto.CampRoomDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.my.dto.CampMyPageDTO;
import com.campingcheol.my.dto.MyPageDTO;
import com.campingcheol.prod.dto.ProdOrderDetailDTO;


@Mapper
@Repository
public interface CampcartDAO {

	//유저별 찜목록 개수 가져오기 
	public int campLikeCount(String userID);
	
	//찜목록에 있는 캠핑장 정보 가져오기
	public List<CampSiteDTO> list(MyPageDTO pv);
	
	
	//찜목록에서 삭제
	public void deleteCart(int campKeyNum);
	
	/////////////////////////////////////////////////////////
	
	//캠핑장 이용내역 개수 가져오기
	public int countByCamp(int userKeynum);
	
	//캠핑장 이용내역 가져오기
	public List<CampRoomDTO> selectByCamp(CampMyPageDTO pv);
	
    //유저별 주문내역 개수 가져오기 
	public int prodOrderCount(String userKeynum);
	
	//캠핑용품 결제내역 가져오기
	public List<ProdOrderDetailDTO> selectByProd(MyPageDTO pv);

	

}
