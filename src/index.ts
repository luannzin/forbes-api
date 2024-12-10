import { json } from "@stricjs/app/send";
import { Router } from "@stricjs/router";
import { extractForbesData } from "./utils/extract";

export default new Router()
  .get("/", async () => {
    return json({
      made: "by luannzin",
      guide: {
        "/:profile": "Get the profile data from Forbes",
      },
    });
  })
  .get("/:profile", async (ctx) => {
    const data = await extractForbesData(ctx.params.profile);

    return json({
      ...data,
    });
  });
