export type Topic = {
  name: string;
  subTopic?: string;
  description?: string;
};

export interface Language {
  id: number;
  name: string;

  topics: Topic[];
}

const languages: Language[] = [
  {
    id: 1,
    name: "English",
    topics: [
      {
        name: "Grammar",
        subTopic: "Grammar Questions",
        description:
          "Grammar is the set of structural rules governing the composition of clauses, phrases, and words in any given natural language.",
      },
      {
        name: "Talking",
        subTopic: "Talking exercise",
        description:
          "Talking is the action of conveying information or expressing one's thoughts and feelings in spoken language.",
      },
    ],
  },
  {
    id: 2,
    name: "German",
    topics: [
      {
        name: "Grammatik",
        subTopic: "Grammatik Übung",
        description:
          "Die Grammatik ist die Lehre von den Regeln, nach denen die Wörter einer Sprache zu Sätzen verbunden werden.",
      },
      {
        name: "Wortschatz",
        subTopic: "Wortschatz Übung",
        description:
          "Wortschatz bezieht sich auf die Gesamtheit der Wörter einer Sprache.",
      },
      {
        name: "Sprechen",
        subTopic: "Sprechen Übung",
        description:
          "Sprechen ist die Fähigkeit, Gedanken und Ideen verbal auszudrücken.",
      },
      {
        name: "Hören",
        subTopic: "Hörverständnis Übung",
        description:
          "Hören ist die Fähigkeit, gesprochene Sprache zu verstehen.",
      },
      {
        name: "Schreiben",
        subTopic: "Schreiben Übung",
        description:
          "Schreiben ist die Fähigkeit, Gedanken schriftlich auszudrücken.",
      },
      {
        name: "Lesen",
        subTopic: "Leseverständnis Übung",
        description:
          "Lesen ist die Fähigkeit, geschriebene Texte zu verstehen.",
      },
    ],
  },
  {
    id: 3,
    name: "Russian",
    topics: [
      {
        name: "Грамматика",
        subTopic: "Упражнение по грамматике",
        description:
          "Грамматика - это совокупность правил, определяющих структуру языка.",
      },
      {
        name: "Словарный запас",
        subTopic: "Упражнение по словарному запасу",
        description:
          "Словарный запас - это совокупность слов, используемых в языке.",
      },
      {
        name: "Разговорная речь",
        subTopic: "Упражнение по разговорной речи",
        description: "Разговорная речь - это способность выражать мысли устно.",
      },
      {
        name: "Аудирование",
        subTopic: "Упражнение по аудированию",
        description: "Аудирование - это способность понимать устную речь.",
      },
      {
        name: "Письмо",
        subTopic: "Упражнение по письму",
        description:
          "Письмо - это способность выражать мысли в письменной форме.",
      },
      {
        name: "Чтение",
        subTopic: "Упражнение по чтению",
        description: "Чтение - это способность понимать написанные тексты.",
      },
    ],
  },
];

export default languages;
