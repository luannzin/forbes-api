import { json } from "@stricjs/app/send";
import { Router } from "@stricjs/router";
import { extractForbesData } from "./utils/extract";
import axios from "axios";

export default new Router()
  .get("/", async () => {
    return json({
      made: "by luannzin",
      guide: {
        "/:profile": "Get the profile data from Forbes",
        "/list": "Get the top 10 richest people",
      },
    });
  })
  .get("/:profile", async (ctx) => {
    const data = await extractForbesData(ctx.params.profile);

    return json({
      ...data,
    });
  })
  .get("/list", async () => {
    try {
      const { data } = await axios.get(
        "https://www.forbes.com/forbesapi/person/rtb/0/-estWorthPrev/true.json?fields=rank,uri,personName,lastName,gender,source,industries,countryOfCitizenship,birthDate,finalWorth,estWorthPrev,imageExists,squareImage,listUri&limit=10"
      );

      return json([...data.personList.personsLists]);
    } catch (e) {
      const err = e as Error;
      return json({
        error: err.message,
      });
    }
  });
