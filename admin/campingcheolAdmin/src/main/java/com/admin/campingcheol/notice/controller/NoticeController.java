package com.admin.campingcheol.notice.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.campingcheol.common.file.FileUpload;
import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.notice.dto.NoticeDTO;
import com.admin.campingcheol.notice.service.NoticeService;


@CrossOrigin("*")
@RestController
public class NoticeController {

	@Autowired
	private NoticeService noticeService;

	@Value("${spring.servlet.multipart.location}")
	private String filePath;


	private PageDTO pdto;

	private int currentPage;

	public NoticeController() {

	}

	// http://localhost:8090/admin/notice/list/1

	@GetMapping("admin/notice/list/{currentPage}")
	public Map<String, Object> listExecute(PageDTO pv, @PathVariable("currentPage") int currentPage) {
		Map<String, Object> map = new  HashMap<String, Object>();
		int totalRecord = noticeService.countProcess();
		System.out.println(totalRecord);
		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0) {
				this.currentPage=1;
			}else {
				this.currentPage = pv.getCurrentPage();
			}
			this.pdto = new PageDTO(this.currentPage, totalRecord);
			map.put("noticeList", noticeService.listProcess(this.pdto));
			map.put("pv", this.pdto);
		}
		return map; 

	}



	//      // 캠핑장 검색하기
	//      
	//      @GetMapping(value= {"/camp/list/{currentPage}", "/camp/list/{currentPage}/{searchWord}"})
	//      public Map<String, Object> searchExecute(@PathVariable("currentPage") int currentPage,
	//            @PathVariable(required = false) String searchWord, CampSitePageDTO pv) {
	//
	//         System.out.println("pv"+ pv.getSearchWord());
	//         
	//         Map<String, Object> map = new HashMap<String, Object>();
	//         int totalRecord = campSiteService.countProcess(pv.getSearchWord());
	//         System.out.println("totalRecord:"+ totalRecord);
	//
	//         if (totalRecord >= 1) {
	//            this.currentPage = currentPage;
	//
	//
	//            this.campSitePageDTO = new CampSitePageDTO(pv.getCurrentPage(), totalRecord, pv.getSearchWord());
	//            map.put("aList", campSiteService.getSearchList(this.campSitePageDTO));
	//            map.put("pv", this.campSitePageDTO);
	//         }
	//         return map;
	//
	//      }
	//   

	/*
	 * // 글 작성
	 * 
	 * @PostMapping("admin/notice/write") public String writeProExecute(NoticeDTO
	 * dto) { // Do any necessary preprocessing of the DTO here
	 * 
	 * // Save the DTO using the noticeService noticeService.insertProcess(dto);
	 * 
	 * // Redirect to a success page or the list page return
	 * "redirect:/notice/list"; }
     파일첨부 전 */

	@PostMapping("admin/notice/write")
	public String writeProExecute(NoticeDTO dto) {

		MultipartFile file = dto.getNoticefileName();

		//파일첨부가 있으면 
		if(file!=null &&!file.isEmpty()) {
			UUID random = FileUpload.saveCopyFile(file, filePath);

			dto.setNoticeFile(random+"_"+ file.getOriginalFilename());
		}
		// Do any necessary preprocessing of the DTO here

		// Save the DTO using the noticeService

		System.out.println("널이냐?"+dto.getNoticeFile());
		noticeService.insertProcess(dto);

		// Redirect to a success page or the list page
		return "redirect:/notice/list";
	}

	//게시판 글 확인
	@GetMapping("admin/notice/view/{num}")
	public NoticeDTO viewExcute(@PathVariable("num") int num) {
		return noticeService.contentProcess(num);
	}

	//수정
	@PutMapping("admin/notice/update")
	public void updateExecute(NoticeDTO dto, HttpServletRequest request) throws IllegalStateException, IOException {

		MultipartFile file = dto.getNoticefileName();

		//파일첨부가 있으면 
		if(file!=null &&!file.isEmpty()) {
			UUID random = FileUpload.saveCopyFile(file, filePath);

			dto.setNoticeFile(random+"_"+ file.getOriginalFilename());
		}

		noticeService.updateProcess(dto);
	}

	//삭제
	@DeleteMapping("admin/notice/delete/{num}")
	public void deleteExecute(@PathVariable("num") int num, HttpServletRequest request) {

		noticeService.deleteProcess(num, filePath);

	}



	//검색
	@GetMapping("admin/notice/list/search/{currentPage}")
	public Map<String, Object> search(@RequestParam String table, @RequestParam String searchKey, @RequestParam String searchWord, PageDTO pv, @PathVariable("currentPage") int currentPage) {
		System.out.println("table : "+table); 
		System.out.println("searchKey : "+searchKey);
		System.out.println("searchWord : "+searchWord);
		Map<String, Object> map = new  HashMap<String, Object>();
		int totalRecord = noticeService.searchcountProcess(table, searchKey, searchWord);
		System.out.println("검색결과 : "+ totalRecord);


		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0) {
				this.currentPage=1;
			}else {
				this.currentPage = pv.getCurrentPage();
			}
			this.pdto = new PageDTO(this.currentPage, totalRecord, table, searchKey, searchWord);
			map.put("noticeList", noticeService.searchlistProcess(this.pdto));
			map.put("pv", this.pdto);
		}
		return map; 

	}
	
	//   게시판 파일 다운로드
	@GetMapping("admin/notice/contentdownload/{noticeNum}")
	public ResponseEntity<Resource> downloadExecute(@PathVariable("noticeNum")int noticeNum) throws IOException{
		NoticeDTO notice = noticeService.contentProcess(noticeNum);
		String noticeFile = notice.getNoticeFile();
		System.out.println(noticeFile);


		String fileName = noticeFile.substring(noticeFile.indexOf("_")+1);

		//파일명이 한글일 때 인코딩 작업을 한다. 
		String str = URLEncoder.encode(fileName,"UTF-8");
		//원본파일명에서 공백이 있을때, +표시가 되므로 공백으로 처리해준다.
		str = str.replaceAll("\\+","%20");
		Path path = Paths.get(filePath+"\\"+noticeFile);
		Resource resource = new InputStreamResource(Files.newInputStream(path));
		System.out.println("resource"+ resource.getFilename());

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename="+str+";")
				.body(resource);
	}


}//class Notic