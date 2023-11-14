import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import InputForm from "../components/InputForm";
import { motion } from "framer-motion";

function ChatPage() {
  const [activeLawFields, setActiveLawFields] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    console.log(activeLawFields);
  }, [activeLawFields]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.25,
          ease: [0.61, 1, 0.88, 1],
        },
      }}
      exit={{ opacity: 0 }}
      className="flex h-full"
    >
        <div className="previousChats w-[33vw] bg-white h-full rounded-3xl">
          <div className="p-6 flex flex-col justify-between h-full">
            <h1 className="text-md font-semibold">Tidligere samtaler</h1>

            <div className="flex flex-col mt-4 gap-4 grow">
              <span className="bg-light-grey p-4 text-dark-red rounded-xl">
                Kan utleier nekte husdyr?
              </span>
              <span className="bg-light-grey p-4 text-dark-red rounded-xl">
                Hva skjer om jeg ikke betaler leien i tide?
              </span>
            </div>

            <div className="flex">
              <span className="bg-dark-red p-4 text-white rounded-xl w-full flex items-center gap-4">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.4746"
                  height="16.123"
                >
                  <g>
                    <rect
                      height="16.123"
                      opacity="0"
                      width="16.4746"
                      x="0"
                      y="0"
                    />
                    <path
                      d="M0 8.05664C0 8.53516 0.400391 8.92578 0.869141 8.92578L7.1875 8.92578L7.1875 15.2441C7.1875 15.7129 7.57812 16.1133 8.05664 16.1133C8.53516 16.1133 8.93555 15.7129 8.93555 15.2441L8.93555 8.92578L15.2441 8.92578C15.7129 8.92578 16.1133 8.53516 16.1133 8.05664C16.1133 7.57812 15.7129 7.17773 15.2441 7.17773L8.93555 7.17773L8.93555 0.869141C8.93555 0.400391 8.53516 0 8.05664 0C7.57812 0 7.1875 0.400391 7.1875 0.869141L7.1875 7.17773L0.869141 7.17773C0.400391 7.17773 0 7.57812 0 8.05664Z"
                      fill="#ffffff"
                    />
                  </g>
                </svg>
                <span>Ny samtale</span>
              </span>
            </div>
          </div>
        </div>

        <div className="chat w-full h-full flex justify-center">
          <div className="p-4 flex flex-col h-full max-w-3xl w-full">
            <Chat
              chatMessages={chatMessages}
              activeLawFields={activeLawFields}
            />

            <InputForm
              activeLawFields={activeLawFields}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              setActiveLawFields={setActiveLawFields}
            />
          </div>
        </div>
    </motion.div>
  );
}

export default ChatPage;
