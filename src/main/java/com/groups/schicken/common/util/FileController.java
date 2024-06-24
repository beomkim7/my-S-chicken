package com.groups.schicken.common.util;

import com.google.gson.JsonObject;
import com.groups.schicken.common.aws.S3Service;
import com.groups.schicken.common.vo.FileVO;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileController {

	@Autowired
	private FileManager fileManager;
	@Autowired
	private S3Service s3Service;
	
	@GetMapping("/fileDown")
	public ResponseEntity<byte[]> download(FileVO fileVO) throws Exception{
		
		
		return fileManager.downFile(fileVO);
	}
	
	@PostMapping("/fileDelete")
	public ResponseEntity<Boolean> delete(@RequestBody FileVO fileVO)throws Exception{
		System.out.println("fileVO = " + fileVO);

		return ResponseEntity.ok(fileManager.deleteFile(fileVO));
	}
	
	  @ResponseBody
	    @PostMapping("/ck")
	    public void ckFileUpload(HttpServletResponse res,
	                             @RequestParam MultipartFile upload) {
		  	System.out.println(upload);
		  	System.out.println(res);
	        System.out.println("gogo");

	        PrintWriter printWriter = null;

	        try {
	            //s3 파일 업로드
	            //s3CkUploadPath = {location}/ck/{uid}_ck.{ext}
	            String s3CkUploadPath = s3Service.s3FileUpload(upload, "ck");

	            System.out.println(s3CkUploadPath+"김범서");

	            //파일 크기
	            byte[] bytes = upload.getBytes();
	            //원본 파일명
	            String originFileName = upload.getOriginalFilename();
	            //저장 파일명
	            String savedFileName = s3CkUploadPath.substring(s3CkUploadPath.lastIndexOf("/") + 1);

	            //ckEditor 로 전송
	            printWriter = res.getWriter();
	            String fileUrl = s3CkUploadPath;

	            System.out.println(fileUrl);

	            //json 으로 변환
	            JsonObject json = new JsonObject();
	            json.addProperty("uploaded", 1);
	            json.addProperty("fileName", originFileName);
	            json.addProperty("url", fileUrl);
	            printWriter.println(json);
	            printWriter.flush(); //초기화

	           System.out.println(fileUrl);

	        } catch (IOException e) {
	            e.printStackTrace();
	        } finally {
	            if(printWriter != null) { printWriter.close(); }
	        }
	    }


}
