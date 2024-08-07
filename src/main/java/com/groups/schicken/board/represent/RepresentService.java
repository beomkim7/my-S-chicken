package com.groups.schicken.board.represent;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.groups.schicken.notification.Noticer;
import com.groups.schicken.notification.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.groups.schicken.board.BoardService;
import com.groups.schicken.board.BoardVO;
import com.groups.schicken.common.util.DateManager;
import com.groups.schicken.common.util.FileManager;
import com.groups.schicken.common.vo.FileVO;
import com.groups.schicken.common.vo.Pager;
@Service
public class RepresentService implements BoardService {

	@Autowired
	private RepresentDAO representDAO;
	@Autowired
	private FileManager fileManager;
	@Autowired
	private Noticer noticer;

	
	public List<BoardVO> impList(BoardVO boardVO) throws Exception{
	
		List<BoardVO> ar = representDAO.impList(boardVO);		
		
		return ar;
	}


	@Override
	public List<BoardVO> getList(Pager pager,BoardVO boardVO) throws Exception {
		Map<String, Object> map = new HashMap<String,Object>();

		map.put("pager", pager);
		map.put("boardVO",boardVO);

		pager.makeIndex();
		pager.makeNum(representDAO.getTotalCount(map));
		System.out.println(pager.getStartIndex());
		System.out.println(pager.getPerPage());
		System.out.println(pager.getTotalPage());
		System.out.println(pager.getLastNum());

		return representDAO.getList(map);
	}


	@Override
	public int add(BoardVO boardVO,MultipartFile [] attach) throws Exception {
		BoardVO vo2 = new BoardVO();
			int result=representDAO.add(boardVO);
			
			if(boardVO.getImportant()) {
				noticer.sendNoticeWhole(getNoticeContent(boardVO.getTitle()), boardVO.getId() + "" , NotificationType.Notice);
				vo2.setRank(0L);
				vo2.setImportant(boardVO.getImportant());
				vo2.setId(boardVO.getId());
				result = representDAO.impRank(vo2);
				List<BoardVO> ar = representDAO.impList(vo2);

				for(int i = 0 ; i<ar.size() ; i++) {
					System.out.println(ar+"rlaqjatj");
					vo2.setRank(ar.get(i).getRank()+1L);
					vo2.setImportant(ar.get(i).getImportant());
					vo2.setId(ar.get(i).getId());
					result = representDAO.impRank(vo2);
				}
				
				if(ar.size()>3) {
					vo2.setRank(null);
					vo2.setImportant(false);
					vo2.setId(ar.get(3).getId());
					result = representDAO.impRank(vo2);
				}
			}
			
			for(int i =0 ; i <attach.length ; i++) {
				
				if(attach[i].isEmpty()) {
					continue;
				}
	
				FileVO fileVO = new FileVO();
	
	
				fileVO.setParentId(boardVO.getId());
				fileVO.setTblId("102");
	
				boolean result1 = fileManager.uploadFile(attach[i], fileVO);
	
	
				if(result1) {
					int intresult = 1;
					result=intresult;
				}
			}
	
		return result;
			
	}

	private String getNoticeContent(String title){
		if(title.length() < 20){
			return title;
		}

		return title.substring(0, 20) + "...";
	}

	@Override
	public BoardVO getDetail(BoardVO boardVO) throws Exception {

		 return representDAO.getDetail(boardVO);

	}

	@Override
	public List<BoardVO> pastPage(BoardVO boardVO) throws Exception {
		// TODO Auto-generated method stub
		return representDAO.pastPage(boardVO);
	}

	@Override
	public List<BoardVO> nextPage(BoardVO boardVO) throws Exception {
		// TODO Auto-generated method stub
		return representDAO.nextPage(boardVO);
	}

	@Override
	public int hit(BoardVO boardVO) throws Exception {

		return representDAO.hit(boardVO);
	}

	@Override
	public int update(BoardVO boardVO) throws Exception {
		BoardVO vo2 = new BoardVO();
		boardVO.setModifyDate(DateManager.getTodayDate());
		int result=representDAO.update(boardVO);
		
		if(boardVO.getImportant()) {
			noticer.sendNoticeWhole(getNoticeContent(boardVO.getTitle()), boardVO.getId() + "" , NotificationType.Notice);
			vo2.setImportant(boardVO.getImportant());
			List<BoardVO> ar = representDAO.impList(vo2);

			for(int i = 0 ; i<ar.size() ; i++) {
				System.out.println(ar+"rlaqjatj");
				vo2.setRank(ar.get(i).getRank()+1L);
				vo2.setImportant(ar.get(i).getImportant());
				vo2.setId(ar.get(i).getId());
				result = representDAO.impRank(vo2);
			}
			
			if(ar.size()>3) {
				vo2.setRank(null);
				vo2.setImportant(false);
				vo2.setId(ar.get(3).getId());
				result = representDAO.impRank(vo2);
			}
		}
		
		return result;
	}

	@Override
	public int delete(BoardVO boardVO) throws Exception {
		int result = representDAO.delete(boardVO);

		return result;
	}

	public int fileupdate(BoardVO boardVO,MultipartFile file) throws Exception {
		int result = 0;
		System.out.println("들어오니 ?");
		
			System.out.println("여기는 ?");
			FileVO fileVO = new FileVO();
			fileVO.setParentId(boardVO.getId());
			fileVO.setTblId("102");
			boolean result1 = fileManager.uploadFile(file, fileVO);
			
			if(result1) {
				result =1;			
			}
		
		
		return result;
	}




}
