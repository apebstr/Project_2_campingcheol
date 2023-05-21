package com.campingcheol.prod.service;

import java.util.List;
import java.util.Map;

import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.prod.dto.ProdCartDTO;
import com.campingcheol.prod.dto.ProdDTO;
import com.campingcheol.prod.dto.ProdOrderDTO;
import com.campingcheol.prod.dto.ProdOrderDetailDTO;
import com.campingcheol.prod.dto.ProdPageDTO;
import com.campingcheol.prod.dto.ProdReviewDTO;

public interface ProdService {
	//상품개수 호출하기
	public int callProdCount();
	//상품목록 호출하기
	public List<ProdDTO> callProdList(ProdPageDTO pv);
	//상품디테일 호출하기
	public ProdDTO callProdDetail(int prodKeyNum);
	//카테고리별 상품개수 호출하기
	public int callCategoryCount(String category);
	//카테고리별 상품 호출하기
	public List<ProdDTO> callCategoryList(ProdPageDTO pv);
	//검색결과 개수 호출하기
	public int callSearchCount(String search);
	//검색결과에 따른 상품리스트 호출하기
	public List<ProdDTO> callProdSearchList(ProdPageDTO pv);

	
	
//장바구니에 집어넣기
	public void callinsertCart(ProdCartDTO cartDTO);
	
	
//	장바구니 리스트 가져오기 
	public List<ProdCartDTO> callCartList(int userKeynum);
	
//	장바구니 체크값 반전시키기 
	public void callReverseCheck(int prodCartNum);
	
//	장바구니에서 품목 삭제하기
	public void callDeleteCart(int prodCartNum);
	
//	장바구니 전체 삭제
	public void callDeleteAllCart(int userKeynum);
	
//	장바구니 모두 체크
	public void callCartAllCheck(int userKeynum);
	
//	장바구니 모두 체크풀기
	public void callCartAllDecheck(int userKeynum);
	
//장바구니에서 체크한 품목만 가져오기 
	public List<ProdDTO> callCartOrder(int userKeynum);
	
//	장바구니 수량 증가
	public void callIncreaseCart(int prodCartNum);
	
	
//	장바구니 수량 감소
	public void callDecreaseCart(int prodCartNum);
	
	
//	결제를 위한 유저 정보 가져오기 
	public MembersDTO getUserInfo(int userKeynum);
	
//	통합결제정보 삽입하기 
	public void callinsertprodOrder(ProdOrderDTO prodOrderDTO);
	
//	결제 고유번호 가져오기 
	public int callProdorderNum();
	
//	상세결제정보 삽입하기 
	public void callInsertDetail(ProdOrderDetailDTO prodDetailDTO);

	
	//주문후 해당 제품 장바구니에서 없애기 
	public void callDeleteByOrder(ProdOrderDetailDTO prodDTO);
	
	
//	유저별 주문내역 개수 가져오기 
	public int callOrderListCount(int userKeynum);
	
//	주문내역 가져오기
	public List<ProdOrderDetailDTO> callOrderList(ProdPageDTO pv);
	
//	상품후기 저장하기 
	public void callSaveReview(ProdReviewDTO prodReviewDTO);
	
//	상품후기 작성 후 후기작성여부 true로 바꾸기 
	public void callMakeReviewTrue(int prodDetailNum);
	
//	해당 상품에 대한 후기 가져오기 
	public List<ProdReviewDTO> callProdReviewList(ProdPageDTO pv);
	
//	해당 상품에 대한 후기개수 가져오기 
	public int callProdReviewCount(int prodKeyNum);
	
//	상품의 평균별점 구하기 
	public float callAvgOfProd(int prodKeynum);
	
//	header에 표시할 장바구니 개수 가져오기 
	public int callCountCart(int userKeynum);
	
//	결제 완료 후 재고관리 
	public void callStockUpdate(Map<String, Object> stockmap);
	
}


