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
      "You are not giving legal advice. Analyse the question and figure out if the user's question relates to one of these keywords:" +
      lawFields.map((lawField) => lawField.title.toLowerCase() + ", ") +
      " Find if the users question relates to one of the keywords, and write a response that contains only the keywords. No other text, just the keywords." +
      " If you cant find any keywords return no other text only this keyword: QQQQ";
    // this.interpretQuestionSystemMessage =
    //   "You are not giving legal advice. Analyse the question and figure out if the user's question relates to one of these keywords:" +
    //   lawFields.map((lawField) => lawField.title.toLowerCase() + ", ") +
    //   " If the users question relates to more than one of the keywords, write a message similar to" +
    //   " 'Her er de relevante fagfeltene jeg plukket opp på. Vennligst velg den du vil vite mer om først: #keyword#' " +
    //   "and only include the relevant keyword from the list given to you. However if there is only one keyword, write a message similar to" +
    //   " 'Okei, skal sjekke om jeg kan finne noe om #keyword# for deg. Vennligst vent litt...'";

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

  async extractKeywordsFromQuestion() {
    let extractedKeywords = [];
    let text = this.userQuestion;
    let extractPrompt =
      "Extract only the most important keywords from the following text." +
      " Exclude any question related words from your response and only include words that are useful for identifying the context of the question." +
      " Here is the text:";

    extractedKeywords = await request.postUserQuestion(extractPrompt, text);

    return extractedKeywords;
  }

  removeKeywordFromReponse({ response }, keywords) {
    let text = response.kwargs.content;

    if (keywords.length === 1) return text;

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
      activeKeywords: [],
      lovDataResponse: "",
      analysedResponse: "",
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

      console.log("Active lawfields", this.activeLawFields);

      if (this.activeLawFields.length === 1) {
        console.log("One law field");
        console.log(this.activeLawFields[0].document);
        response.lovDataResponse = await this.getLawDocument(
          this.activeLawFields[0].document
        );
        response.analysedResponse = await this.analyseLawDocument(
          response.lovDataResponse,
          this.userQuestion
        );
        console.log("analysed response", response.analysedResponse);
        // console.log("Lawdoc: ", lawDoc);
        // response.activeKeywords = await this.extractKeywordsFromQuestion();
        // console.log("Active keywords: ", response.activeKeywords);
      }
    } catch (err) {
      console.log("Error fetching response from agent 1: ");
      console.error(err);
    }

    console.log(response);
    return response;
  }

  async lawFieldQuery() {
    if (this.activeLawFields.length === 0) return;

    if (this.activeLawFields.length < 2) {
      return;
    }
  }

  async getLawDocument(lawRef) {
    let response;
    response = await request.postLovRenderRef(lawRef);
    return response.response;
  }

  async analyseLawDocument(lawDocument, userQuestion) {
    if (this.activeLawFields.length === 0) return;
    if (!lawDocument) return;

    let response;
    console.log(lawDocument, userQuestion);
    const prompt =
      "Bruk informasjonen fra denne teksten: " +
      lawDocument +
      "Til å svare på dette spørsmålet: " +
      userQuestion +
      "Inkluder kun svaret på spørsmålet, ikke hele teksten.";
    const systemMessage = "You will analyse text and simplify it";

    response = await request.postUserQuestion(prompt, systemMessage);

    return response.response.kwargs.content;
  }
}

export default LogicManager;
