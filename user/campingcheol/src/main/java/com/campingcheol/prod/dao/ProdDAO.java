package com.campingcheol.prod.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.prod.dto.ProdCartDTO;
import com.campingcheol.prod.dto.ProdDTO;
import com.campingcheol.prod.dto.ProdOrderDTO;
import com.campingcheol.prod.dto.ProdOrderDetailDTO;
import com.campingcheol.prod.dto.ProdPageDTO;
import com.campingcheol.prod.dto.ProdReviewDTO;

@Mapper
@Repository
public interface ProdDAO {
	//상품총개수 가져오기
	public int prodCount();
	//상품리스트 가져오기
	public List<ProdDTO> prodList(ProdPageDTO pv);
	//상품 상세정보가져오기
	public ProdDTO prodDetail(int prodKeyNum);
	//상품 조회수 갱신하기
	public void prodReadCount(int prodKeyNum);
	//카테고리별 상품 개수 가져오기
	public int prodCategoryCount(String category);
	//카테고리별 상품리스트 가져오기
	public List<ProdDTO> prodCategoryList(ProdPageDTO pv);
	//검색결과 개수 가져오기
	public int searchCount(String search);
	//검색결과에 따른 상품리스트 가져오기
	public List<ProdDTO> prodSearchList(ProdPageDTO pv);


	//장바구니에 똑같은 물건이 있는지 확인해주기 
	public int sameCartProduct(ProdCartDTO cartDTO);
	
	//1) 똑같은 물건이 있으면 정보 업데이트 해주기
	public void updateCart(ProdCartDTO cartDTO);
	
	//2) 똑같은 물건이 없으면 장바구니 insert (나중에 수정)
	public void insertCart(ProdCartDTO cartDTO);
	
	
// 유저별	장바구니 가져오기
	public List<ProdCartDTO> cartList(int userKeynum);

	
// 장바구니 체크값 반전시키기
	public void reverseCheck(int prodCartNum );

//	장바구니 모두 체크하기
	public void cartAllCheck(int userKeynum);
	
//	장바구니 모두 체크해제하기
	public void cartAllDecheck(int userKeynum);
	
	//장바구니에서 삭제하기 
	public void deleteCart(int prodCartNum);
	
//	장바구니 전체 삭제
	public void deleteAllCart(int userKeynum );
	
//	장바구니에서 체크한 결제목록(상품목록)가져오기
	public List<ProdDTO> cartOrderList(int userKeynum );
	
//	장바구니 수량증가
	public void increaseCart(int prodCartNum);
	
//	장바구니 수량 감소
	public void decreaseCart(int prodCartNum);
	
//	결제를 위한 유저정보 가져오기
	public MembersDTO userInfo(int userKeynum);
	
//	통합주문 정보 insert (수정필요)
	public void insertprodOrder(ProdOrderDTO prodOrderDTO);
	
//	prodOrderNum Currval 가져오기 
	public int getOrderNum();
	
//	상세 주문정보 insert 
	public void insertDetail(ProdOrderDetailDTO prodDTO);

	//주문후 해당 제품 장바구니에서 없애기 
	public void deleteByOrder(ProdOrderDetailDTO prodDTO);
	
	
//	유저별 주문내역 개수 가져오기 
	public int orderListCount(int userKeynum);
	
//주문내역가져오기
	public List<ProdOrderDetailDTO> orderList(ProdPageDTO pv);
	
	
//	후기작성하기 (insert)
	public void insertProdReview(ProdReviewDTO prodReviewDTO);
	
//	후기작성후 후기작성여부 true로 변경하기
	public void makeReviewTrue(int prodDetailNum);
	
//	해당 상품에 대한 후기개수 가져오기 
	public int prodReviewCount(int prodKeyNum);
	
//	해당상품에 대한 후기가져오기
	public List<ProdReviewDTO> prodReviewList(ProdPageDTO pv);
	
	
// 후기에 따른	평균 평점 구하기 
	public float avgOfProd(int prodKeynum);
	
	
//	header에 표시할 장바구니 갯수 구하기
	public int countCart(int userKeynum);

//	결제 완료 후 재고관리 
	public void stockUpdate(Map<String, Object> stockmap);
	
	
}
