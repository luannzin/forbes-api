import { json } from "@stricjs/app/send";
import { Router } from "@stricjs/router";
import { extractForbesData } from "./utils/extract";

export default new Router().get("/:profile", async (ctx) => {
  const data = await extractForbesData(ctx.params.profile);

  return json({
    ...data,
  });
});
