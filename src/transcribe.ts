import { createRequire } from "https://deno.land/std/node/module.ts";

const require = createRequire(import.meta.url);

const speech = require("./node_modules/@google-cloud/speech");
const fs = require("fs");

speech;
fs;

// export async function asyncRecognize(
//   filename: string,
//   encoding = "MP3",
//   sampleRateHertz = 48000,
//   languageCode = "en-US"
// ) {
//   const client = new speech.SpeechClient();

//   const config = {
//     encoding,
//     sampleRateHertz,
//     languageCode,
//   };

//   /**
//    * Note that transcription is limited to 60 seconds audio.
//    * Use a GCS file for audio longer than 1 minute.
//    */
//   const audio = {
//     content: fs.readFileSync(filename).toString("base64"),
//   };

//   const request = {
//     config: config,
//     audio: audio,
//   };

//   // Detects speech in the audio file. This creates a recognition job that you
//   // can wait for now, or get its result later.
//   const [operation] = await client.longRunningRecognize(request);

//   // Get a Promise representation of the final result of the job
//   const [response] = await operation.promise();

//   const transcription = response.results
//     .map((result) => result.alternatives[0].transcript)
//     .join("\n");
//   console.log(`Transcription: ${transcription}`);
//   // [END speech_transcribe_async]
// }
