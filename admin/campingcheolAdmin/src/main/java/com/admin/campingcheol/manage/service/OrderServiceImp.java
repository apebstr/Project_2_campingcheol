package com.admin.campingcheol.manage.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dao.OrderDAO;
import com.admin.campingcheol.manage.dto.OrderDTO;
import com.admin.campingcheol.manage.dto.ReservDTO;

@Service
public class OrderServiceImp implements OrderService{

	@Autowired
	private OrderDAO orderDao;

	public OrderServiceImp() {
		// TODO Auto-generated constructor stub
	}

	////////////////////////////////////////////////
	//캠핑용품 갯수
	@Override
	public int countOrderProcess(Map<String, String> search) {
		return orderDao.countOrder(search);
	}

	//전체 캠핑용품 주문리스트
	@Override
	public List<OrderDTO> listAllOrderProcess(PageDTO pv) {
		return orderDao.listAllOrder(pv);
	}

	//주문상태변경
	@Override
	public void UpdateOrderCheckProcess(String prodOrderNum) {
		orderDao.UpdateOrderCheck(prodOrderNum);	
	}
	
	//주문 상세보기1 - 주문정보
	@Override
	public OrderDTO listDetailOrderProcess(String prodOrderNum) {
		return orderDao.listDetailOrder(prodOrderNum);
	}

	//주문 상세보기2 - 상품정보
	@Override
	public List<OrderDTO> listDetailOrderProdProcess(String prodOrderNum) {
		return orderDao.listDetailOrderProd(prodOrderNum);
	}
	
	////////////////////////////////////////////////
	//캠핑용품예약조회
	@Override
	public int countReservProcess(Map<String, String> search) {
		return orderDao.countReserv(search);
	}

	@Override
	public List<ReservDTO> listAllReservProcess(PageDTO pv) {
		return orderDao.listAllReserv(pv);
	}





}
