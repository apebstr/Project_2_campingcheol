package com.campingcheol.tag.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campingcheol.tag.dto.TagDTO;
import com.campingcheol.tag.service.TagService;

@CrossOrigin("*")
@RestController
public class TagController {

	
	@Autowired
	private TagService tagservice;
	
	public TagController() {
		// TODO Auto-generated constructor stub
	}
	
//	태그리스트가져오기
	@GetMapping("/tag/list")
	public List<TagDTO> getTagList(){
		
		
		return tagservice.callTagList();
	};
}
