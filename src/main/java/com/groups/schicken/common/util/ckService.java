package com.groups.schicken.common.util;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.groups.schicken.common.aws.S3Service;
import com.groups.schicken.common.vo.FileVO;

@Service
public class ckService {
	@Autowired
	private FileManager fileManager;
	@Autowired
	private S3Service s3Service;
	
	public Map<String,Object> ckImg(MultipartFile file) throws Exception{
		FileVO fileVO = new FileVO();
		String uid = UUID.randomUUID().toString();
        fileVO.setName(uid);
        fileVO.setOriginName(file.getOriginalFilename().substring(0,file.getOriginalFilename().lastIndexOf(".")));
        fileVO.setExtension(file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1));
		
		fileVO = s3Service.uploadFile(file, fileVO);
		Map<String,Object> json = new HashMap<>();
		json.put("uploaded", 1);
		json.put("fileName", fileVO.getOriginName());
		json.put("url", fileVO.getUrl());
		
		 return json;
	}
}
