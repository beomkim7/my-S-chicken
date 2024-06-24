
console.log("들어오나?")


const btn = document.getElementById("btn")
let title = document.getElementById("title")
let edit = document.getElementById("editor")
let content = document.getElementById("content")
let sort = document.getElementById("sort")
const frm = document.querySelector("#frm")
let important = document.getElementById("important")
const fini = document.getElementById("fini")
const board = document.querySelector("h1")
const fileman = document.getElementById("file_man")
const ment = document.getElementById("ment")
const board_id = document.getElementById("board_id")

	let arr = [];
	
	fetch("/represent/fileShow?id=" + board_id.value, {
	    method: "GET",
	    headers: {
	        'Content-Type': 'application/json',  // Content-Type 헤더는 GET 요청에는 필요하지 않습니다.
	    }
	}).then(r=>r.json())
	.then(res=>{
		let replies = "";

		console.log(res);
		res.fileVO.forEach(reply=>{
			replies +=			
			`<div>현재파일 : ${reply.originName} <a class="file_delete" id="file-delete-btn" data-name="${reply.name}" data-id="${reply.id}" href="#">지우기</a></div>`
			arr.push(replies);
		})
		
	if(arr.length==3){
		ment.innerHTML = "파일은 3개까지입니다."
		ment.style.color = "red";		
		fini.disabled = true;
		}
	fileman.innerHTML +=replies;
	
	})
	
	


	window.addEventListener('load',function(){
		sort.value=sort.dataset.sort
		
		if(important.value=='true'){		
			important.checked=true;
			important.value=1;
		}else{
			important.value=0;
		}
	})



	function check1(){
		if(important.checked){
			important.value=1;
			console.log("체크됨")
			console.log(important.value)
		}else{
			important.value=0;
		
		}
	}
	

    ClassicEditor
        .create(document.querySelector('#editor'),{
			ckfinder:{
				uploadUrl : 'http://localhost/ck'
			}
		})
        .then(editor => {
			window.editor = editor;
            editor.editing.view.change(writer => {
                writer.setStyle('height', '50vh', editor.editing.view.document.getRoot());
		const editordata = editor.getData();
         
                
            });
        })
        .catch(error => {
            console.error(error);
        });


	btn.addEventListener('click',(e)=>{
		e.preventDefault();		
		check1();
		

		if(title.value == ''){
			alert("제목을 입력하세요");
			
			return false;

		}
		if(edit.value == ''){
			alert("내용을 입력하세요");
			
			return false;			
		}
	frm.submit();
	})
		
	fini.addEventListener("input",(e)=>{
		const formData = new FormData(frm);		
		console.log(formData);
		console.log(fini.value);
		console.log(`${board.dataset.id}`)
		console.log(e.target.files)
		
		fetch('fileupdate',{
			method:"post",
			body:formData
		}).then(r=>r.json())
		.then(res=>{
			
			let replies = "";
			arr = [];
			res.fileVO.forEach(reply=>{
				replies +=			
				`<div>현재파일 : ${reply.originName} <a class="file_delete" id="file-delete-btn" data-name="${reply.name}" data-id="${reply.id}" href="#">지우기</a></div>`
				arr.push(replies);
			})
			fileman.innerHTML =replies;
		
			if(arr.length==3){
			ment.innerHTML = "파일은 3개까지입니다."
			ment.style.color = "red";		
			fini.disabled = true;
			}
		})
	})
	
	fileman.addEventListener("click", e => {
		if(e.target.tagName=="A"){
			let check = confirm("이미지를 삭제하시겠습니까?");
				if(check){	
					let fileId = e.target.getAttribute("data-id");
					let name = e.target.getAttribute("data-name")
					
					let data = {
						'id' :  fileId , //fileId
						'name':	name
					};		
					$.ajax({
						url:"/fileDelete",
						method: 'post',
						data: JSON.stringify(data),
						contentType:"application/json",
						dataType : "JSON",
						success : function(data){
							e.target.parentElement.remove();
							alert("삭제 되었습니다");
							
							if(fileman.getElementsByTagName("DIV").length <4){
								ment.innerHTML="";
								fini.disabled = false;
								}
							}
					})
				}
				
			}
		})

	


