import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";

function Chat(props) {
  let chatMessages = props.chatMessages;
  let activeLawFields = props.activeLawFields;

  return (
    <>
      <div className="flex flex-col grow">
        {chatMessages.map((message) => {
          return (
            <ChatMessage key={message.key} message={message} activeLawFields={activeLawFields} />
          );
        })}
      </div>
    </>
  );
}

Chat.propTypes = {
  chatMessages: PropTypes.array,
  receivedMessage: PropTypes.string,
  activeLawFields: PropTypes.array,
};

export default Chat;
