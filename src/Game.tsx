import {
  IconButton,
  Stack,
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useQuestionsStore } from "./store/Questions";
import { type Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import confetti from "canvas-confetti";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Footer from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  //usuario no ha selecionado nada
  if (userSelectedAnswer == null) return "transparent";
  //si ya seleccionó, incorrecto
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  // si es correcto
  if (index === correctAnswer) return "green";
  // si es incorrecto
  if (index === userSelectedAnswer) return "red";
  // si no es ninguna de las anteriores
  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  const correctAnswer = info.isCorrectUserAnswer;
  if (correctAnswer) confetti();

  return (
    <Card
      variant="outlined"
      sx={{ textAlign: "left", p: 2, bgcolor: "#222", marginTop: 4, width: {xs:280, sm:500}}}
    >
      <Typography variant="h5" sx={{fontSize: {xs:18}}}>{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark} sx={{fontSize: {xs:18}}}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ bgcolor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

function Game() {
  const question = useQuestionsStore((state) => state.question);
  const currenteQuestion = useQuestionsStore((state) => state.currenteQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion);

  const questionInfo = question[currenteQuestion];

  console.log(question);

  return (
    <>
      <Stack direction={"row"} gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currenteQuestion === 0}>
            <ArrowBackIosNew/>
        </IconButton>
        {currenteQuestion + 1} / {question.length}
        <IconButton onClick={goNextQuestion} disabled={currenteQuestion === question.length - 1}>
            <ArrowForwardIos/>
        </IconButton>
      </Stack>
      <Stack  justifyContent="center" alignItems='center'>
      <Question info={questionInfo} />
      </Stack>
      <Footer/>
    </>
  );
}

export default Game;
