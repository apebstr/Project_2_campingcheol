package com.admin.campingcheol.common.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

public class FileUpload {

	//첨부파일을 저장할 파일명 생성(난수값_파일명)
	public static UUID saveCopyFile(MultipartFile file, String filepath) {
		String fileName = file.getOriginalFilename();

		//중복파일명을 처리하기 위한 난수 발생
		UUID random = UUID.randomUUID();

		File ff = new File(filepath, random + "_" + fileName);

		try {
			FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(ff));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return random;
	}//saveCopyFile()

	//첨부파일이 저장될 위치 설정 (temp폴더)
	public static String urlPath(HttpServletRequest request) {
		//서버에 저장할 위치값
		String root = request.getSession().getServletContext().getRealPath("/");
		System.out.print("root : " + root);
		String saveDirectory = root + "temp" + File.separator;

		File fe = new File(saveDirectory);
		if(!fe.exists())
			fe.mkdir();

		return saveDirectory;
	}//urlPath()

	/////////////////////////

	//사진첨부를 저장할 파일명 생성(난수값_파일명)
	public static UUID saveCopyImg(MultipartFile img, HttpServletRequest request) {
		String imgName = img.getOriginalFilename();

		//중복파일명을 처리하기 위한 난수 발생
		UUID random = UUID.randomUUID();

		File ff = new File(urlPathImg(request), random + "_" + imgName);
		//System.out.println("사진첨부 저장경로 :"+ ff);
		try {
			FileCopyUtils.copy(img.getInputStream(), new FileOutputStream(ff));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return random;
	}//saveCopyImg()

	//사진첨부가 저장될 위치 설정 (/resources/assets/setImg)
	public static String urlPathImg(HttpServletRequest request) {
		//서버에 저장할 위치값
		String rootImg = request.getSession().getServletContext().getRealPath("/resources/assets/");
		String saveDirectoryImg = rootImg + "setImg" + File.separator;

		File fe = new File(saveDirectoryImg);
		if(!fe.exists())
			fe.mkdir();

		return saveDirectoryImg;
	}//urlPathImg()


}//class FileUpload
