package com.campingcheol.campSite.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campingcheol.campSite.dao.CampSiteDAO;
import com.campingcheol.campSite.dto.CampJjimDTO;
import com.campingcheol.campSite.dto.CampPayDTO;
import com.campingcheol.campSite.dto.CampReservDTO;
import com.campingcheol.campSite.dto.CampRevDTO;
import com.campingcheol.campSite.dto.CampRoomDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.campSite.dto.CampSitePageDTO;
import com.campingcheol.members.dto.MembersDTO;

@Service
public class CampSiteServiceImp implements CampSiteService {

	@Autowired
	private CampSiteDAO campSiteDAO;

	public CampSiteServiceImp() {

	}

	public void setCampSiteDAO(CampSiteDAO campSiteDAO) {
		this.campSiteDAO = campSiteDAO;
	}

	// 캠핑장 리스트 개수 세기(페이징)
	@Override
	public int countProcess(Map<String, String> search) {
		System.out.println(search);
		return campSiteDAO.count(search);
	}

	// 캠핑장 상세내용 가져오기
	@Override
	public CampSiteDTO getContentProcess(int num) {
		return campSiteDAO.getContent(num);
	}

	// 캠핑장 리스트 가져오기 + 캠핑장 검색하기 + 메인페이지 캠핑장 검색 + 후기 평균평점 select
	@Override
	public List<CampSiteDTO> getSearchList(CampSitePageDTO campSitePageDTO) {
		System.out.println("서비스: " + campSitePageDTO.getCampDo());
		return campSiteDAO.selectSearchList(campSitePageDTO);
	}

	// 캠핑장 카테고리별 도시 개수 가져오기
	@Override
	public int campCategoryCountProcess(String category) {
		return campSiteDAO.campCategoryCount(category);
	}

	// 캠핑장 도시 리스트 가져오기
	@Override
	public List<CampSiteDTO> campCategoryProcess(CampSitePageDTO campSitePageDTO) {
		return campSiteDAO.campCategory(campSitePageDTO);
	}

	// 캠핑장 상세사진 가져오기
	@Override
	public String[] campPicProcess(int campkeynum) {
		return campSiteDAO.campPic(campkeynum);
	}

	// 캠핑장 room 정보 가져오기
	@Override
	public List<CampRoomDTO> campRoomProcess(int campkeynum) {
		return campSiteDAO.campRoom(campkeynum);
	}

	// 상세정보 찜여부 확인 데이터
	@Override
	public int campLikeLocProcess(String userID, int campkeynum) {

		Map<Object, Object> Like = new HashMap<Object, Object>();
		Like.put("userID", userID);
		Like.put("campKeyNum", campkeynum);
		return campSiteDAO.campLikeLoc(Like);
	}

	// 상세정보 찜하기
	@Override
	public void campLikeProcess(CampJjimDTO campJjimDTO) {
		campSiteDAO.campLike(campJjimDTO);
	}

	// 상세정보 찜취소
	@Override
	public void campLikedelProcess(String userID, int campkeynum) {

		Map<Object, Object> del = new HashMap<Object, Object>();
		del.put("userID", userID);
		del.put("campKeyNum", campkeynum);
		campSiteDAO.campLikedel(del);

	}

	// 주문내역 저장하기
	@Override
	public void campReservSavePro(CampReservDTO campReservDTO) {
		campSiteDAO.campReservSave(campReservDTO);

	}

	// 결제 고유번호(campReservNum) 가져오기
	@Override
	public int inheCampReservNum() {
		return campSiteDAO.getCampReservNum();
	}

	// 결제정보 저장하기
	@Override
	public void campPayProcess(CampPayDTO campPayDTO) {
		campSiteDAO.campPay(campPayDTO);

	}

	// 태그 검색
	@Override
	public List<CampSiteDTO> campsiteTagPro(CampSitePageDTO campSitePageDTO) {
		System.out.println("리스트 :  " + campSitePageDTO.getTagKeynumList());
		return campSiteDAO.campsiteTag(campSitePageDTO);
	}

	// 태그 검색 갯수
	@Override
	public int tagPagingPro(CampSitePageDTO campSitePageDTO) {
		System.out.println("페이징 : " + campSitePageDTO.getTagCount());
		return campSiteDAO.tagPaging(campSitePageDTO);
	}

	// 캠핑장 후기 가져오기
	@Override
	public List<CampRevDTO> campReviewPro(CampSitePageDTO campSitePageDTO) {
		return campSiteDAO.campReview(campSitePageDTO);
	}

	// 캠핑장 후기 페이징
	@Override
	public int reviewCountPro(Map<String, Integer> review) {
		System.out.println("리뷰카운트");
		return campSiteDAO.reviewCount(review);
	}

}
