import {useState} from "react";
import api from "../../axiosConfig";
import "./InterviewAI.css";


function ResumeScanner(){

const [file,setFile]=useState(null);
const [result,setResult]=useState(null);
const [loading,setLoading]=useState(false);



const analyzeResume=async()=>{


if(!file){
alert("Please upload resume");
return;
}


const formData=new FormData();

formData.append(
"resume",
file
);


try{

setLoading(true);


const response =
await api.post(
"/resume/analyze",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);


setResult(response.data);


}catch(error){

alert("Resume analysis failed");

}

setLoading(false);


}



return(

<div className="resume-box">


<h3>
📄 Resume ATS Scanner
</h3>


<input

type="file"

accept=".pdf,.docx"

onChange={(e)=>
setFile(e.target.files[0])
}

/>



<button
    type="button"
    className="attach-btn"
    onClick={() => fileInputRef.current.click()}
>
    <FaPaperclip />
</button>



{
result &&

<div className="ats-result">


<h2>

ATS Score :

<span>
{result.score}%
</span>

</h2>


<h4>
Suggestions
</h4>


<ul>

{
result.suggestions.map(
(item,index)=>

<li key={index}>
{item}
</li>

)
}

</ul>


</div>

}


</div>

)


}

export default ResumeScanner;