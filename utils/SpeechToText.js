export default function SpeechToText() {
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        setTranscript(currentTranscript);
    }
}
