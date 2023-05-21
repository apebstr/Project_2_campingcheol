package com.campingcheol.notice.dto;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class NoticeDTO {
	
    private int noticeNum;
    private String adminId;
    private String noticeFix;
    private String noticeTitle;
    private String noticeContent;
    private String noticePic;
    private String noticeRegdate;
    private int noticeReadCount;
    private String noticeState;

	private MultipartFile noticefileName;
	private String noticeFile;
  
    //검색필터
//    private String type;   // 검색 타입
//    private String keyword;// 검색 내용
    

	public NoticeDTO() {
	
	}


	public int getNoticeNum() {
		return noticeNum;
	}


	public void setNoticeNum(int noticeNum) {
		this.noticeNum = noticeNum;
	}


	public String getAdminId() {
		return adminId;
	}


	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}


	public String getNoticeFix() {
		return noticeFix;
	}


	public void setNoticeFix(String noticeFix) {
		this.noticeFix = noticeFix;
	}


	public String getNoticeTitle() {
		return noticeTitle;
	}


	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}


	public String getNoticeContent() {
		return noticeContent;
	}


	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}


	public String getNoticePic() {
		return noticePic;
	}


	public void setNoticePic(String noticePic) {
		this.noticePic = noticePic;
	}


	public String getNoticeFile() {
		return noticeFile;
	}


	public void setNoticeFile(String noticeFile) {
		this.noticeFile = noticeFile;
	}


	public String getNoticeRegdate() {
		return noticeRegdate;
	}


	public void setNoticeRegdate(String noticeRegdate) {
		this.noticeRegdate = noticeRegdate;
	}


	public int getNoticeReadCount() {
		return noticeReadCount;
	}


	public void setNoticeReadCount(int noticeReadCount) {
		this.noticeReadCount = noticeReadCount;
	}


	public String getNoticeState() {
		return noticeState;
	}


	public void setNoticeState(String noticeState) {
		this.noticeState = noticeState;
	}
	
	public MultipartFile getNoticefileName() {
		return noticefileName;
	}
	
	public void setNoticefileName(MultipartFile noticefileName) {
		this.noticefileName = noticefileName;
	}
    
}
