# Quizme

A quiz app built with React and Typescript. Data is fetched from https://opentdb.com

> This app fetches quiz questions with `amount` and `difficulty` parameters specified, stores the questions in an array which is set to state, and then for each question, displays possible answers for a user to choose from. When a user clicks a possible answer the app will show if you are correct or incorrect and updates the score as needed.


Fetching data with the `fetchQuizQuestions` function found in [FetchAPI.ts](https://github.com/dislersd/quizme/blob/master/src/API.ts)

```javascript
const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  
  // await the fetch itself and then await the conversion to json
  const data = await (await fetch(endpoint)).json();
  // map through the fetched data and for each question, spread the question obj into the new array, as well as an answers property
  return data.results.map((question: Question) => ({
    ...question,
    // using helper function to shuffle the correct answer and incorrect answers which are all spread into an array
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }));
};
```

After fetching data it gets set to app state

```javascript

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionSate[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

// this function runs when a user clicks the start button
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    try {
      // fetch questions from api
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      // set questions to state
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

}
```

Custom Types

```javascript
// In App.tsx

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

// In FetchAPI.tsx

type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type QuestionSate = Question & { answers: string[] };

// In QuestionCard.tsx

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // can be answerObj or undefined so using a pipe -> |
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
}

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

```
