import { useState } from "react";
import "./InterviewAI.css";

import api from "../../axiosConfig";
import TypingAnimation from "./TypingAnimation";
import { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import VoiceButton from "./VoiceButton";


import {
  FaRobot,
  FaTimes,
  FaPaperclip,
  FaPaperPlane
} from "react-icons/fa";



function InterviewAI() {

    const [open, setOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [atsResult, setAtsResult] = useState(null);
    const [jd, setJd] = useState("");
    const [jdResult, setJdResult] = useState(null);


    const [messages, setMessages] = useState([
  {
    sender: "ai",
    text: "👋 Hi! I am IntBuddy AI. Ask me any interview question."
  }
]);

    const bottomRef = useRef(null);
    const fileInputRef = useRef(null);
    useEffect(()=>{

bottomRef.current?.scrollIntoView({

behavior:"smooth"

});

},[messages,loading]);



    const sendMessage = async () => {

    if(message.trim()==="") return;

    const userMessage = {

        sender:"user",

        text:message

    };

    setMessages(prev=>[...prev,userMessage]);

    const currentMessage = message;

    setMessage("");
    setShowMenu(false);
    setLoading(true);

    try{

       const response = await api.post("/ai/chat", {
    message: currentMessage
});
        setMessages(prev=>[

            ...prev,

            {

                sender:"ai",

                text:response.data.reply

            }

        ]);

    }catch(error){

        setMessages(prev=>[

            ...prev,

            {

                sender:"ai",

                text:"❌ AI Server Error"

            }

        ]);

    }

    setLoading(false);

}

const downloadChat = () => {

    const pdf = new jsPDF();

    let y = 20;

    messages.forEach((msg) => {

        pdf.text(`${msg.sender}: ${msg.text}`, 10, y);

        y += 10;

    });

    pdf.save("InterviewChat.pdf");

};
const analyzeResume = async () => {

    setAtsResult(null);

    if (!selectedFile) {
        alert("Please upload resume");
        return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {

        const response = await api.post(
            "/resume/analyze",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        setAtsResult(response.data);

    } catch (error) {

        alert("Resume Analysis Failed");

    }

};

const matchJD = async () => {

    if (!selectedFile) {
        alert("Upload Resume First");
        return;
    }

    if (jd.trim() === "") {
        alert("Paste Job Description");
        return;
    }

    const formData = new FormData();

    formData.append("resume", selectedFile);
    formData.append("jd", jd);

    try {

        const response = await api.post(
            "/resume/match-jd",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        setJdResult(response.data);

    } catch (error) {

        alert("JD Match Failed");

    }

};
    return (
        <>

            {/* Floating Button */}

            <button
className="ai-button"
onClick={()=>{
console.log("AI Clicked");
setOpen(true);
}}
>
                <FaRobot size={32} />
                <span className="pulse"></span>
            </button>

            {/* Chat Window */}

            {open && (

                <div className="chat-window">

                    {/* Header */}

               <div className="chat-header">

    <div className="header-left">

        <div className="robot-avatar">
            🤖
        </div>

        <div>
            <h5 className="mb-0">IntBuddy AI</h5>
            <small>🟢 Online</small>
        </div>

    </div>

    <div className="header-icons">

        <button
            className="menu-btn"
            onClick={() => setShowMenu(!showMenu)}
        >
            <i className="bi bi-three-dots-vertical"></i>
        </button>

        <button onClick={() => setOpen(false)}>
            <FaTimes />
        </button>

    </div>

</div>
{showMenu && (

<div className="menu-popup">



    <div
    className="menu-item"
    onClick={() => {

        setMessages([
            {
                sender: "ai",
                text: "👋 Welcome to IntBuddy AI. Ask me anything."
            }
        ]);

        setShowMenu(false);

    }}
>
    <i className="bi bi-plus-circle"></i>
    <span>New Chat</span>
</div>

    <div className="menu-item">
        <i className="bi bi-clock-history"></i>
        <span>Interview History</span>
    </div>

    <div
    className="menu-item"
    onClick={() => {

        setMessages([]);

        setShowMenu(false);

    }}
>
    <i className="bi bi-trash"></i>
    <span>Clear Chat</span>
</div>

   <div
    className="menu-item"
    onClick={downloadChat}
>
    <i className="bi bi-download"></i>
    <span>Download Chat</span>
</div>

    <div className="menu-item">
        <i className="bi bi-gear"></i>
        <span>Settings</span>
    </div>

</div>

)}

                    {/* Body */}

                  

                   <div className="chat-body">
                    


    {messages.map((msg, index) => (

        <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "ai-message"}
        >
            {msg.text}
        </div>
        

    ))}

    {loading && <TypingAnimation />}
    {
selectedFile && (

<div className="uploaded-file">

📄 {selectedFile.name}

</div>

)
}

{
selectedFile && (

<div className="resume-actions">

    <button
        className="resume-btn"
        onClick={analyzeResume}
    >
        Check ATS Score
    </button>

    <textarea
        className="jd-box"
        placeholder="Paste Job Description..."
        value={jd}
        onChange={(e)=>setJd(e.target.value)}
    />

    <button
        className="resume-btn"
        onClick={matchJD}
    >
        Match With JD
    </button>

</div>

)
}
{
atsResult && (

<div className="ats-card">

    <h3>ATS Score</h3>

    <h1>{atsResult.score}%</h1>

    <h4>Suggestions</h4>

    <ul>

        {atsResult.suggestions.map((item,index)=>(

            <li key={index}>{item}</li>

        ))}

    </ul>

</div>

)
}
{
jdResult && (

<div className="jd-card">

    <h3>JD Match</h3>

    <h1>{jdResult.match}%</h1>

    <h4>Matched Skills</h4>

    <ul>

        {jdResult.strengths.map((item,index)=>(

            <li key={index}>{item}</li>

        ))}

    </ul>

    <h4>Missing Keywords</h4>

    <ul>

        {jdResult.missingKeywords.map((item,index)=>(

            <li key={index}>{item}</li>

        ))}

    </ul>

</div>

)
}   

    <div ref={bottomRef}></div>

</div>





                    {/* Footer */}
                    
                   <div className="chat-footer">

    <button
        className="attach-btn"
        onClick={() => fileInputRef.current.click()}
    >
        <FaPaperclip />
    </button>

    <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
       onChange={(e) => {

    const file = e.target.files[0];

    setSelectedFile(file);

    setAtsResult(null);

    setJdResult(null);
        }}
    />

    <input
        className="chat-input"
        type="text"
        placeholder="Ask Interview Question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        }}
    />

   {message.trim() === "" ? (
    <VoiceButton setMessage={setMessage} />
) : (
    <button
        className="send-btn"
        onClick={sendMessage}
    >
        <FaPaperPlane />
    </button>
)}

</div>

                </div>

            )}

        </>
    );
}

export default InterviewAI;