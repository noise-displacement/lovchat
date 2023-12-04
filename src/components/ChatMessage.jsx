import PropTypes from "prop-types";
import { motion } from "framer-motion";

function ChatMessage(props) {
  let message = props.message;
  let activeLawFields = props.activeLawFields;

  let userMessageStyle = "bg-dark-red text-white self-end rounded-bl-lg";
  let botMessageStyle = "bg-white text-dark-red self-start rounded-br-lg";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: (message.user ? 0.25 : 0),
            ease: [0.61, 1, 0.88, 1],
          },
        }}
        exit={{ opacity: 0 }}
        key={message.key}
        className={
          "message relative p-6 mb-4 max-w-[80%] rounded-t-lg shadow-md " +
          (message.user ? userMessageStyle : botMessageStyle)
        }
      >
        <div
          className={
            "absolute w-12 h-12 rounded-full bg-slate-300 bottom-0 shadow-md " +
            (message.user
              ? "right-[-4rem] bg-[url('/userImage.png')] bg-contain"
              : "left-[-4rem] bg-[url('/LOGO.png')] bg-contain bg-no-repeat")
          }
        ></div>
        <p>{message.message}</p>
      </motion.div>

      <div>
        {activeLawFields.length > 1 && !message.user
          ? activeLawFields.map((field, i) => {
              return (
                <button
                  className="px-4 py-2 rounded-md bg-dark-red text-white mr-2 hover:bg-light-red transition-all"
                  key={i}
                >
                  {field.title}
                </button>
              );
            })
          : null}
      </div>
    </>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.object,
  activeLawFields: PropTypes.array,
};

export default ChatMessage;
