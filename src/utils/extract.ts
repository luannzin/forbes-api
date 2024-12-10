import axios from "axios";
import { parseNetWorth } from "./parse";
const cheerio = require("cheerio");

export async function extractForbesData(profile: string) {
  try {
    const response = await axios.get(
      "https://www.forbes.com/profile/" + profile
    );
    const html = response.data;

    const $ = cheerio.load(html);

    const name = $("h1.listuser-header__name").text().trim();

    const photo = $("div.listuser-image-container")
      .children()
      .first()
      .attr("src");

    const occupation = $("div.listuser-header__headline-default").text().trim();

    const netWorth = $("div.profile-info__item-value").text().trim();
    const p = parseNetWorth(netWorth);

    return {
      name,
      photo,
      occupation,
      netWorth: {
        original: netWorth,
        ...p,
      },
    };
  } catch (e) {
    const error = e as Error;
    console.error("Error fetching data:", error.message);
    return { error: error.message };
  }
}
