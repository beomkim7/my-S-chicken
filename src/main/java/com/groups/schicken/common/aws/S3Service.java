package com.groups.schicken.common.aws;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.groups.schicken.common.vo.FileVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public FileVO uploadFile(MultipartFile file, FileVO fileVO) throws Exception {
        try{
            String fileName = fileVO.getName();
            String fileUrl = "https://s3.ap-northeast-2.amazonaws.com/"+bucket+"/"+fileVO.getName();
            ObjectMetadata data = new ObjectMetadata();
            data.setContentType(file.getContentType());
            data.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket, fileName, file.getInputStream(), data);
            fileVO.setUrl(fileUrl);

            return fileVO;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public String s3FileUpload(MultipartFile multipartFile, String dir) throws IOException {
        //파일명 설정 : {UUID}_{경로}.{extension}
        String extension = UUID.randomUUID().toString();
        String s3FileName = "https://s3.ap-northeast-2.amazonaws.com/"+bucket+"/"+extension;
        //파일 저장경로 설정
        

        //파일 사이즈 설정
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getSize());

        String keyName = s3FileName;

        //파일 업로드
        // 외부에 공개하는 파일인 경우 Public Read 권한을 추가, ACL 확인
        amazonS3Client.putObject(bucket, extension, multipartFile.getInputStream(), objMeta);
                


        return s3FileName;
    }

    public boolean deleteFile(FileVO fileVO) throws Exception {
        try{
            amazonS3Client.deleteObject(bucket,fileVO.getName());
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public ResponseEntity<byte[]> downFile(FileVO fileVO) throws IOException{
    	System.out.println(fileVO.getName()+"11111111111");
    	System.out.println(fileVO.getOriginName()+"123");
    	String name = fileVO.getName();
    	String oriName = fileVO.getOriginName() + "." + fileVO.getExtension();
    	
    	S3Object o = amazonS3.getObject(new GetObjectRequest(bucket, name));
    	S3ObjectInputStream objectInputStream = o.getObjectContent();
    	byte[] bytes = IOUtils.toByteArray(objectInputStream);
    	
    	String fileName = URLEncoder.encode(oriName, "UTF-8").replaceAll("WW+", "%20");
    	HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentLength(bytes.length);
        
        
        
        httpHeaders.setContentDispositionFormData("attachment", fileName);
    
        
        
        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);		
    	
    }
}
