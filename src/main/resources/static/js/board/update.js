

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
	console.log(important.value)
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
			console.log(important.value);
			important.checked=true;
			important.value=1;
		}else{
			important.value=0;
			important.disabled=true;
		}
	})

	sort.addEventListener('change',function(){
		console.log(sort.value);
		if(sort.value==1){
			important.disabled=false;
		}else{
			important.disabled=true;
			important.checked=false;
			important.value = 0;
		}
	})

	

        ClassicEditor
            .create(document.querySelector('#editor'), {
                ckfinder: {
                    uploadUrl: '/ck'
                }
            })
            .then(editor => {
                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    return new MyUploadAdapter(loader);
                };
            })
            .catch(error => {
                console.error(error);
            });

        class MyUploadAdapter {
            constructor(loader) {
                this.loader = loader;
            }

            upload() {
                return this.loader.file
                    .then(file => new Promise((resolve, reject) => {
                        this._resizeImage(file, 600, 400, resolve, reject);
                    }));
            }

            abort() {
                // Reject the promise returned from upload() method.
            }

            _resizeImage(file, maxWidth, maxHeight, resolve, reject) {
                const reader = new FileReader();
                reader.onload = event => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        canvas.toBlob(blob => {
                            const newFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now()
                            });
                            this._sendToServer(newFile, resolve, reject);
                        }, file.type);
                    };
                    img.onerror = () => reject('Image load error');
                    img.src = event.target.result;
                };
                reader.onerror = () => reject('File read error');
                reader.readAsDataURL(file);
            }

            _sendToServer(file, resolve, reject) {
                const data = new FormData();
                data.append('upload', file);

                fetch('/ck', {
                    method: 'POST',
                    body: data
                })
                .then(response => response.json())
                .then(result => {
                    resolve({
                        default: result.url
                    });
                })
                .catch(reject);
            }
        }


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

	


