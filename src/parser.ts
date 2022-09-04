type TransacriptAlternative = {
  confidence?: number;
  transcript?: string;
};

type TranscriptResult = {
  alternatives: Array<TransacriptAlternative>;
  languageCode: string;
  resultEndTime: string;
};

type TranscriptShape = {
  results: TranscriptResult[];
};

export const getTranscript = (data: TranscriptShape) => {
  const fragments = (data as TranscriptShape).results.map((c) => {
    if (!c.alternatives) {
      return;
    }

    return c.alternatives.map((a) => a.transcript)[0];
  });

  let transcript = ``;

  fragments.forEach((fragment) => {
    if (!fragment) {
      return;
    }

    transcript = transcript + "\n\n" + fragment.trim();
  });

  return transcript;
};
