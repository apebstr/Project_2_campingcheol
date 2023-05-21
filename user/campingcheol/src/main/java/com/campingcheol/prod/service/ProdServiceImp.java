package com.campingcheol.prod.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.prod.dao.ProdDAO;
import com.campingcheol.prod.dto.ProdCartDTO;
import com.campingcheol.prod.dto.ProdDTO;
import com.campingcheol.prod.dto.ProdOrderDTO;
import com.campingcheol.prod.dto.ProdOrderDetailDTO;
import com.campingcheol.prod.dto.ProdPageDTO;
import com.campingcheol.prod.dto.ProdReviewDTO;

//import lombok.NoArgsConstructor;

//@NoArgsConstructor
@Service
public class ProdServiceImp implements ProdService {

	@Autowired
	private ProdDAO prodDAO;
	
	public ProdServiceImp() {
		// TODO Auto-generated constructor stub
	}

	@Override // 전체 상품개수 가져오기
	public int callProdCount() {
		return prodDAO.prodCount();
	}

	@Override // 전체 상품리스트가져오기
	public List<ProdDTO> callProdList(ProdPageDTO pv) {
		List<ProdDTO> prodList = prodDAO.prodList(pv);

		// 가격에 쉼표삽입
		for (ProdDTO element : prodList) {
			String price = element.getProdPrice();
			StringBuffer priceBuffer = new StringBuffer(price);

			List<Integer> indexList = new ArrayList<Integer>();

			for (int i = priceBuffer.length() - 3; i > 0; i -= 3) {
				indexList.add(i);
			}

			for (int index : indexList) {
				priceBuffer.insert(index, ",");
			}

			price = priceBuffer.toString();
			element.setProdPrice(price);
		} // 가격쉼표넣기 끝

		return prodList;
	}

	@Override // 특정 상품 상세정보 가져오기
	public ProdDTO callProdDetail(int prodKeyNum) {
		prodDAO.prodReadCount(prodKeyNum);

		ProdDTO prodDatil = prodDAO.prodDetail(prodKeyNum);

		// 가격쉼표넣기
		String price = prodDatil.getProdPrice();
		StringBuffer priceBuffer = new StringBuffer(price);

		List<Integer> indexList = new ArrayList<Integer>();

		for (int i = priceBuffer.length() - 3; i > 0; i -= 3) {
			indexList.add(i);
		}
		for (int index : indexList) {
			priceBuffer.insert(index, ",");
		}
		price = priceBuffer.toString();
		prodDatil.setProdPrice(price);
		// 가격쉼표넣기 끝

		return prodDatil;
	}

	@Override // 특정 카테고리상품개수 가져오기
	public int callCategoryCount(String category) {
		return prodDAO.prodCategoryCount(category);
	}

	@Override // 특정 카테고리상품리스트 가져오기
	public List<ProdDTO> callCategoryList(ProdPageDTO pv) {
		List<ProdDTO> prodList = prodDAO.prodCategoryList(pv);

		// 가격에 쉼표삽입
		for (ProdDTO element : prodList) {
			String price = element.getProdPrice();
			StringBuffer priceBuffer = new StringBuffer(price);

			List<Integer> indexList = new ArrayList<Integer>();

			for (int i = priceBuffer.length() - 3; i > 0; i -= 3) {
				indexList.add(i);
			}

			for (int index : indexList) {
				priceBuffer.insert(index, ",");
			}

			price = priceBuffer.toString();
			element.setProdPrice(price);
		} // 가격쉼표넣기 끝

		return prodList;
	}

	@Override // 검색결과개수 가져오기
	public int callSearchCount(String search) {
		return prodDAO.searchCount(search);
	}

	@Override // 검색결과 상품리스트 가져오기
	public List<ProdDTO> callProdSearchList(ProdPageDTO pv) {

		List<ProdDTO> prodList = prodDAO.prodSearchList(pv);

		// 가격에 쉼표삽입
		for (ProdDTO element : prodList) {
			String price = element.getProdPrice();
			StringBuffer priceBuffer = new StringBuffer(price);

			List<Integer> indexList = new ArrayList<Integer>();

			for (int i = priceBuffer.length() - 3; i > 0; i -= 3) {
				indexList.add(i);
			}

			for (int index : indexList) {
				priceBuffer.insert(index, ",");
			}

			price = priceBuffer.toString();
			element.setProdPrice(price);
		} // 가격쉼표넣기 끝

		return prodList;
	}

	
//	장바구니에 삽입하기
	@Override
	public void callinsertCart(ProdCartDTO cartDTO) {
		int sameProduct = prodDAO.sameCartProduct(cartDTO);
		if(sameProduct>=1) {
			prodDAO.updateCart(cartDTO);
		}if(sameProduct<1) {
			 prodDAO.insertCart(cartDTO);
		}
		
	}

	
//	장바구니 리스트 가져오기 
	@Override
	public List<ProdCartDTO> callCartList(int userKeynum) {
		return prodDAO.cartList(userKeynum);
	}

	
	@Override
	public void callReverseCheck(int prodCartNum) {
	    prodDAO.reverseCheck(prodCartNum);
	}

	
	
	
//	장바구니 삭제하기 
	@Override
	public void callDeleteCart(int prodCartNum) {
		
		prodDAO.deleteCart(prodCartNum);
	}
	
//장바구니에서 전체 삭제하기
	@Override
	public void callDeleteAllCart(int userKeynum) {
		prodDAO.deleteAllCart(userKeynum);
	}

	
//장바구니 수량 증가하기
	@Override
	public void callIncreaseCart(int prodCartNum) {
		prodDAO.increaseCart(prodCartNum);
	}

//	장바구니 수량 감소하기
	@Override
	public void callDecreaseCart(int prodCartNum) {
		prodDAO.decreaseCart(prodCartNum);
	}


	
	//장바구니에서 체크한 품목만 가져오기 
	@Override
	public List<ProdDTO> callCartOrder(int userKeynum) {
		return prodDAO.cartOrderList(userKeynum);
	}

	
	@Override
	public void callCartAllCheck(int userKeynum) {
		
		prodDAO.cartAllCheck(userKeynum);
	}

	@Override
	public void callCartAllDecheck(int userKeynum) {
		// TODO Auto-generated method stub
		prodDAO.cartAllDecheck(userKeynum);
	}


	
//	결제를 위한 유저정보 가져오기
	@Override
	public MembersDTO getUserInfo(int userKeynum) {
		return prodDAO.userInfo(userKeynum);
	}

	
	
//	통합주문정보 삽입하기
	@Override
	public void callinsertprodOrder(ProdOrderDTO prodOrderDTO) {
		prodDAO.insertprodOrder(prodOrderDTO);
		
	}

//	통합주문번호 고유번호 가져오기 
	@Override
	public int callProdorderNum() {
		return prodDAO.getOrderNum();
	}	
	
//	상세주문번호 삽입하기 
	@Override
	public void callInsertDetail(ProdOrderDetailDTO prodDetailDTO) {
		prodDAO.insertDetail(prodDetailDTO);
	}

	
	//주문 완료 후 해당 제품 장바구니에서 삭제하기 
	@Override
	public void callDeleteByOrder(ProdOrderDetailDTO prodDTO) {
		prodDAO.deleteByOrder(prodDTO);
	}


	
	//페이징을 위해 유저별 주문내역 개수 가져오기
	@Override
	public int callOrderListCount(int userKeynum) {
		return prodDAO.orderListCount(userKeynum);
	}

	
// 주문내역 가져오기 
	@Override
	public List<ProdOrderDetailDTO> callOrderList(ProdPageDTO pv) {
		
		return prodDAO.orderList(pv);
	}

	
//	상품후기 저장하기
	@Override
	public void callSaveReview(ProdReviewDTO prodReviewDTO) {
		prodDAO.insertProdReview(prodReviewDTO);
	}
	
//상품후기 작성 후 후기작성여부 true로 바꾸기
	@Override
	public void callMakeReviewTrue(int prodDetailNum) {
		prodDAO.makeReviewTrue(prodDetailNum);
	}

//	상품에 대한 후기정보가져오기
	@Override
	public List<ProdReviewDTO> callProdReviewList(ProdPageDTO pv) {
		return prodDAO.prodReviewList(pv);
	}

//	상품에 대한 후기개수가져오기
	@Override
	public int callProdReviewCount(int prodKeyNum) {
		return prodDAO.prodReviewCount(prodKeyNum);
	}

	//각 상품의 평균 별점 구하기
	@Override
	public float callAvgOfProd(int prodKeynum) {
		return prodDAO.avgOfProd(prodKeynum);
	}

//	header에 표시할 장바구니 개수 구하기 
	@Override
	public int callCountCart(int userKeynum) {
		return prodDAO.countCart(userKeynum);
	}

//	결제 후 재고 관리 
	@Override
	public void callStockUpdate(Map<String, Object> stockmap) {
		prodDAO.stockUpdate(stockmap);
		
	}
	



}
