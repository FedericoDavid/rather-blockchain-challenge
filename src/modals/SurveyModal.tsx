import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Image from "next/image";
import { Survey, SurveyAnswers, SurveyQuestion } from "../types/survey";
import Modal from "../components/Modal";
import Button from "../components/Button";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: Survey;
  sendSurvey: (surveyId: number, answersIds: number[]) => Promise<void>;
}

const SurveyModal: React.FC<SurveyModalProps> = ({
  isOpen,
  survey,
  onClose,
  sendSurvey,
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

  const handleSendSurvey = () => {
    const surveyId = survey.id;
    const answersIds = Object.values(answers).map((answer) =>
      parseInt(answer, 10)
    );

    sendSurvey(surveyId, answersIds);
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
      <Typography variant="h5" mb="12px">
        Your answers:
      </Typography>
      {survey.questions.map((q, index) => (
        <Typography key={index} mb="12px">
          {q.text}: {answers[`question${index}`]}
        </Typography>
      ))}
      <Button
        onClick={handleSendSurvey}
        label="Send survey!"
        style={{ marginBottom: "8px", width: "100%" }}
      />
      <Button
        variant="outlined"
        onClick={handleOnClose}
        label="Close"
        style={{ width: "100%" }}
      />
    </Box>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!showFinalStep ? (
          <>
            <Typography variant="h5">
              {question.text} - Time Left: {timeLeft}s
            </Typography>
            {question.image && (
              <Image
                src={question.image}
                alt="Question image"
                width={180}
                height={140}
                style={{ margin: "24px 0" }}
              />
            )}
            <form onSubmit={handleSubmit(handleQuestionResponse)}>
              <Controller
                name={`question${currentQuestionIndex}`}
                control={control}
                defaultValue=""
                render={({ field }: { field: any }) => (
                  <RadioGroup
                    {...field}
                    sx={{
                      flexDirection: "row",
                      marginBottom: "16px",
                    }}
                  >
                    {question.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option.text}
                        control={<Radio sx={{ marginRight: "6px" }} />}
                        label={option.text}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
              <Button
                type="submit"
                variant="contained"
                label="Next"
                style={{ width: "100%" }}
              />
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
