package com.campingcheol.my.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.campingcheol.campSite.dto.CampPicDTO;
import com.campingcheol.campSite.dto.CampReviewDTO;
import com.campingcheol.campSite.dto.CampRoomDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.my.dto.CampMyPageDTO;
import com.campingcheol.my.dto.MyPageDTO;
import com.campingcheol.my.service.CampcartService;
import com.campingcheol.my.service.MymyService;
import com.campingcheol.prod.dto.ProdPageDTO;
import com.campingcheol.prod.dto.ProdReviewDTO;


@CrossOrigin("*")
@RestController
public class MymyController {
	
	private int currentPage;
	
	@Autowired
	private MymyService mymyService;

	@Autowired
	private CampcartService campcartService;

	@Autowired
	private MyPageDTO mpdto;
	
	@Autowired
	private CampMyPageDTO cmpdto;

	@Autowired
	private BCryptPasswordEncoder encoderPassword;

	public MymyController() {

	}

	// http://localhost:8090/my/my/4

	//회원정보 가져오기
	@GetMapping("/my/my/{userKeynum}")
	public MembersDTO getUser(@PathVariable("userKeynum") String userKeynum) {

		return mymyService.updateUserProcess(userKeynum);

	}

	//회원정보 수정하기
	@PostMapping("/my/my/update")
	public void updateUser(@RequestBody MembersDTO dto) {
		System.out.println(dto.getUserID());
		System.out.println(dto.getUserNick());
		System.out.println(dto.getUserAddr());

		dto.setUserPass(encoderPassword.encode(dto.getUserPass()));
		mymyService.updateMemberProcess(dto); // 수정된 사용자 정보를 업데이트
	}



	//회원탈퇴
	@PutMapping("/my/my/drop/{userKeynum}")      
	public void updateExecute(@PathVariable("userKeynum") String userKeynum) {
		System.out.println(userKeynum);
		mymyService.DropUserProcess(userKeynum);
	}//updateExecute


	////////////////////////////////////////////////////////////////////////////


	//찜목록에 있는 캠핑장 정보 가져오기
	@GetMapping("/my/camp/cart/{currentPage}/{userID}")
	public Map<String, Object> listExecute(@PathVariable("userID") String userID, @PathVariable("currentPage") int currentPage, CampMyPageDTO pv) {
		System.out.println("userID : "+userID);

		
		Map<String, Object> map = new HashMap<>();
        int totalRecord = campcartService.campLikeCountProcess(userID);
		System.out.println("totalRecord : "+ totalRecord);
	
        if(totalRecord >= 1) {
        	this.currentPage=currentPage;
        	this.mpdto = new MyPageDTO(pv.getCurrentPage(), totalRecord);
        	this.mpdto.setUserID(userID);
        	map.put("myList", campcartService.listProcess(this.mpdto));
        	map.put("pv", this.mpdto);
       
        }
        return map;
	}

	

	//캠핑장 찜목록에서 삭제하기
	@DeleteMapping("/my/camp/cart/delete/{campKeyNum}")
	public void deleteCartExecute(@PathVariable("campKeyNum") int campKeyNum, HttpServletRequest request) {
		campcartService.deleteCartProcess(campKeyNum);
		
	}


	////////////////////////////////////////////////////////////////////////	

	//캠핑장 이용내역 가져오기
	@GetMapping("/my/camp/payment/{currentPage}/{userKeyNum}")
	public Map<String, Object> selectByCampExecute(@PathVariable("userKeyNum") int userKeyNum, @PathVariable("currentPage")int currentPage, CampMyPageDTO pv ) {
		Map<String, Object> selectCamp = new HashMap<>();
		int totalRecord = campcartService.countByCampProcess(userKeyNum);
		
		if(totalRecord >=1) {
			this.currentPage= currentPage;
			this.cmpdto = new CampMyPageDTO(pv.getCurrentPage(), totalRecord);
			this.cmpdto.setUserKeyNum(userKeyNum);
			selectCamp.put("selectCamp", campcartService.selectByCampProcess(this.cmpdto));
			selectCamp.put("pv", this.cmpdto);
		}
		return selectCamp;
	
	}

	//캠핑용품 결제내역 가져오기
	@GetMapping("/my/prod/payment/{currentPage}/{userKeynum}")
	public Map<String, Object> selectByProdExecute(@PathVariable("userKeynum") String userKeynum, @PathVariable("currentPage")int currentPage, MyPageDTO pv ) {
		System.out.println(userKeynum);
		
		Map<String, Object> selectProd = new HashMap<>();
		int totalRecord = campcartService.prodOrderCountProcess(userKeynum);
		System.out.println(totalRecord);
		
		if(totalRecord >=1) {
			
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();
			
//			this.currentPage= currentPage;
			this.mpdto = new MyPageDTO(this.currentPage, totalRecord);
			this.mpdto.setUserKeynum(userKeynum);

			
			//System.out.println(this.mpdto.getUserKeynum(userKeynum));
			selectProd.put("selectProd", campcartService.selectByProdProcess(this.mpdto));
		    selectProd.put("pv", this.mpdto);
		}
		return selectProd;
	}
	


	///////////////////////////////////////////////////////////////////////

	//캠핑장 후기 가져오기(userKeynum)
	@GetMapping("/my/review/camp/{currentPage}/{userKeyNum}")
	public Map<String, Object> selectCreviewExecute(@PathVariable("userKeyNum") int userKeyNum, @PathVariable("currentPage")int currentPage, MyPageDTO pv ) {
		Map<String, Object> map = new HashMap<>();
		int totalRecord = mymyService.countCreviewProcess(userKeyNum);
		
		if(totalRecord >=1) {
			this.currentPage= currentPage;
			this.mpdto = new MyPageDTO(pv.getCurrentPage(), totalRecord);
			this.mpdto.setUserKeyNum(userKeyNum);
			map.put("selectCamp", mymyService.selectCreviewProcess(this.mpdto));
			map.put("pv", this.mpdto);
		}
		return map;
	}
	
	
	
	//캠핑장 후기 가져오기(campRewNum)
	@GetMapping("/my/review/camp/modal/{campRewNum}")
	public CampReviewDTO selectCKNExecute(@PathVariable("campRewNum") int campRewNum) {
		
		return mymyService.selectCKNProcess(campRewNum);
	}
	

	
	
	
	//캠핑용품 후기 가져오기(userKeynum)
	@GetMapping("/my/review/prod/{currentPage}/{userKeyNum}")
	public Map<String, Object> selectPreviewExecute(@PathVariable("userKeyNum") int userKeyNum, @PathVariable("currentPage")int currentPage, MyPageDTO pv ) {
		Map<String, Object> map = new HashMap<>();
		int totalRecord = mymyService.countPreviewProcess(userKeyNum);
		
		if(totalRecord >=1) {
			this.currentPage= currentPage;
			this.mpdto = new MyPageDTO(pv.getCurrentPage(), totalRecord);
			this.mpdto.setUserKeyNum(userKeyNum);
			map.put("selectProd", mymyService.selectPreviewProcess(this.mpdto));
			map.put("pv", this.mpdto);
		}
		return map;
	}
	
	
	//캠핑용품 후기 가져오기(prodReviewNum)
	@GetMapping("/my/review/prod/modal/{prodReviewNum}")
	public ProdReviewDTO selectPRNExecute(@PathVariable("prodReviewNum") int prodReviewNum) {
		System.out.println(prodReviewNum);
		return mymyService.selectPRNProcess(prodReviewNum);
	}
	
	
	
	//캠핑장 후기 삭제하기
	@DeleteMapping("/my/review/camp/delete/{campRewNum}")
	public void deleteCreviewExecute(@PathVariable("campRewNum") int campRewNum, HttpServletRequest request) {
		mymyService.deleteCreviewProcess(campRewNum);
	
	
    }
	
	//캠핑용품 후기 삭제하기
	@DeleteMapping("/my/review/prod/delete/{prodReviewNum}")
	public void deletePreviewExecute(@PathVariable("prodReviewNum") int prodReviewNum, HttpServletRequest request) {
		mymyService.deletePreviewProcess(prodReviewNum);
	
    }
	
	
	 //캠핑장 후기 작성하기
	@PostMapping("/my/review/camp/write/{campKeyNum}")
	public void saveCampReviewExecute(@PathVariable("campKeyNum") int campKeyNum, @RequestBody CampReviewDTO rdto) {
		rdto.setCampKeyNum(campKeyNum);
		System.out.println(rdto.getUserKeynum());
	
	    mymyService.saveCampReviewProcess(rdto);
	}
	
	
	
	//캠핑장 후기작성 여부 변경하기
	@PutMapping("/my/review/camp/true/{campPayKeyNum}")
	public void campReviewTrueExecute(@PathVariable("campPayKeyNum") int campPayKeyNum) {
		mymyService.campReviewTrueProcess(campPayKeyNum);
	}
	
	
	//캠핑장 후기 수정하기
	@PutMapping("/my/review/camp/update/{campRewNum}")
	public void updateCampReviewExecute(@PathVariable("campRewNum") int campRewNum, @RequestBody CampReviewDTO rdto) {
	    rdto.setCampRewNum(campRewNum);
	    mymyService.updateCampReviewProcess(rdto);
	}
	
	
	//캠핑용품 후기 수정하기
	@PutMapping("/my/review/prod/update")
	public void updateProdReviewExecute(@RequestBody ProdReviewDTO pdto) {
		int prodReviewNum = pdto.getProdReviewNum();
		pdto.setProdReviewNum(prodReviewNum);
		System.out.println("check" + prodReviewNum);
		mymyService.updateProdReviewProcess(pdto);
	}
	
	
	
	}