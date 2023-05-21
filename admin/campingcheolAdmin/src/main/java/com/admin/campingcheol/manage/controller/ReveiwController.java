package com.admin.campingcheol.manage.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.service.ReviewService;

//@CrossOrigin(origins={"http://localhost:3000"})
@CrossOrigin("*")

@RestController
public class ReveiwController {

	@Autowired
	private ReviewService reviewService;

	private PageDTO pdto;

	private int currentPage;
	
	
	public ReveiwController() {
		// TODO Auto-generated constructor stub
	}

	//전체 캠핑용품 후기 조회
	@GetMapping("/admin/review/reviewlist/{currentPage}")
	public Map<String, Object> countProdReviewExecute(@RequestParam ("startDate") String startDate,@RequestParam ("endDate") String endDate, @RequestParam ("rating") String rating, @RequestParam ("searchKey") String searchKey, @RequestParam ("searchWord") String searchWord, @PathVariable("currentPage") int currentPage, PageDTO pv) {
		System.out.println("startDate : "+ startDate);
		System.out.println("endDate : "+ endDate);
		System.out.println("table : "+rating); 
		System.out.println("searchKey : "+searchKey);
		System.out.println("searchWord : "+searchWord);
		
		Map<String, String> search = new HashMap<String, String>();
		search.put("startDate", startDate);
		search.put("endDate", endDate);
		search.put("table", rating);
		search.put("searchKey", searchKey);
		search.put("searchWord", searchWord);
		
		Map<String, Object> map = new  HashMap<>();
		int totalRecord = reviewService.countProdReviewProcess(search);
		System.out.println(totalRecord);

		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord, startDate, endDate, rating, searchKey, searchWord);
			
			map.put("reviewList", reviewService.listAllProdReviewProcess(this.pdto));
			map.put("pv", this.pdto);
		}

		return map; 
	}
	
	//캠핑용품 후기 삭제
	@DeleteMapping("/admin/review/delete/{prodReviewNum}")
	public void deleteExecute(@PathVariable("prodReviewNum") String prodReviewNum) {
		System.out.println("prodreview delete : " + prodReviewNum);
		reviewService.deleteProdReviewProcess(prodReviewNum);
	}//deleteExecute
	

	////////////////////////////////////
	
	//전체 캠핑장 후기 조회
	@GetMapping("/admin/review/reviewcamplist/{currentPage}")
	public Map<String, Object> listAllCampReviewExecute(@RequestParam ("startDate") String startDate, @RequestParam ("endDate") String endDate, @RequestParam ("rating") String rating, @RequestParam ("searchKey") String searchKey, @RequestParam ("searchWord") String searchWord, @PathVariable("currentPage") int currentPage, PageDTO pv) {
		System.out.println("startDate : "+ startDate);
		System.out.println("endDate : "+ endDate);
		System.out.println("table : "+rating); 
		System.out.println("searchKey : "+searchKey);
		System.out.println("searchWord : "+searchWord);
		
		Map<String, String> search = new HashMap<String, String>();
		search.put("startDate", startDate);
		search.put("endDate", endDate);
		search.put("table", rating);
		search.put("searchKey", searchKey);
		search.put("searchWord", searchWord);
		
		Map<String, Object> map = new  HashMap<>();
		int totalRecord = reviewService.countCampReviewProcess(search);
		System.out.println(totalRecord);

		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord, startDate, endDate, rating, searchKey, searchWord);
			
			map.put("reviewList", reviewService.listAllCampReviewProcess(this.pdto));
			map.put("pv", this.pdto);
		}

		return map; 
	}
	
	
	//캠핑장 후기 삭제
	@DeleteMapping("/admin/review/campdelete/{campRewNum}")
	public void deletecampreviewExecute(@PathVariable("campRewNum") String campRewNum) {
		System.out.println("campRewNum delete : " + campRewNum);
		reviewService.deleteCampReviewProcess(campRewNum);
	}//deleteExecute
	
	
}
