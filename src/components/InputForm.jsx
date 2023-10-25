import PropTypes from "prop-types";
import LogicManager from "../api/LogicManager";
import RequestManager from "../api/RequestManager";
import { useState } from "react";

function InputForm(props) {
  let chatMessages = props.chatMessages;
  let setChatMessages = props.setChatMessages;
  let setActiveLawFields = props.setActiveLawFields;

  const [userPrompt, setUserPrompt] = useState("");

  const manager = new LogicManager();
  const request = new RequestManager();

  return (
    <div className="bg-white overflow-hidden rounded-xl flex">
      <input
        type="text"
        id="prompt"
        placeholder="Send en melding"
        className="w-full bg-0 p-4 text-dark-red"
        onChange={(e) => setUserPrompt(e.target.value)}
        value={userPrompt}
      />

      <button
        className="px-6 py-4"
        onClick={async () => {
          let response;

          setChatMessages((previousMessages) => [
            ...previousMessages,
            {
              key: chatMessages.length,
              user: true,
              message: userPrompt,
            },
          ]);

          setUserPrompt("");

          console.log(chatMessages);

          let fetch = await manager.runFullQuery(userPrompt);
          response = fetch;

          setChatMessages((previousMessages) => [
            ...previousMessages,
            {
              key: chatMessages.length + 1,
              user: false,
              message: fetch.text,
            },
          ]);

          console.log(chatMessages);

          // setReceivedMessage(response.text);
          setActiveLawFields(response.activeLawFields);
        }}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="21.8262"
          height="21.5918"
        >
          <g>
            <rect height="21.5918" opacity="0" width="21.8262" x="0" y="0" />
            <path
              d="M12.2266 21.5918C12.9297 21.5918 13.4277 20.9863 13.7891 20.0488L20.1855 3.33984C20.3613 2.89062 20.459 2.49023 20.459 2.1582C20.459 1.52344 20.0684 1.13281 19.4336 1.13281C19.1016 1.13281 18.7012 1.23047 18.252 1.40625L1.45508 7.8418C0.634766 8.1543 0 8.65234 0 9.36523C0 10.2637 0.683594 10.5664 1.62109 10.8496L8.67188 12.9199L10.7227 19.8828C11.0156 20.8691 11.3184 21.5918 12.2266 21.5918ZM9.11133 11.4355L2.37305 9.375C2.2168 9.32617 2.16797 9.28711 2.16797 9.21875C2.16797 9.15039 2.20703 9.10156 2.35352 9.04297L15.5566 4.04297C16.3379 3.75 17.0898 3.35938 17.8125 3.02734C17.168 3.55469 16.3672 4.17969 15.8301 4.7168ZM12.3828 19.4434C12.3047 19.4434 12.2656 19.375 12.2168 19.2188L10.1562 12.4805L16.875 5.76172C17.4023 5.23438 18.0566 4.41406 18.5742 3.75C18.2422 4.49219 17.8418 5.24414 17.5488 6.03516L12.5488 19.2383C12.4902 19.3848 12.4512 19.4434 12.3828 19.4434Z"
              fill="#E7473C"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}

InputForm.propTypes = {
  chatMessages: PropTypes.array,
  setChatMessages: PropTypes.func,
  setActiveLawFields: PropTypes.func,
};

export default InputForm;
