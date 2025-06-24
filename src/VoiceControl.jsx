import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function VoiceControl({ handleNextStep, handlePrevStep, handleRepeatStep }) {
  const [autoListen, setAutoListen] = useState(false);

  const commands = [
    {
      command: ["next step", "next", "continue"],
      callback: () => handleNextStep(),
    },
    {
      command: ["previous step", "back", "go back",'previous'],
      callback: () => handlePrevStep(),
    },
    {
      command: ["repeat", "say again", "repeat step", "repeat again"],
      callback: () => handleRepeatStep(),
    },
    {
      command: ["stop", "stop instuctions","exit","quit"],
      callback: () => stopListening(),
    },
  ];

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition, Try Google Chrome.");
      return;
    }

    const interval = setInterval(() => {
      if (autoListen && !listening) {
        SpeechRecognition.startListening({ continuous: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [autoListen, listening, browserSupportsSpeechRecognition]);

  const startListening = () => {
    setAutoListen(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setAutoListen(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="m-2">
      <p className="text-xl">Transcript: {transcript}</p>

      <div className="flex justify justify-center">
        <button
          onClick={startListening}
          className="  border border-color-purple-500 rounded-xl text-purple-500  w-50 p-2 my-2 cursor-pointer"

        >
          Start using Voice commands
        </button>
      </div>
    </div>
  );
}

export default VoiceControl;
