class RequestManager {
  static #instance;

  constructor() {
    if (!RequestManager.#instance) {
      RequestManager.#instance = this;
    }

    this.userQuestion;

    return RequestManager.#instance;
  }

  // - - - - - - - -
  // User question
  // - - - - - - - -

  async postUserQuestion(prompt, systemMessage) {
    const response = await fetch("/api/interpretQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt, systemMessage: systemMessage }),
    });

    return response.json();
  }

  async postLovdataQuery() {
    const response = await fetch("/api/lovdataQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    return response.json();
  }

  async postLovRenderRef(refID) {
    console.log("Frontend req manager refID: ", refID);
    const response = await fetch("/api/renderRef", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refID: refID }),
    });

    // console.log("RequestManResponse: ", response.json());

    return response.json();
  }
}

export default RequestManager;
