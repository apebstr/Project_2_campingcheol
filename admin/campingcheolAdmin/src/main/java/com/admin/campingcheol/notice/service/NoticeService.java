package com.admin.campingcheol.notice.service;

import java.util.List;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.notice.dto.NoticeDTO;





public interface NoticeService {
	public int countProcess();

	public List<NoticeDTO> listProcess(PageDTO pv);

	public void insertProcess(NoticeDTO dto);

	public NoticeDTO contentProcess(int num);

    public NoticeDTO updateSelectProcess(int num);

	public void updateProcess(NoticeDTO dto);

	public void deleteProcess(int num, String urlpath);

	public String fileSelectprocess(int num);
	
	//게시물 목록 + 페이징 + 검색
	
	public int searchcountProcess(String table, String searchKey, String searchWord);	
	
	public List<NoticeDTO> searchlistProcess(PageDTO pv);
	
}
