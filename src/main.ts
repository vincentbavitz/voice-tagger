import { createRequire } from "https://deno.land/std/node/module.ts";
import { getTranscript } from "./parser.ts";

const require = createRequire(import.meta.url);
const speech = require("./node_modules/@google-cloud/speech");

speech;

async function main() {
  try {
    // Get all JSON transcripts from GCP output.
    for (const dirEntry of Deno.readDirSync("transcripts")) {
      if (!dirEntry.name.endsWith(".json")) {
        return;
      }

      const file = await Deno.readTextFile(`transcripts/${dirEntry.name}`);
      const data = JSON.parse(file);

      const transcript = getTranscript(data);
      const outputFileName = dirEntry.name.replace(".json", ".md");
      const output = `./output/${outputFileName}`;

      console.info("Writing to file: ", output);
      await Deno.writeTextFile(output, transcript);
    }
  } catch (error) {
    console.warn("Error: ", error);
  }
}

await main();
