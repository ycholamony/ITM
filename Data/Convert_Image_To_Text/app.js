
imageInput.onchange=e=>{
 let f=e.target.files[0];
 if(f) preview.src=URL.createObjectURL(f);
};

async function extractText(){
 let file=imageInput.files[0];
 if(!file){alert('Select image');return;}

 status.innerHTML='Processing OCR...';

 const {data:{text}} = await Tesseract.recognize(
   file,
   lang.value,
   {
     logger:m=>{
       if(m.status==='recognizing text'){
         let p=Math.round(m.progress*100);
         bar.style.width=p+'%';
         bar.innerText=p+'%';
       }
     }
   }
 );

 result.value=text;
 status.innerHTML='Completed';
}

function downloadText(){
 const blob=new Blob([result.value],{type:'text/plain'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='OCR_Result.txt';
 a.click();
}

function copyText(){
 result.select();
 document.execCommand('copy');
 alert('Copied');
}
