import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/Questions";

const LIMIT_QUESTIONS = 10;

function Start() {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{ marginTop: "30px"}}
      >
        Empezar
      </Button>
    </>
  );
}

export default Start;
