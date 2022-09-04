#obsidian #voice-transcription #google-cloud #deno

# Voice-Transcription

This tool is used to transcribe audio from a long-form videos using Google Cloud Platform speech-to-text.

Its intended use is for my voice-notes from my phone to be automatically transcribed, tagged, and placed into my [Obsidian](obsidian.md) vault.

Run with Deno or use the binary in `./build`.

## Audio Files

You can get audio files using `yt-dlp` or simply use existing local files.

## Instructions

1. Upload file to Google Cloud Platform bucket
2. Transcribe the audio file [here](https://console.cloud.google.com/speech/transcriptions)
3. Download the JSON of the transcription and place it in `./transcripts`.
4. Run one of the following (either):

   - `./build/voice-transcription`
   - `deno run --allow-read --allow-write --allow-env --output ./build/voice-transcription ./src/main.ts`

5. View the output markdown file at `./output`.

---

## Improvments

**Automation**

In its current form, this script still requires a lot of manual work.

**Bulk Target**

I would like to largely automate the process such that you can target a local directory of audio files and have them automatically run through a transcription model and parsed in-place.

**Open Source Alternatives**

I would also like to move away from GCP and instead use Mozilla DeepSpeech, for privacy reasons. However the accuracy of DeepSpeech from my testing was somewhat abysmal. When I learn how to train my own accurate DeepSpeech models I can make the transition away from GCP.

**Output in PDF**
The `package.json` contains a reference to `markdown-pdf`. This is not currently used but would be a nice feature to add.
