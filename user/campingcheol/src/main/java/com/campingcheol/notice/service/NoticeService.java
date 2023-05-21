package com.campingcheol.notice.service;

import java.util.List;


import com.campingcheol.notice.dto.NoticeDTO;
import com.campingcheol.notice.dto.NoticePageDTO;


public interface NoticeService {
	public int countProcess();

	public List<NoticeDTO> listProcess(NoticePageDTO pv);

	public void insertProcess(NoticeDTO dto);

	public NoticeDTO contentProcess(int num);

    public NoticeDTO updateSelectProcess(int num);

	public void updateProcess(NoticeDTO dto);

	public void deleteProcess(int num);

	public String fileSelectprocess(int num);
	
	//게시물 목록 + 페이징 + 검색
	
	public int searchcountProcess(String table, String searchKey, String searchWord);	
	
	public List<NoticeDTO> searchlistProcess(NoticePageDTO pv);


}
