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
      "You will analyse this question and find any relation to any of these keywords: " +
      lawFields.map((lawField) => lawField.title.toLowerCase() + ", ") +
      " If the quesition has a relation to one or more of the keywords, write the matching keywords in you response. But only write the keywords, no commas, nothing else but the keywords. The keywords also needs to be written exactly like the keywords given to you." +
      " If you cant find any keyword that is matching, write nothing but this code in your response: QQQQ";

    // "Du skal analysere et spørsmål. Analyser spørsmålet og finn relasjon til disse ordene:" +
    // lawFields.map((lawField) => lawField.title.toLowerCase() + ", ") +
    // " Hvis spørsmålet har en relasjon til ett av ordene, skriv ut kun ordet eller ordene fra listen som matcher" +
    // " Hvis du ikke kan finne noe stikkord som matcher, skriv ut kun denne koden og ingenting annet: QQQQ";
    // this.interpretQuestionSystemMessage =
    //   "You are not giving legal advice. Analyse the question and figure out if the user's question relates to one of these keywords:" +
    //   lawFields.map((lawField) => lawField.title.toLowerCase() + ", ") +
    //   " If the users question relates to more than one of the keywords, write a message similar to" +
    //   " 'Her er de relevante fagfeltene jeg plukket opp på. Vennligst velg den du vil vite mer om først: #keyword#' " +
    //   "and only include the relevant keyword from the list given to you. However if there is only one keyword, write a message similar to" +
    //   " 'Okei, skal sjekke om jeg kan finne noe om #keyword# for deg. Vennligst vent litt...'";

    this.noCategoryDetectedSystemMessage =
      "Skriv en melding som beskriver at du ikke kan svare på spørsmålet fordi du mangler riktig kontekst. Be så brukeren om å skrive en melding med flere detaljer om temaet som brukeren skriver om";

    this.activeLawFields = [];

    return LogicManager.#instance;
  }

  // - - - - - - - -
  // Helper functions
  // - - - - - - - -

  extractLawFieldsFromResponse({ response }) {
    let extractedLawFields = [];
    let text = response.kwargs.content;
    console.log("Lawfield", text);

    for (let lawField of lawFields) {
      let words = lawField.name.split(" ");
      let regexPattern = words
        .map((word) => "(?=.*\\b" + word + "\\b)")
        .join("");
      const regex = new RegExp(regexPattern, "i");
      // const regex = new RegExp("\\b" + lawField.name + "\\b", "i");
      console.log(regex.test(text));
      if (regex.test(text)) {
        console.log("Lawfield match", lawField);
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
      analysedQuestion: "",
      analysedResponse: "",
      noCategoryDetectedText: "",
    };

    this.setUserQuestion(userPrompt);

    try {
      response.analysedQuestion = await request.postUserQuestion(
        this.userQuestion,
        this.interpretQuestionSystemMessage
      );

      this.extractLawFieldsFromResponse(response.analysedQuestion);
      response.activeLawFields = this.activeLawFields;

      // response.text = this.removeKeywordFromReponse(
      //   response,
      //   this.activeLawFields
      // );

      console.log("Active lawfields", this.activeLawFields);

      if (
        this.activeLawFields.length === 1 &&
        this.activeLawFields[0].name === "QQQQ"
      ) {
        response.noCategoryDetectedText = await request.postUserQuestion(
          this.userQuestion,
          this.noCategoryDetectedSystemMessage
        ).then((res) => {
          console.log(res);
          return res.response.kwargs.content;
        });
      } else if (this.activeLawFields.length === 1) {
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
      } else {
        for(let i = 0; i < this.activeLawFields.length; i++) {
          console.log("lawfield condjks", this.activeLawFields[i]);
          response.lovDataResponse += await this.getLawDocument(
            this.activeLawFields[i].document
          );

          console.log("Lovdata response", response.lovDataResponse);
        }

        response.analysedResponse = await this.analyseLawDocument(
          response.lovDataResponse,
          this.userQuestion
        );
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
    const systemMessage = "You will analyse the text";

    response = await request.postUserQuestion(prompt, systemMessage);

    return response.response.kwargs.content;
  }
}

export default LogicManager;
