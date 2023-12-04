import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import { motion } from "framer-motion";

function Chat(props) {
  let chatMessages = props.chatMessages;
  let activeLawFields = props.activeLawFields;
  let loadingMessage = props.loadingMessage;

  return (
    <>
      <div className="flex flex-col grow">
        {chatMessages.map((message) => {
          return (
            <ChatMessage
              key={message.key}
              message={message}
              activeLawFields={activeLawFields}
            />
          );
        })}

        {loadingMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.4,
                duration: 0.25,
                ease: [0.61, 1, 0.88, 1],
              },
            }}
            exit={{ opacity: 0, delay: .5 }}
            className="p-4 mb-4 bg-white text-dark-red self-start relative rounded-t-lg rounded-br-lg shadow-md"
          >
            <div
              className={
                "absolute w-12 h-12 rounded-full bg-slate-300 bottom-0 shadow-md left-[-4rem] bg-[url('/LOGO.png')] bg-contain bg-no-repeat"
              }
            ></div>
            <p><img className="h-8" src="/loadinggif.gif"></img></p>
          </motion.div>
        ) : null}
      </div>
    </>
  );
}

Chat.propTypes = {
  chatMessages: PropTypes.array,
  receivedMessage: PropTypes.string,
  activeLawFields: PropTypes.array,
  loadingMessage: PropTypes.bool,
};

export default Chat;
