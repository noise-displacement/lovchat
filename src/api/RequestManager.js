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
}

export default RequestManager;