package com.campingcheol.my.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.campingcheol.campSite.dto.CampReviewDTO;
import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.my.dto.MyPageDTO;
import com.campingcheol.prod.dto.ProdReviewDTO;



@Mapper
@Repository
public interface MymyDAO {
	
	
    public MembersDTO selectBynum(String userKeynum);
	
    //회원정보 수정
	public void updateUser(MembersDTO dto); 
	
	public void updateByPass(MembersDTO dto);

	
	
	//회원탈퇴
	public void insertDropUser(String userKeynum); 
	
	public void UpdateDropUser(String userKeynum); 
	
	//////////////////////////////////////////////////////////
	
	//캠핑장 후기 개수 가져오기
	public int countCreview(int userKeyNum);
	
	
	//캠핑장 후기가져오기(userKeynum)
	public List<CampReviewDTO> selectCreview(MyPageDTO pv);
	
	
	//캠핑장 후기가져오기(campRewNum)
	public CampReviewDTO selectCKN(int campRewNum);
	
	
	//캠핑용품 후기 개수 가져오기
	public int countPreview(int userKeynum);
	
	
	 //캠핑용품 후기관리(userKeynum)
    public List<ProdReviewDTO> selectPreview(MyPageDTO pv);
    
    
    //캠핑용품 후기가져오기(prodReviewNum)
    public ProdReviewDTO selectPRN(int prodReviewNum);
    
    
    //캠핑장 후기 삭제하기
    public void deleteCreview(int campRewNum);
    
  //캠핑용품 후기 삭제하기
    public void deletePreview(int prodKeyNum);
    
    
  //캠핑장 후기 작성하기
  	public void saveCampReview(CampReviewDTO rdto);
  	
  	//캠핑장 후기작성 여부 변경하기
  	public void campReviewTrue(int campPayKeyNum);
  	
  	//캠핑장 후기 수정하기
  	public void updateCampReview(CampReviewDTO rdto);
    
  	
  	//캠핑용품 후기 수정하기
  	public void updateProdReview(ProdReviewDTO pdto);
}

   


