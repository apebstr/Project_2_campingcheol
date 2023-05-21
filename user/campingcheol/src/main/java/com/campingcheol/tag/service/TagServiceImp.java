package com.campingcheol.tag.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campingcheol.tag.dao.TagDAO;
import com.campingcheol.tag.dto.TagDTO;

@Service
public class TagServiceImp implements TagService {

	
	@Autowired
	private TagDAO tagDAO;

	public TagServiceImp() {
		// TODO Auto-generated constructor stub
	}
	@Override
	public List<TagDTO> callTagList() {
		return tagDAO.tagList();
	}
}
