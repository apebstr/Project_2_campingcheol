package com.admin.campingcheol.manage.service;

import java.util.List;
import java.util.Map;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.OrderDTO;
import com.admin.campingcheol.manage.dto.ReservDTO;

public interface OrderService {
	
	////////////////////////////////////////////
	//캠핑용품 주문조회
	public int countOrderProcess(Map<String, String> search);	//총 캠핑용품 주문 조회
	public List<OrderDTO> listAllOrderProcess(PageDTO pv);	//전체 캠핑용품 주문조회
	
	public void UpdateOrderCheckProcess(String prodOrderNum); //주문상태 변경

	public OrderDTO listDetailOrderProcess(String prodOrderNum); //주문 상세보기1 - 주문정보
	public List<OrderDTO> listDetailOrderProdProcess(String prodOrderNum); //주문 상세보기2 - 상품정보

	
	////////////////////////////////////////////
	//캠핑장 예약조회
	public int countReservProcess(Map<String, String> search);
	public List<ReservDTO> listAllReservProcess(PageDTO pv);	
}
