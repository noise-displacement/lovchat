import PropTypes from "prop-types";

function ChatMessage(props) {
  let message = props.message;
  let activeLawFields = props.activeLawFields;

  let userMessageStyle = "bg-dark-red text-white self-end";
  let botMessageStyle = "bg-white text-dark-red self-start";

  return (
    <>
      <div
        key={message.key}
        className={
          "message p-4 mb-4 rounded-xl max-w-[80%] " +
          (message.user ? userMessageStyle : botMessageStyle)
        }
      >
        <p>{message.message}</p>
      </div>

      <div>
        {activeLawFields.length > 1 && !message.user
          ? activeLawFields.map((field, i) => {
              return (
                <button className="px-4 py-2 rounded-md bg-dark-red text-white mr-2 hover:bg-light-red transition-all" key={i}>
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
