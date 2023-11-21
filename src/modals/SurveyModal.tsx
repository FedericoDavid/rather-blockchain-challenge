import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import Image from "next/image";
import { Survey, SurveyAnswers, SurveyQuestion } from "../types/survey";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: Survey;
}

const style = {
  wrapper: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 8,
    border: "1px solid #000",
    backgroundColor: "#27262C",
    boxShadow: 24,
    padding: "32px",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    my: "12px",
  },
  buttonStyle: {
    marginTop: "16px",
    width: "100%",
    fontWeight: 700,
    textTransform: "capitalize",
  },
};

const SurveyModal: React.FC<SurveyModalProps> = ({
  isOpen,
  onClose,
  survey,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showFinalStep, setShowFinalStep] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm();

  const question: SurveyQuestion = survey.questions[currentQuestionIndex];

  const resetSurvey = () => {
    reset();
    setShowFinalStep(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(survey.questions[0]?.lifetimeSeconds || 0);
  };

  const handleOnClose = () => {
    resetSurvey();
    onClose();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(
        survey.questions[currentQuestionIndex + 1]?.lifetimeSeconds || 0
      );

      reset();
    } else {
      setShowFinalStep(true);
    }
  };

  const handleQuestionResponse = (data: any = {}) => {
    const label =
      isOpen && timeLeft === 0 ? "Unanswered in time" : "Unanswered";
    const questionKey = `question${currentQuestionIndex}`;
    const response = data[questionKey] || label;

    setAnswers((prev) => ({
      ...prev,
      [questionKey]: response,
    }));

    goToNextQuestion();
  };

  useEffect(() => {
    if (isOpen) {
      resetSurvey();
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showFinalStep) {
      handleQuestionResponse();
    }

    return () => clearInterval(timer);
  }, [timeLeft, isOpen, showFinalStep]);

  const FinalSteps = () => (
    <Box>
      <Typography variant="h6">Your answers:</Typography>
      {survey.questions.map((q, index) => (
        <Typography key={index}>
          {q.text}: {answers[`question${index}`]}
        </Typography>
      ))}
      <Button onClick={handleOnClose}>Close</Button>
    </Box>
  );

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box p={2} sx={style.wrapper}>
        {!showFinalStep ? (
          <>
            <Typography variant="h6">
              {question.text} - Time Left: {timeLeft}s
            </Typography>
            {question.image && (
              <Image
                src={question.image}
                alt="Question image"
                width={260}
                height={140}
              />
            )}
            <form onSubmit={handleSubmit(handleQuestionResponse)}>
              <Controller
                name={`question${currentQuestionIndex}`}
                control={control}
                defaultValue=""
                render={({ field }: { field: any }) => (
                  <RadioGroup {...field}>
                    {question.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option.text}
                        control={<Radio />}
                        label={option.text}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </form>
          </>
        ) : (
          <FinalSteps />
        )}
      </Box>
    </Modal>
  );
};

export default SurveyModal;
