package com.admin.campingcheol.manage.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.OrderDTO;
import com.admin.campingcheol.manage.dto.ReservDTO;


@Mapper
@Repository
public interface OrderDAO {
	
	/////캠핑용품 주문
	public int countOrder(Map<String, String> search); //전체 총 상품
	public List<OrderDTO> listAllOrder(PageDTO pv); //전체 상품 목록
	
	public void UpdateOrderCheck(String prodOrderNum); //주문상태 변경
	
	public OrderDTO listDetailOrder(String prodOrderNum); //주문 상세보기1 - 주문정보
	public List<OrderDTO> listDetailOrderProd(String prodOrderNum); //주문 상세보기2 - 상품정보

	
	////캠핑장예약
	//캠핑장조회
	public int countReserv(Map<String, String> search);
	public List<ReservDTO> listAllReserv(PageDTO pv); //전체 상품 목록
}
