import dotenv from "dotenv";

dotenv.config();

const api = "https://api.lovdata.no/";

class LovdataManager {
  constructor() {
    this.apiKey = process.env.LOVDATA_KEY;
  }

  async getLovdataQuery() {
    const response = await fetch(api + "v1/userinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
      },
    });

    return response.json();
  }

  async getRenderRef(refID) {
    const response = await fetch(
      api + "renderRefID?refID=" + refID,
      {
        method: "GET",
        headers: {
          "X-API-Key": this.apiKey,
        },
      }
    );

    if (!response.ok) {
      const text = response;
      console.log(text);

      throw new Error(
        "Response was not ok. Status: " +
          response.status +
          " " +
          response.statusText
      );
    }

    return response.json();
  }
}

export default LovdataManager;
