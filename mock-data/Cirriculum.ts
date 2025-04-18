interface Curriculum {
  id: number;
  name: string;
  imgUrl: string;
}

const CirriculumMockData: Curriculum[] = [
  {
    id: 1,
    name: "Türkiye",
    imgUrl: "https://www.worldometers.info//img/flags/small/tn_tu-flag.gif",
  },
  {
    id: 2,
    name: "Germany",
    imgUrl: "https://www.worldometers.info//img/flags/small/tn_gm-flag.gif",
  },
  {
    id: 3,
    name: "Russia",
    imgUrl: "https://www.worldometers.info//img/flags/small/tn_rs-flag.gif",
  },
  {
    id: 4,
    name: "Japan",
    imgUrl: "https://www.worldometers.info//img/flags/small/tn_ja-flag.gif",
  },
];

export default CirriculumMockData;
