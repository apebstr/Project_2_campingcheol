package com.campingcheol.prod.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.prod.dto.ProdCartDTO;
import com.campingcheol.prod.dto.ProdDTO;
import com.campingcheol.prod.dto.ProdOrderDTO;
import com.campingcheol.prod.dto.ProdOrderDetailDTO;
import com.campingcheol.prod.dto.ProdPageDTO;
import com.campingcheol.prod.dto.ProdReviewDTO;
import com.campingcheol.prod.service.ProdService;


@CrossOrigin("*")
@RestController
public class ProdController {

	private int currentPage;

	@Autowired
	private ProdService prodService;

	@Autowired
	private ProdPageDTO ppdto;
	
	@Value("${spring.servlet.multipart.location}")
	private String filepath;

	public ProdController() {
		// TODO Auto-generated constructor stub
	}


	//상품리스트 출력하기
	@RequestMapping("/prod/list/{currentPage}")
	public Map<String, Object> prodListExecute(@PathVariable("currentPage")int currentPage, ProdPageDTO pv){
		Map<String, Object> map = new HashMap<String, Object>();

		int totalRecord = prodService.callProdCount();

		if(totalRecord >=1) {
			this.currentPage=currentPage;

			this.ppdto = new ProdPageDTO(pv.getCurrentPage(), totalRecord);
			//			this.ppdto= new ProdPageDTO(this.currentPage, totalRecord);

			map.put("prodList", prodService.callProdList(this.ppdto));
			map.put("pv",this.ppdto);
		}

		return map;
	}

	//상품상세정보 출력하기 
	@GetMapping("/prod/view/{prodKeyNum}")
	public ProdDTO prodViewExecute(@PathVariable("prodKeyNum") int prodKeyNum) {
		return prodService.callProdDetail(prodKeyNum);
	}


	//	 상품상세정보에서 후기 페이징+목록 가져오기 
	@RequestMapping("/prod/getReviewList/{currentPage}/{prodKeyNum}")
	public Map<String, Object> prodReviewList(@PathVariable("prodKeyNum") int prodKeyNum,@PathVariable("currentPage")int currentPage, ProdPageDTO pv){
		Map<String,Object> reviewMap = new HashMap<String,Object>();
		int totalRecord = prodService.callProdReviewCount(prodKeyNum);

		System.out.println( "currentPage"+ pv.getCurrentPage());

		if(totalRecord >=1) {
			this.currentPage=currentPage;
			this.ppdto = new ProdPageDTO(pv.getCurrentPage(), totalRecord);
			this.ppdto.setProdKeyNum(prodKeyNum);

			reviewMap.put("reviewList", prodService.callProdReviewList(this.ppdto));
			reviewMap.put("pv",this.ppdto);
			reviewMap.put("avgRating", prodService.callAvgOfProd(prodKeyNum));
		}
		return reviewMap;


	}


	//카테고리별 상품리스트 출력하기
	@GetMapping("/prod/list/{currentPage}/{category}")
	public Map<String, Object> prodCategoryList(@PathVariable("currentPage")int currentPage, @PathVariable("category") String category,  ProdPageDTO pv){
		Map<String,Object> categoryList = new HashMap<String,Object>();
		int totalRecord = prodService.callCategoryCount(category);

		if(totalRecord >=1) {
			this.currentPage=currentPage;
			this.ppdto = new ProdPageDTO(pv.getCurrentPage(), totalRecord, category);
			//			this.ppdto= new ProdPageDTO(this.currentPage, totalRecord);


			categoryList.put("prodList", prodService.callCategoryList(this.ppdto));
			categoryList.put("pv",this.ppdto);
		}

		return categoryList;
	}


	//검색결과에 따른 상품리스트 출력하기
	@GetMapping("prod/list/search/{currentPage}/{search}")
	public Map<String,Object> prodSearch(@PathVariable("currentPage")int currentPage, @PathVariable("search")String search, ProdPageDTO pv){
		Map<String,Object> categoryList = new HashMap<String,Object>();
		int totalRecord = prodService.callSearchCount(search);

		if(totalRecord >=1) {
			this.currentPage=currentPage;
			this.ppdto = new ProdPageDTO(pv.getCurrentPage(), totalRecord, search);
			//			this.ppdto= new ProdPageDTO(this.currentPage, totalRecord);
			this.ppdto.setSearch(search);

			categoryList.put("prodList", prodService.callProdSearchList(this.ppdto));
			categoryList.put("pv",this.ppdto);
		}
		return categoryList;
	}


	// 장바구니 클릭했을 때  정보가지고 오고 삽입 ( 임시 - 나중에 localstorage쓸 예정이라서 수정 필요 )
	@PostMapping("prod/list")
	public void insertCart(ProdCartDTO cartDTO) {
		//		request안되면 하나하나 넣으면됨
		prodService.callinsertCart(cartDTO);

	}

	//장바구니 테이블 레코드  가져오기
	@GetMapping("/prod/cartList/{userKeynum}")
	public List<ProdCartDTO> cartList(@PathVariable("userKeynum")int userKeynum){


		return prodService.callCartList(userKeynum);
	}

	// 장바구니 check값 갱신해주기
	@PutMapping("/prod/reverseCart/{prodCartNum}")
	public void checkReverseProcess(@PathVariable("prodCartNum")int prodCartNum) {
		System.out.println("prodKeyNum"+ prodCartNum);

		prodService.callReverseCheck(prodCartNum);
	}



	//	장바구니에서 품목 삭제하기(장바구니 페이지)
	@DeleteMapping("/prod/deleteCart/{prodCartNum}")
	public void deleteCartProcess(@PathVariable("prodCartNum")int prodCartNum) {

		prodService.callDeleteCart(prodCartNum);
	}

	// 장바구니 품목 전체삭제 (장바구니에서)
	@DeleteMapping("/prod/deleteAllCart/{userKeynum}")
	public void deleteAllCart(@PathVariable("userKeynum")int userKeynum) {
		prodService.callDeleteAllCart(userKeynum);
	}


	//	장바구니 수량 증가

	@PutMapping("/prod/cartIncrease/{prodCartNum}")
	public void cartIncrease(@PathVariable("prodCartNum")int prodCartNum) {
		prodService.callIncreaseCart(prodCartNum);
	}

	//	장바구니 수량 감소
	@PutMapping("/prod/cartDecrease/{prodCartNum}")
	public void cartDecrease(@PathVariable("prodCartNum")int prodCartNum) {
		prodService.callDecreaseCart(prodCartNum);
	}


	//	장바구니 전체 선택 (모두 체크)
	@PutMapping("/prod/selectAll/{userKeynum}")
	public void cartSelectAll(@PathVariable("userKeynum")int userKeynum) {
		prodService.callCartAllCheck(userKeynum);
	}


	//	장바구니 모두 선택해제
	@PutMapping("/prod/deselectAll/{userKeynum}")
	public void cartDeselectAll(@PathVariable("userKeynum")int userKeynum) {
		prodService.callCartAllDecheck(userKeynum);
	}


	////카트에서 넘어가는 결제페이지에서 체크된 값만 가져오기 위한 controller 
	@RequestMapping("/prod/cartOrderList/{userKeynum}")
	public List<ProdDTO> cartOrderList(@PathVariable("userKeynum")int userKeynum){
		//		System.out.println(prodService.callCartOrder(userKeynum).get(1).getProdCartCount());

		return prodService.callCartOrder(userKeynum);
	}


	//	결제페이지에서 화면에 회원정보를 뿌려주기 위해 회원정보 가져오기
	@GetMapping("/prod/getUserInfo/{userKeynum}")
	public MembersDTO getUserInfo(@PathVariable("userKeynum")int userKeynum) {

		return prodService.getUserInfo(userKeynum);
	}


	// 결제 완료후 주문 통합테이블에 정보 저장하기 
	@PostMapping("/prod/orderInsert")
	public int insertOrderInfo( ProdOrderDTO prodOrderDTO) {

		prodService.callinsertprodOrder(prodOrderDTO);

		int prodOrdernum =prodService.callProdorderNum();

		System.out.println("prodOrdernum"+prodOrdernum);
		return prodOrdernum;
	}

	//		결제 완료 후 상세 주문 테이블에 정보 저장하기 
	@PostMapping("/prod/insertIrderDetail")
	public void insertDetail(ProdOrderDetailDTO prodDTO) {
		Map<String, Object> stockmap = new HashMap<String, Object>();
		stockmap.put("prodCartCount", prodDTO.getProdCartCount());
		stockmap.put("prodKeyNum", prodDTO.getProdKeyNum());


		prodService.callInsertDetail(prodDTO);

		//			 재고업데이트 
		prodService.callStockUpdate(stockmap);

		//			 장바구니에서 구매한 레코드 삭제하기
		prodService.callDeleteByOrder(prodDTO);

	}

	//결제 내역 가져오기 (결제 내역 순서 큰 순으로 가져오기) 페이징해야함.
	@GetMapping("/prod/orderedList/{currentPage}/{userKeynum}")
	public  Map<String, Object> getOrderList(@PathVariable("userKeynum")int userKeynum, @PathVariable("currentPage")int currentPage, ProdPageDTO pv ){
		Map<String,Object> orderList = new HashMap<String,Object>();
		int totalRecord = prodService.callOrderListCount(userKeynum);

		System.out.println(pv.getCurrentPage());
		//		 System.out.println(pv.getUserKeynum());
		if(totalRecord >=1) {
			this.currentPage=currentPage;
			this.ppdto = new ProdPageDTO(pv.getCurrentPage(), totalRecord);
			this.ppdto.setUserKeynum(userKeynum);
			orderList.put("orderedList", prodService.callOrderList(this.ppdto));
			orderList.put("pv",this.ppdto);
		}
		return orderList;
	}


	//후기 저장하기
	@PostMapping("/prod/reviewSave")
	public void saveReviewPro(ProdReviewDTO reviewDTO) {
		prodService.callSaveReview(reviewDTO);
	}

	//	 후기 작성 후 후기 작성여부 true로 변경하기 
	@PutMapping("/prod/changeWhetherReview/{prodDetailNum}")
	public void changeWhetherReview(@PathVariable("prodDetailNum")int prodDetailNum) {
		prodService.callMakeReviewTrue(prodDetailNum);
	}

	//	 헤더에 표시할 장바구니 개수 가져오기
	@RequestMapping("/home/cartCount/{userKeynum}")
	public int userCartCount(@PathVariable("userKeynum")int userKeynum) {
		return prodService.callCountCart(userKeynum);
	}


	//상품 이미지 가져오기
	@GetMapping("/prod/getimage/{filename}")
	public ResponseEntity<Resource> downloadExecute(@PathVariable("filename") String filename) throws IOException {
		System.out.println(filename);
		
		String fileName = filename.substring(filename.indexOf("_")+1);
		System.out.println(fileName);
		//파일명이 한글일 때 인코딩 작업
		String str = URLEncoder.encode(fileName, "UTF-8");
		
		//원본파일명에서 공백이 있을 때, +로 표시되므로 공백으로 처리
		str = str.replaceAll("\\+", "%20");
		
		Path path = Paths.get(filepath+"\\"+filename);
		Resource resource = new InputStreamResource(Files.newInputStream(path));
		System.out.println("resource : "+ resource.getFilename());
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, "application/octect-stream")
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename="+str+";")
				.body(resource);
	}


}
