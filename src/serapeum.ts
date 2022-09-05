import videoMap from "../videos.json" assert { type: "json" };
import { getTranscript } from "./parser.ts";

const BASE_TITLE = "Hidden His-Story of Man & Deep State";

async function main() {
  try {
    // Get the transcript, and map it to a video from videos.json
    for (const dirEntry of Deno.readDirSync("transcripts")) {
      if (!dirEntry.name.endsWith(".json")) {
        return;
      }

      const file = await Deno.readTextFile(`transcripts/${dirEntry.name}`);

      /**
       * File name should follow format: a<act>p<part>.mp3.
       * For example, a10p1.json means act 10, part 1.
       * For acts with only one part, we give them a part 0.
       */
      const act = Number(dirEntry.name.split("p")[0].replace("a", ""));
      const part = Number(dirEntry.name.split("p")[1].split(".")[0]);

      // Contains information useful for building filenames ant titles in Markdown
      const videoMeta = videoMap.find((v) => v.act === act && v.part === part);

      if (!videoMeta) {
        console.warn(`Could not find video of Act ${act} - Part ${part}`);
        return;
      }

      const data = JSON.parse(file);
      const transcript = getTranscript(data);

      let markdown = ``;

      // Add title line to Markdown
      markdown = markdown + `# ${BASE_TITLE}\n`;
      markdown = markdown + `## Act ${act} - ${videoMeta.subtitle}\n`;
      if (videoMeta.part > 0) markdown = markdown + `**Part ${part}**\n`;
      markdown = markdown + `\n---\n`;
      markdown = markdown + transcript;

      const outputFileName = `HHOM - Act ${act} - ${videoMeta.subtitle}${
        videoMeta.part > 0 ? ` - Part ${videoMeta.part}` : ""
      } [TRANSCRIPT].md`;

      const output = `./output/${outputFileName}`;

      console.info("Writing to file: ", output);
      await Deno.writeTextFile(output, markdown);
    }
  } catch (error) {
    console.warn("Error: ", error);
  }
}

await main();
