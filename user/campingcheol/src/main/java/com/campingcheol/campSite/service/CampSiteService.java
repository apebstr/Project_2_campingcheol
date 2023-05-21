package com.campingcheol.campSite.service;

import java.util.List;
import java.util.Map;

import com.campingcheol.campSite.dto.CampJjimDTO;
import com.campingcheol.campSite.dto.CampPayDTO;
import com.campingcheol.campSite.dto.CampPicDTO;
import com.campingcheol.campSite.dto.CampReservDTO;
import com.campingcheol.campSite.dto.CampRevDTO;
import com.campingcheol.campSite.dto.CampRoomDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.campSite.dto.CampSitePageDTO;
import com.campingcheol.members.dto.MembersDTO;

public interface CampSiteService {

	// 캠핑장 리스트 개수 세기(페이징)
	public int countProcess(Map<String, String> search);

	// 캠핑장 상세내용 가져오기
	public CampSiteDTO getContentProcess(int num);

	// 캠핑장 리스트 가져오기 + 캠핑장 검색하기 + 메인페이지 캠핑장 검색 + 후기 평균평점 select
	public List<CampSiteDTO> getSearchList(CampSitePageDTO campSitePageDTO);

	// 캠핑장 카테고리별 도시 개수 가져오기
	public int campCategoryCountProcess(String category);

	// 캠핑장 도시 리스트 가져오기
	public List<CampSiteDTO> campCategoryProcess(CampSitePageDTO campSitePageDTO);

	// 캠핑장 사진 가져오기
	public String[] campPicProcess(int campkeynum);

	// 캠핑장 room 정보 가져오기
	public List<CampRoomDTO> campRoomProcess(int campkeynum);

	// 상세정보 찜여부 확인 데이터
	public int campLikeLocProcess(String userID, int campkeynum);

	// 상세정보 찜하기
	public void campLikeProcess(CampJjimDTO campJjimDTO);

	// 상세정보 찜취소
	public void campLikedelProcess(String userID, int campkeynum);

	// 주문내역 저장하기
	public void campReservSavePro(CampReservDTO campReservDTO);

	// 결제 고유번호(campReservNum) 가져오기
	public int inheCampReservNum();

	// 결제정보 가져오기
	public void campPayProcess(CampPayDTO campPayDTO);

	// 태그 검색
	public List<CampSiteDTO> campsiteTagPro(CampSitePageDTO campSitePageDTO);

	// 태그 검색 갯수
	public int tagPagingPro(CampSitePageDTO campSitePageDTO);

	// 캠핑장 후기 가져오기
	public List<CampRevDTO> campReviewPro(CampSitePageDTO campSitePageDTO);

	// 캠핑장 후기 페이징
	public int reviewCountPro(Map<String, Integer> review);

}
