package com.campingcheol.notice.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campingcheol.notice.dao.NoticeDAO;
import com.campingcheol.notice.dto.NoticeDTO;
import com.campingcheol.notice.dto.NoticePageDTO;

@Service
public class NoticeServiceImp implements NoticeService {

	@Autowired
	private NoticeDAO noticeDao;
	
	
	public NoticeServiceImp() {
	
	}


	@Override
	public int countProcess() {
	
		return noticeDao.count();
	}


	@Override
	public List<NoticeDTO> listProcess(NoticePageDTO pv) {

		return noticeDao.list(pv);
	}


	@Override
	public void insertProcess(NoticeDTO dto) {

		noticeDao.save(dto);
	}


	@Override
	public NoticeDTO contentProcess(int num) {
		
		noticeDao.readCount(num);
		return noticeDao.content(num);
	}


	@Override
	public void updateProcess(NoticeDTO dto) {
	 noticeDao.update(dto);
		
	}


	@Override
	public void deleteProcess(int num) {
	
		/*
		 * String path = noticeDao.getFile(num); if (path != null) { File file = new
		 * File(urlpath, path); file.delete(); }
		 */
		noticeDao.delete(num);
		
	}


	@Override
	public String fileSelectprocess(int num) {
		
		return null;
	}


	@Override
	public NoticeDTO updateSelectProcess(int num) {
	
		return null;
	}

	// 게시물 목록 + 페이징 + 검색
	@Override
	public int searchcountProcess(String table, String searchKey, String searchWord) {
		 Map<String, String> search = new HashMap<String, String>();
		 search.put("table", table); 
		 search.put("searchKey", searchKey);
	      search.put("searchWord", searchWord);
	      return noticeDao.searchcount(search);
	}


	@Override
	public List<NoticeDTO> searchlistProcess(NoticePageDTO pv) {
		return noticeDao.searchlist(pv);
	}

	
}
