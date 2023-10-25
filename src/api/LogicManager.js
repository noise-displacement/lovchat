import RequestManager from "./RequestManager";
import lawFields from "../utils/lawFields";

const request = new RequestManager();

class LogicManager {
  static #instance;

  constructor() {
    if (!LogicManager.#instance) {
      LogicManager.#instance = this;
    }

    this.userQuestion;
    this.interpretQuestionSystemMessage =
      "You are not giving legal advice. Analyse the question and figure out if the user’s question relates to one of these keywords:" +
      lawFields.map((lawField) => lawField.title.toLowerCase() + ", ") +
      " If the users question relates to more than one of the keywords, write a message similar to" +
      " ‘Her er de relevante fagfeltene jeg plukket opp på. Vennligst velg den du vil vite mer om først: #keyword#’ " +
      "and only include the relevant keyword from the list given to you. However if there is only one keyword, write a message similar to" +
      " 'Okei, skal sjekke om jeg kan finne noe om #keyword# for deg. Vennligst vent litt...'";

    this.activeLawFields = [];

    return LogicManager.#instance;
  }

  // - - - - - - - -
  // Helper functions
  // - - - - - - - -

  extractLawFieldsFromResponse({ response }) {
    let extractedLawFields = [];
    let text = response.kwargs.content;

    for (let lawField of lawFields) {
      const regex = new RegExp("\\b" + lawField.name + "\\b", "i");
      if (regex.test(text)) {
        extractedLawFields.push(lawField);
      }
    }

    this.activeLawFields = extractedLawFields;
  }

  removeKeywordFromReponse({ response }, keywords) {
    let text = response.kwargs.content;

    if(keywords.length === 1) return text;

    for (let keyword of keywords) {
      const regex = new RegExp("\\b" + keyword.name + "\\b", "i");
      text = text.replace(regex, "");
    }

    response.kwargs.content = text;

    return text;
  }

  // - - - - - - - -
  // User question
  // - - - - - - - -

  setUserQuestion(userQuestion) {
    this.userQuestion = userQuestion;
  }

  getUserQuestion() {
    return this.userQuestion;
  }

  // - - - - - - - -
  // Question interpreter
  // - - - - - - - -

  async interpretQuestion() {
    await request.postUserQuestion(
      this.userQuestion,
      this.interpretQuestionSystemMessage
    );
  }

  async runFullQuery(userPrompt) {
    let response = {
      text: "",
      activeLawFields: [],
    };

    this.setUserQuestion(userPrompt);

    try {
      response = await request.postUserQuestion(
        this.userQuestion,
        this.interpretQuestionSystemMessage
      );

      this.extractLawFieldsFromResponse(response);
      response.activeLawFields = this.activeLawFields;
      response.text = this.removeKeywordFromReponse(
        response,
        this.activeLawFields
      );
    } catch (err) {
      console.log("Error fetching response from agent 1: ", err);
    }

    return response;
  }
}

export default LogicManager;
