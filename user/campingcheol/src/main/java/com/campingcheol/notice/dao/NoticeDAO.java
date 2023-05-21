package com.campingcheol.notice.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


import com.campingcheol.notice.dto.NoticeDTO;
import com.campingcheol.notice.dto.NoticePageDTO;

@Mapper
@Repository
public interface NoticeDAO {
	public int count();

	public List<NoticeDTO> list(NoticePageDTO pv);

	public void readCount(int num);

	public NoticeDTO content(int num);

	public void reStepCount(NoticeDTO dto);

	public void save(NoticeDTO dto);

	public void update(NoticeDTO dto);

	public void delete(int num);

	public String getFile(int num);

	//검색기능
	public int searchcount(Map<String, String> search); 
//	public int searchcount(String table, String searchKey, String searchWord); 
	
	public List<NoticeDTO> searchlist(NoticePageDTO pv);

}
