import { useState } from "react";

function FaqDrawer(props) {
  const question = props.question;
  const answer = props.answer;

  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-dark-red ">
      <div className="py-4">
        <button
          className="flex justify-between w-full"
          onClick={() => setOpen(!open)}
        >
          <h2 className="font-semibold text-dark-red text-left">{question}</h2>
          <span className="text-dark-red">open</span>
        </button>

        {open ? (
          <div className="mt-4">
            <p className="text-dark-red">{answer}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FaqDrawer;
