
console.log("들어오나?")


const btn = document.getElementById("btn")
let title = document.getElementById("title")
let edit = document.getElementById("editor")
let content = document.getElementById("content")
let sort = document.getElementById("sort")
const frm = document.querySelector("#frm")
let important = document.getElementById("important")
let board = document.getElementById("board")
let attach_id = document.querySelector(".attach_id")
let files = document.querySelectorAll(".files")

	console.log(sort.value);
	console.log(board.innerHTML.trim());

		if(board.innerHTML.trim()=="대표 공지"){
			sort.value =1;
		}
		if(board.innerHTML.trim()=="경조사 공지"){
			console.log("들어오니 ?")
			sort.value = 0;
			important.disabled = true;
		}
		
	
	function check1(){
		
		if(important.checked){
			important.value=1;
			console.log("체크됨")
			console.log(important.value)
			
		}else{
			important.value=0;
			
		}
	}
	
	sort.addEventListener("change",()=>{
		if(sort.value ==1){
			important.disabled = false;
		}else{
			important.disabled = true;
		}
		
	})

    ClassicEditor
        .create(document.querySelector('#editor'))
        .then(editor => {

            editor.editing.view.change(writer => {
                writer.setStyle('height', '50vh', editor.editing.view.document.getRoot());
		const editordata = editor.getData();
         
                
            });
        })
        .catch(error => {
            console.error(error);
        });


	attach_id.addEventListener("change",()=>{
		for(let i = 0 ; i < files.length;i++){
			if(files[i].querySelector("input").value != ""){		
				files[i].querySelector("a").style.display = "inline";				
			}
			
			files[i].querySelector("a").addEventListener("click",()=>{				
				files[i].querySelector("input").value = ""
				files[i].querySelector("a").style.display = "none";
			})
		}				
	})
	
	
	


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
	


