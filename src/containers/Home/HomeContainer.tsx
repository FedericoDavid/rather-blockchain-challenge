import { Container, Box, Typography, Card, CardContent } from "@mui/material";

import Button from "../../components/Button";
import { Survey } from "../../types/survey";
import SurveyModal from "../../modals/SurveyModal";
import { useState } from "react";
import { useWeb3 } from "../../providers/web3";

interface HomeContainerProps {
  survey: Survey;
}

const styles = {
  wrapper: {
    height: "88vh",
    width: "70%",
    backgroundImage: "url(/images/banner.png)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    color: "#fff",
    marginY: "28px",
  },
};

const HomeContainer: React.FC<HomeContainerProps> = ({ survey }) => {
  const [showSurveyModal, setshowSurveyModal] = useState<boolean>(false);

  const { submit } = useWeb3();

  const onSendSurvey = async (surveyId: number, answersIds: number[]) => {
    await submit(surveyId, answersIds);
  };

  return (
    <>
      <Container maxWidth="xl" sx={styles.wrapper}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" color="white" gutterBottom>
            Daily surveys
          </Typography>
          <Typography variant="h6" color="white" gutterBottom>
            Answer, submit & earn $QUIZ
          </Typography>
          <Card sx={styles.cardWrapper}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                How to use:
              </Typography>
              <Typography variant="subtitle1">
                Choose the correct options
              </Typography>
              <Typography variant="subtitle1">Send your answers</Typography>
              <Typography variant="subtitle1">Earn $QUIZ 🤑</Typography>
            </CardContent>
          </Card>
          <Typography variant="h6" color="white" marginBottom="18px">
            Click on today&apos;s survey to begin!
          </Typography>
          <Button label="Start now!" onClick={() => setshowSurveyModal(true)} />
        </Box>
      </Container>
      <SurveyModal
        survey={survey}
        isOpen={showSurveyModal}
        sendSurvey={onSendSurvey}
        onClose={() => setshowSurveyModal(false)}
      />
    </>
  );
};

export default HomeContainer;
