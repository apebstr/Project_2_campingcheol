package com.campingcheol.my.service;

import java.util.List;

import com.campingcheol.campSite.dto.CampReviewDTO;
import com.campingcheol.members.dto.AuthInfo;
import com.campingcheol.members.dto.ChangePwdCommand;
import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.my.dto.MyPageDTO;
import com.campingcheol.prod.dto.ProdReviewDTO;

public interface MymyService {
	   //회원정보 가져오기
	   public MembersDTO selectBynumProcess(String userKeynum);
	   
	   public MembersDTO updateUserProcess(String userKeynum);
	   
	   public AuthInfo updateMemberProcess(MembersDTO dto);
	  
	   public void updatePassProcess(String userKeynum, ChangePwdCommand changePwd);
	   
		//회원탈퇴
		public void DropUserProcess(String userKeynum);
		
	
		//////////////////////////////////////////////////////////////////
		
		//캠핑장 후기 개수 가져오기
		public int countCreviewProcess(int userKeyNum);
		
		
		//캠핑장 후기가져오기(userKeynum)
		public List<CampReviewDTO> selectCreviewProcess(MyPageDTO pv);
		
		//캠핑장 후기가져오기(campRewNum)
		public CampReviewDTO selectCKNProcess(int campRewNum);
		
		
		//캠핑용품 후기 개수 가져오기
		public int countPreviewProcess(int userKeynum);
		
		
		//캠핑용품 후기가져오기(userKeynum)
	    public List<ProdReviewDTO> selectPreviewProcess(MyPageDTO pv);
	    
	  //캠핑용품 후기가져오기(prodReviewNum)
	    public ProdReviewDTO selectPRNProcess(int prodReviewNum);
	    
	   //캠핑장 후기 삭제하기
	    public void deleteCreviewProcess(int campRewNum);
	    
	   //캠핑용품 후기 삭제하기
	    public void deletePreviewProcess(int prodReviewNum);
	    
	    
	    
	    //캠핑장 후기 작성하기
	  	public void saveCampReviewProcess(CampReviewDTO rdto);
	  	
	   //캠핑장 후기작성 여부 변경하기
	  	public void campReviewTrueProcess(int campPayKeyNum);
	  	
	  	//캠핑장 후기 수정하기
	  	public void updateCampReviewProcess(CampReviewDTO rdto);
	    
	  //캠핑용품 후기 수정하기
	  	public void updateProdReviewProcess(ProdReviewDTO pdto);
	  	
}
