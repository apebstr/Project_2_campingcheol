package com.admin.campingcheol.manage.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.campingcheol.common.file.FileUpload;
import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.ProdDTO;
import com.admin.campingcheol.manage.dto.UserDTO;
import com.admin.campingcheol.manage.service.ProdService;

//@CrossOrigin(origins={"http://localhost:3000"})
@CrossOrigin("*")

@RestController
public class ProdController {

	@Autowired
	private ProdService prodService;
	
	@Value("${spring.servlet.multipart.location}")
	private String filepath;

	private PageDTO pdto;

	private int currentPage;
	
	

	public ProdController() {
		// TODO Auto-generated constructor stub
	}

	//전체 캠핑용품 조회 + 검색
	@GetMapping("/admin/prod/prodlist/{currentPage}")
	public Map<String, Object> selectAllUser(@RequestParam ("startDate") String startDate,@RequestParam ("endDate") String endDate, @RequestParam ("state") String state, @RequestParam ("category")String category, @RequestParam  ("searchKey")String searchKey, @RequestParam  ("searchWord")String searchWord, PageDTO pv, @PathVariable("currentPage") int currentPage) {
		Map<String, Object> map = new  HashMap<>();

		System.out.println("startDate : "+ startDate);
		System.out.println("endDate : "+ endDate);
		System.out.println("state : "+ state);
		System.out.println("category : "+ category);
		System.out.println("searchKey : "+ searchKey);
		System.out.println("searchWord : "+ searchWord);
		Map<String, String> search = new HashMap<String, String>();
		search.put("startDate", startDate);
		search.put("endDate", endDate);
		search.put("state", state);
		search.put("category", category);
		search.put("searchKey", searchKey);
		search.put("searchWord", searchWord);

		int totalRecord = prodService.searchProdCountProcess(search);
		System.out.println("totalRecord : "+totalRecord);

		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord, startDate, endDate, state, category, searchKey, searchWord);
			System.out.println("currentPage Check : "+currentPage);

			map.put("prodList", prodService.searchProdListProcess(this.pdto));
			map.put("pv", this.pdto);
		}

		return map; 
	}
	
	//상품추가
	@PostMapping("/admin/prod/insert")
	public void insertExcute(ProdDTO dto, HttpServletRequest req, HttpSession session)throws IllegalStateException, IOException {
		System.out.println("insert getProdTitle : "+dto.getProdTitle());
		System.out.println("insert getProdCategory : "+dto.getProdCategory());
		System.out.println("insert getProdState : "+dto.getProdState());
		System.out.println("insert getImgname : "+dto.getImgname());
		
		MultipartFile file = dto.getImgname();

		if(file!=null && !file.isEmpty()) {
			UUID random = FileUpload.saveCopyFile(file, filepath);
			dto.setProdImage(random + "_" + file.getOriginalFilename());

			//D:\\download\\temp 경로에 첨부파일 저장
			file.transferTo(new File(random+"_"+file.getOriginalFilename()));
		}

		prodService.insertProdProcess(dto);
	}//writeProExcute
	
	//상품상세
	@GetMapping("/admin/prod/detail/{prodKeyNum}")
	public ProdDTO viewExcute(@PathVariable("prodKeyNum") String prodKeyNum) {
		System.out.println(prodKeyNum);
		return prodService.detailProdProcess(prodKeyNum);
	}
	
	//상품정보 변경
	@PutMapping("/admin/prod/update")                              
	public void updateProdExecute(ProdDTO dto, HttpServletRequest request) throws IllegalStateException, IOException {
		System.out.println("update keynum : "+dto.getProdKeyNum());
		System.out.println("update getProdTitle : "+dto.getProdTitle());
		System.out.println("update getProdCategory : "+dto.getProdCategory());
		System.out.println("update getProdState : "+dto.getProdState());
		System.out.println("update getImgname : "+dto.getImgname());
		
		MultipartFile file = dto.getImgname();
		
		if(file!=null && !file.isEmpty()) {
			UUID random = FileUpload.saveCopyFile(file, filepath);
			dto.setProdImage(random + "_" + file.getOriginalFilename());

			//D:\\download\\temp 경로에 첨부파일 저장
			file.transferTo(new File(random+"_"+file.getOriginalFilename()));
		}
		prodService.updateProdProcess(dto, filepath);
	}//updateExecute
	
	
	//캠핑용품 삭제
	@DeleteMapping("/admin/prod/delete/{prodKeyNum}")
	public void deleteExecute(@PathVariable("prodKeyNum") String prodKeyNum, HttpServletRequest request) {
		System.out.println(prodKeyNum);
		prodService.deleteProdProcess(prodKeyNum, filepath);
	}//deleteExecute
	

	////////////////////////////////////
	
	//전체 캠핑장 조회
	@GetMapping("/admin/prod/sitelist/{currentPage}")
	public Map<String, Object> selectAllSite(@RequestParam ("category") String category, @RequestParam ("searchKey") String searchKey, @RequestParam ("searchWord") String searchWord, @PathVariable("currentPage") int currentPage, PageDTO pv) {
		

		System.out.println("table : "+ category);
		System.out.println("searchKey : "+ searchKey);
		System.out.println("searchWord : "+ searchWord);
		Map<String, String> search = new HashMap<String, String>();
		search.put("table", category);
		search.put("searchKey", searchKey);
		search.put("searchWord", searchWord);
		
		Map<String, Object> map = new  HashMap<>();
		int totalRecord = prodService.countSiteProcess(search);
		System.out.println(totalRecord);

		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord, category, searchKey, searchWord);
			System.out.println("currentPage Check : "+currentPage);
			map.put("prodList", prodService.listAllSiteProcess(this.pdto));
			map.put("pv", this.pdto);
		}

		map.put("pv", this.pdto);
		return map; 
	}//selectAllProd
	
	//캠핑용품 삭제
	@DeleteMapping("/admin/prod/campdelete/{campKeyNum}")
	public void deleteExecute(@PathVariable("campKeyNum") String campKeyNum) {
		System.out.println("delete campKeyNum : "+campKeyNum);
		prodService.deleteCampProcess(campKeyNum);
	}//deleteExecute
	
	
}
