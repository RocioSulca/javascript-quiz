 import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { JavascriptLogo } from "./assets/JavascriptLogo";
import Start from "./Start";
import { useQuestionsStore } from "./store/Questions";
import Game from "./Game";


function App() {
  const questions = useQuestionsStore(state =>state.question)
  console.log(questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavascriptLogo />
          <Typography variant="h2" component="h1" sx={{fontSize: { xs:30, sm:50}}}>
            Javascript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start/>}
        {questions.length > 0 && <Game/>}
      </Container>
    </main>
  );
}

export default App;
