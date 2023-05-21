package com.admin.campingcheol.manage.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.campingcheol.common.file.FileUpload;
import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.ProdDTO;
import com.admin.campingcheol.manage.service.OrderService;
import com.admin.campingcheol.manage.service.ProdService;

//@CrossOrigin(origins={"http://localhost:3000"})
@CrossOrigin("*")

@RestController
public class OrderController {

	@Autowired
	private OrderService orderService;

	private PageDTO pdto;

	private int currentPage;


	public OrderController() {
		// TODO Auto-generated constructor stub
	}

	//전체 캠핑용품 주문 조회
	@GetMapping("/admin/orders/orderlist/{currentPage}")
	public Map<String, Object> selectAllOrder(@RequestParam ("startDate") String startDate,@RequestParam ("endDate") String endDate,@RequestParam ("state") String state, @RequestParam ("searchKey") String searchKey, @RequestParam ("searchWord") String searchWord,@PathVariable("currentPage") int currentPage, PageDTO pv) {
		System.out.println("startDate : "+ startDate);
		System.out.println("endDate : "+ endDate);
		System.out.println("table : "+state); 
		System.out.println("searchKey : "+searchKey);
		System.out.println("searchWord : "+searchWord);
		Map<String, String> search = new HashMap<String, String>();
		search.put("startDate", startDate);
		search.put("endDate", endDate);
		search.put("table", state);
		search.put("searchKey", searchKey);
		search.put("searchWord", searchWord);
		
		Map<String, Object> map = new  HashMap<>();
		int totalRecord = orderService.countOrderProcess(search);
		System.out.println("totalRecord : " + totalRecord);
		
		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord, startDate, endDate, state, searchKey, searchWord);
			System.out.println("startRow : "+pdto.getStartRow());
			System.out.println("endRow : "+pdto.getEndRow());

			map.put("orderList", orderService.listAllOrderProcess(this.pdto));
			map.put("pv", this.pdto);
		}

		return map; 
	}//selectAllOrder

	//주문상태 변경
	@PutMapping("/admin/orders/updateordercheck/{prodOrderNum}")      
	public void updateOrderCheckExecute(@PathVariable("prodOrderNum") String prodOrderNum) {
		System.out.println(prodOrderNum);
		orderService.UpdateOrderCheckProcess(prodOrderNum);
	}//updateExecute

	//캠핑용품 상세
	@GetMapping("/admin/orders/detail/{prodOrderNum}")
	public Map<String, Object> selectAllOrder(@PathVariable("prodOrderNum") String prodOrderNum) {
		Map<String, Object> map = new  HashMap<>();

		map.put("orderDetail", orderService.listDetailOrderProcess(prodOrderNum));
		map.put("orderProdDetail", orderService.listDetailOrderProdProcess(prodOrderNum));

		return map; 
	}//selectAllOrder


	////////////////////////////////////

	//전체 캠핑장 예약 조회
	@GetMapping("/admin/orders/reservlist/{currentPage}")
	public Map<String, Object> selectAllReserv(@RequestParam ("startDate") String startDate,@RequestParam ("endDate") String endDate,@RequestParam ("searchKey") String searchKey, @RequestParam ("searchWord") String searchWord,@PathVariable("currentPage") int currentPage, PageDTO pv) {
		System.out.println("state : "+ startDate);
		System.out.println("category : "+ endDate);
		System.out.println("searchKey : "+searchKey);
		System.out.println("searchWord : "+searchWord);
		Map<String, String> search = new HashMap<String, String>();
		search.put("state", startDate);
		search.put("category", endDate);
		search.put("searchKey", searchKey);
		search.put("searchWord", searchWord);
		
		
		Map<String, Object> map = new  HashMap<>();
		int totalRecord = orderService.countReservProcess(search);
		System.out.println(totalRecord);

		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord, startDate, endDate, searchKey, searchWord);
			System.out.println("startRow : "+pdto.getStartRow());
			System.out.println("endRow : "+pdto.getEndRow());

			map.put("orderList", orderService.listAllReservProcess(this.pdto));
			map.put("pv", this.pdto);
		}

		map.put("pv", this.pdto);
		return map; 
	}//selectAllOrder


}
