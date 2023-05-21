package com.campingcheol.campSite.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.campingcheol.campSite.dto.CampJjimDTO;
import com.campingcheol.campSite.dto.CampPayDTO;
import com.campingcheol.campSite.dto.CampReservDTO;
import com.campingcheol.campSite.dto.CampRevDTO;
import com.campingcheol.campSite.dto.CampRoomDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.campSite.dto.CampSitePageDTO;

@Mapper
@Repository
public interface CampSiteDAO {

	//캠핑장 리스트 개수 세기(페이징)
	public int count(Map<String, String> search);

	// 캠핑장 상세내용 가져오기
	public CampSiteDTO getContent(int num);

	// 캠핑장 리스트 가져오기 + 캠핑장 검색하기  + 메인페이지 캠핑장 검색 + 후기 평균평점 select
	public List<CampSiteDTO> selectSearchList(CampSitePageDTO campSitePageDTO);

	// 캠핑장 카테고리별 도시 개수 가져오기
	public int campCategoryCount(String category);

	// 캠핑장 도시 리스트 가져오기
	public List<CampSiteDTO> campCategory(CampSitePageDTO campSitePageDTO);

	// 캠핑장 사진 가져오기
	public String[] campPic(int campkeynum);

	// 캠핑장 room 정보 가져오기
	public List<CampRoomDTO> campRoom(int campkeynum);

	// 상세정보 찜여부 확인 데이터
	public int campLikeLoc(Map<Object, Object> Like);

	// 상세정보 찜하기
	public void campLike(CampJjimDTO campJjimDTO);

	// 상세정보 찜취소
	public void campLikedel(Map<Object, Object> del);

	// 주문내역 저장하기
	public void campReservSave(CampReservDTO campReservDTO);
	
	//campReservNum Currval 가져오기
	public int getCampReservNum();

	// 결제정보 가져오기
	public void campPay(CampPayDTO campPayDTO);

	// 태그 검색
	public List<CampSiteDTO> campsiteTag(CampSitePageDTO campSitePageDTO);

	// 태그 검색 갯수
	public int tagPaging(CampSitePageDTO campSitePageDTO);

	// 캠핑장 후기 가져오기
	public List<CampRevDTO> campReview(CampSitePageDTO campSitePageDTO);

	// 캠핑장 후기 페이징
	public int reviewCount(Map<String, Integer> review);
	


}
