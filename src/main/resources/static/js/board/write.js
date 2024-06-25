
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
	


