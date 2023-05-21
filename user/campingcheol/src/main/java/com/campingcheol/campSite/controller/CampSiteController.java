package com.campingcheol.campSite.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.campingcheol.campSite.dto.CampJjimDTO;
import com.campingcheol.campSite.dto.CampPayDTO;
import com.campingcheol.campSite.dto.CampReservDTO;
import com.campingcheol.campSite.dto.CampRevDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.campSite.dto.CampSitePageDTO;
import com.campingcheol.campSite.service.CampSiteService;

@CrossOrigin("*")
@RestController
public class CampSiteController {


	@Autowired
	private CampSiteService campSiteService;

	@Autowired
	private CampSitePageDTO campSitePageDTO;
	private int currentPage;

	public CampSiteController() {

	}

	// 캠핑장 리스트 + 리스트 내 검색 + 메인페이지 검색
	// required = false => 생략될 수 있음
	@GetMapping("/camp/list/{currentPage}")
	public Map<String, Object> searchExecute(@PathVariable("currentPage") int currentPage, CampSitePageDTO pv,
			@RequestParam String searchWord, @RequestParam String campDo) {
		System.out.println(searchWord);
		System.out.println(campDo);

		// react에서 받아온 검색어
		Map<String, String> search = new HashMap<String, String>();
		search.put("campDo", campDo);
		search.put("searchWord", searchWord);

		Map<String, Object> map = new HashMap<String, Object>();
		int totalRecord = campSiteService.countProcess(search);
		System.out.println(totalRecord);

		if (totalRecord >= 1) {
			this.currentPage = currentPage;

			this.campSitePageDTO = new CampSitePageDTO(pv.getCurrentPage(), totalRecord, pv.getSearchWord(),
					pv.getCampDo());
			map.put("aList", campSiteService.getSearchList(this.campSitePageDTO));
			map.put("pv", this.campSitePageDTO);

			System.out.println();
			System.out.println("리스트:" + totalRecord);

		}
		return map;

	}

	

	
	// 캠핑장 상세내용 가져오기 + 후기 평균평점 select(회원)
	@GetMapping("/camp/view/{num}")
	public CampSiteDTO viewExecute(@PathVariable("num") int num, @RequestParam String userID) {

		// 캠핑장 상세내용
		CampSiteDTO campDTO = campSiteService.getContentProcess(num);
		campDTO.setCampPics(campSiteService.campPicProcess(num));
		campDTO.setCampRooms(campSiteService.campRoomProcess(num));

		// 상품 찜 여부 확인용 데이터 가져오기
		campDTO.setCheckJjim(campSiteService.campLikeLocProcess(userID, num));

		return campDTO;
	}
	
	
	
	
	// 캠핑장 상세내용 가져오기 + 후기 평균평점 select(비회원)
	@GetMapping("/camp/view/Welcome/{num}")
	public CampSiteDTO NoViewExecute(@PathVariable("num") int num) {

		// 캠핑장 상세내용
		CampSiteDTO campDTO = campSiteService.getContentProcess(num);
		campDTO.setCampPics(campSiteService.campPicProcess(num));
		campDTO.setCampRooms(campSiteService.campRoomProcess(num));
		System.out.println("사진나오니!?!!?");

		return campDTO;
	}
	
	
	
	
	

	
	// 캠핑장 후기 가져오기
	@GetMapping("/camp/view/{campKeyNum}/{currentPage}")
	public Map<String, Object> campReviewList(@PathVariable("campKeyNum") int campKeyNum, CampSitePageDTO pv,
			@PathVariable("currentPage") int currentPage) {

		Map<String, Integer> review = new HashMap<String, Integer>(); // reveiw 의 hashmap 선언(단순 선언문)
		review.put("campKeyNum", campKeyNum); // String이랑 INteger이름 같아야함 /"campKeyNum" => 이건 매퍼 컬럼명임 꼭 맞춰야함
		// ex ) where b.campKeyNum = #{campKeyNum}

		Map<String, Object> map = new HashMap<String, Object>();
		int totalRecord = campSiteService.reviewCountPro(review);

		if (totalRecord >= 1) {
			this.currentPage = currentPage;
			this.campSitePageDTO = new CampSitePageDTO(pv.getCurrentPage(), totalRecord, pv.getCampKeyNum());
			map.put("aList", campSiteService.campReviewPro(this.campSitePageDTO));
			map.put("pv", this.campSitePageDTO);

			System.out.println("토탈: " + totalRecord);

		}

		return map;
	}

	
	
	// 상세정보 찜하기
	@PostMapping("/camp/Jjim/{campKeyNum}")
	public void likeExecute(CampJjimDTO campJjimDTO, @PathVariable("campKeyNum") String campKeynum) {
		campSiteService.campLikeProcess(campJjimDTO);
	}

	// 상세정보 찜취소
	@DeleteMapping("/camp/delete/{campKeyNum}")
	public void deleteExecute(@PathVariable("campKeyNum") int campKeynum, @RequestParam("userID") String userID) {
		campSiteService.campLikedelProcess(userID, campKeynum);
	}

	// 주문내역 저장하기 
	@PostMapping("/camp/view/orderfin")
	public int reservSave(CampReservDTO campReservDTO) {

		campSiteService.campReservSavePro(campReservDTO);

		int campReservNum = campSiteService.inheCampReservNum();
		System.out.println("campReservNum :" + campReservNum);
		
		return campReservNum;
	}

	// 결제내역 저장하기
	@PostMapping("/camp/view/orderfin/fin")
	public void paySave(CampPayDTO campPayDTO, int campReservNum) {
		campPayDTO.setCampReservNum(campReservNum);
		System.out.println("결제되었다 :" + campReservNum);
		campSiteService.campPayProcess(campPayDTO);

	}

	// 태그검색 + 태그검색 페이징
	@GetMapping("/camp/list/{currentPage}/{tags}")
	public Map<String, Object> tagExecute(@PathVariable("currentPage") int currentPage,
			@PathVariable("tags") String tags, CampSitePageDTO pv) {

		String[] tagStr = tags.split(",");// tags 문자열을 쉼표 기준으로 나누어서 tagStr 배열에 저장

		List<Integer> tagList = new ArrayList<Integer>(); // tagList라는 ArrayList 생성

		for (String element : tagStr) { // 개선된 for문
			tagList.add(Integer.parseInt(element)); // Integer.parseInt를 이용해 문자열 요소를 정수로 변환해서 tagList에 추가
		}

		Map<String, Object> map = new HashMap<String, Object>();

		pv.setTagKeynumList(tagList);
		pv.setTagCount(tagList.size());
		int totalRecord = campSiteService.tagPagingPro(pv);
		this.currentPage = currentPage;

		if (totalRecord >= 1) {
			System.out.println("토탈 :" + totalRecord);

			this.campSitePageDTO = new CampSitePageDTO(pv.getCurrentPage(), totalRecord);
			this.campSitePageDTO.setTags(tags);
			this.campSitePageDTO.setTagKeynumList(tagList);
			this.campSitePageDTO.setTagCount(tagList.size());

			map.put("tagKeynumList", tagList); // tagList를 컨트롤러에서 처리하기 위해 Map객체에 저장
			map.put("tagCount", tagList.size()); // 갯수만큼 돌려준다, 검색할 태그의 갯수
		}

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("aList", campSiteService.campsiteTagPro(this.campSitePageDTO));
		result.put("pv", this.campSitePageDTO);

		System.out.println("태그이다 : " + tags);

		return result;
	}

}
