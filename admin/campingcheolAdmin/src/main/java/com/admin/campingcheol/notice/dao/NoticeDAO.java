package com.admin.campingcheol.notice.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.notice.dto.NoticeDTO;




@Mapper
@Repository
public interface NoticeDAO {
	public int count();

	public List<NoticeDTO> list(PageDTO pv);

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
	
	public List<NoticeDTO> searchlist(PageDTO pv);
}

