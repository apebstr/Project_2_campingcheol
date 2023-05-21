package com.campingcheol.tag.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.campingcheol.tag.dto.TagDTO;


@Repository
@Mapper
public interface TagDAO {

	//전체 태그리스트 가져오기
	public List<TagDTO> tagList();
}
