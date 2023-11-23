/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Alert,
} from "@mui/material";
import Image from "next/image";

import { Survey, SurveyAnswers, SurveyQuestion } from "../types/survey";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { useWeb3 } from "../providers/web3";

type ModalSteps = "form" | "final" | "congrats" | "error";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: Survey;
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  groupWrapper: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "start",
    marginBottom: "16px",
  },
};

const SurveyModal: React.FC<SurveyModalProps> = ({
  isOpen,
  survey,
  onClose,
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [modalStep, setModalStep] = useState<ModalSteps>("form");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const { isLoading, submit } = useWeb3();
  const { control, handleSubmit, reset } = useForm();

  const question: SurveyQuestion = survey.questions[currentQuestionIndex];

  const resetSurvey = () => {
    reset();
    setModalStep("form");
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(survey.questions[0]?.lifetimeSeconds || 0);
    setIsError(false);
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
      setModalStep("final");
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

  const handleSendSurvey = async () => {
    const surveyId = survey.id;
    const answersIds = Object.values(answers).map((answer) =>
      parseInt(answer, 10)
    );

    try {
      const success = await submit(surveyId, answersIds);

      console.log(success);

      if (success) {
        setModalStep("congrats");
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) resetSurvey();
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && modalStep !== "final") {
      handleQuestionResponse();
    }

    return () => clearInterval(timer);
  }, [timeLeft, isOpen, modalStep]);

  const FinalStep: React.FC = () => (
    <Box>
      <Typography variant="h5" mb="12px">
        Your answers:
      </Typography>
      {survey.questions.map((q, index) => (
        <Typography key={index} mb="12px">
          {q.text}: {answers[`question${index}`]}
        </Typography>
      ))}

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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
        </>
      )}

      {isError && (
        <Alert severity="error" sx={{ marginTop: "12px" }}>
          Something went wrong. Please try again later.
        </Alert>
      )}
    </Box>
  );

  const CongratsStep: React.FC = () => (
    <Box>
      <Typography variant="h4" mb="24px">
        Thank you for participating! 🎉
      </Typography>
      <Typography variant="h5" mb="32px">
        You will see the $Quiz earned in a few sec
      </Typography>
      <Button
        variant="outlined"
        onClick={handleOnClose}
        label="Finish survey"
        style={{ width: "100%" }}
      />
    </Box>
  );

  const FormStep: React.FC = () => (
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
            <RadioGroup {...field} sx={styles.groupWrapper}>
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
  );

  const renderContent = () => {
    switch (modalStep) {
      case "final":
        return <FinalStep />;
      case "congrats":
        return <CongratsStep />;
      default:
        return <FormStep />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <Box sx={styles.wrapper}>{renderContent()}</Box>
    </Modal>
  );
};

export default SurveyModal;
