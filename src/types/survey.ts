export type SurveyOption = {
  text: string;
};

export type SurveyQuestion = {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: SurveyOption[];
};

export type Survey = {
  title: string;
  image: string;
  id: number;
  questions: SurveyQuestion[];
};

export type SurveyAnswers = {
  [key: string]: string;
};
