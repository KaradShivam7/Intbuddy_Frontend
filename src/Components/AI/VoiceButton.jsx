import { FaMicrophone } from "react-icons/fa";

function VoiceButton({ setMessage }) {

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert("Speech Recognition not supported");

            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.start();

        recognition.onresult = (event) => {

            setMessage(event.results[0][0].transcript);

        };

    };

    return (

        <button
    type="button"
    className="voice-btn"
    onClick={startListening}
>
    <FaMicrophone />
</button>
    );

}

export default VoiceButton;