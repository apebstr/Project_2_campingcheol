package com.campingcheol.notice.controller;


import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

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

import com.campingcheol.notice.dto.NoticeDTO;
import com.campingcheol.notice.dto.NoticePageDTO;
import com.campingcheol.notice.service.NoticeService;



@CrossOrigin("*")
@RestController
public class NoticeController {

   @Autowired
   private NoticeService noticeService;

   @Autowired
   private NoticePageDTO pdto;

   private int currentPage;
   
   @Value("${spring.servlet.multipart.location}")
   private String filePath;
   
   public NoticeController() {

   }

   // http://localhost:8090/notice/list/1

   @GetMapping("/notice/list/{currentPage}")
   public Map<String, Object> listExecute(NoticePageDTO pv, @PathVariable("currentPage") int currentPage) {
      Map<String, Object> map = new  HashMap<String, Object>();
      int totalRecord = noticeService.countProcess();
      System.out.println(totalRecord);
      if(totalRecord>=1) {
         if(pv.getCurrentPage()==0) {
            this.currentPage=1;
         }else {
         this.currentPage = pv.getCurrentPage();
         }
      this.pdto = new NoticePageDTO(this.currentPage, totalRecord);
      map.put("noticeList", noticeService.listProcess(this.pdto));
      map.put("pv", this.pdto);
      }
      return map; 

   }//listExecute
   
   
   
   @PostMapping("/notice/write")
   public String writeProExecute(NoticeDTO dto) {
       // Do any necessary preprocessing of the DTO here
       
       // Save the DTO using the noticeService
       noticeService.insertProcess(dto);
       
       // Redirect to a success page or the list page
       return "redirect:/notice/list";
   }
   
   //게시판 글 확인
   @GetMapping("/notice/view/{num}")
   public NoticeDTO viewExcute(@PathVariable("num") int num) {
      return noticeService.contentProcess(num);
   }
   
   //수정
   @PutMapping("/notice/update")
   public void updateExecute(NoticeDTO dto) throws IllegalStateException, IOException {

//      MultipartFile file = dto.getFilename();

      /*
       * if (file != null && !file.isEmpty()) { UUID random =
       * FileUpload.saveCopyFile(file, filePath); dto.setUpload(random + "_" +
       * file.getOriginalFilename()); // c:\\download\\temp 경로에 첨부파일 저장
       * file.transferTo(new File(random + "_" + file.getOriginalFilename())); }
       */
      noticeService.updateProcess(dto);

   }
   
   //삭제
   @DeleteMapping("/notice/delete/{num}")
   public void deleteExecute(@PathVariable("num") int num, HttpServletRequest request) {

      noticeService.deleteProcess(num);

      
   }

   
   //검색
   @PostMapping("/notice/list/search/{currentPage}")
   public Map<String, Object> search(String table, String searchWord,String searchKey, NoticePageDTO pv, @PathVariable("currentPage") int currentPage) {
 
      Map<String, Object> map = new  HashMap<String, Object>();
      int totalRecord = noticeService.searchcountProcess(pv.getTable(), pv.getSearchKey(), pv.getSearchWord());
      System.out.println("검색결과 : "+table);
      System.out.println("검색결과 : "+ searchWord);
      System.out.println("검색결과 : "+ searchKey);          
            if(totalRecord>=1) {
         if(pv.getCurrentPage()==0) {
            this.currentPage=1;
         }else {
         this.currentPage = pv.getCurrentPage();
         }
      this.pdto = new NoticePageDTO(this.currentPage, totalRecord, pv.getTable(),  pv.getSearchKey(), pv.getSearchWord());
      map.put("noticeList", noticeService.searchlistProcess(this.pdto));
      map.put("pv", this.pdto);
      }
      return map; 

   }
   
   
   
//   게시판 파일 다운로드
   @GetMapping("/notice/contentdownload/{noticeNum}")
   public ResponseEntity<Resource> downloadExecute(@PathVariable("noticeNum")int noticeNum) throws IOException{
      NoticeDTO notice = noticeService.contentProcess(noticeNum);
      String noticeFile = notice.getNoticeFile();
      
      
      
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
   }
   
   
   
   
   
//class NoticeC