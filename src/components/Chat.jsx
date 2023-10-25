import PropTypes from "prop-types";

function Chat(props) {
  let chatMessages = props.chatMessages;
  let activeLawFields = props.activeLawFields;

  let userMessageStyle = "bg-dark-red text-white self-end";
  let botMessageStyle = "bg-white text-dark-red self-start";

  return (
    <>
      <div className="flex flex-col grow">
        {chatMessages.map((message) => {
          return (
            <div
              key={message.key}
              className={
                "message p-4 mb-4 rounded-xl max-w-[80%] " +
                (message.user ? userMessageStyle : botMessageStyle)
              }
            >
              <p>{message.message}</p>
            </div>
          );
        })}
      </div>

      <div>
        {activeLawFields.length > 1
          ? activeLawFields.map((field, i) => {
              return (
                <button className="p-2 bg-slate-100 mr-2" key={i}>
                  {field.title}
                </button>
              );
            })
          : null}
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
