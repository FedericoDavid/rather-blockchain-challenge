import { useEffect, useState } from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";

import Button from "../../components/Button";
import { Survey } from "../../types/survey";
import SurveyModal from "../../modals/SurveyModal";
import { useWeb3 } from "../../providers/web3";

interface HomeContainerProps {
  survey: Survey;
}

const styles = {
  wrapper: {
    height: "76vh",
    width: "70%",
    backgroundImage: "url(/images/banner.png)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "@media (max-width: 600px)": {
      flexDirection: "column-reverse",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "100%",
      width: "100%",
      backgroundSize: "contain",
    },
  },
  cardWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    color: "#fff",
    marginY: "28px",
  },
};

const HomeContainer: React.FC<HomeContainerProps> = ({ survey }) => {
  const [showSurveyModal, setshowSurveyModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { isConnected, isGoerli, connectWallet } = useWeb3();

  const onStartSurvey = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    if (!isGoerli) {
      setDisabled(true);
      return;
    }

    setshowSurveyModal(true);
  };

  useEffect(() => {
    if (isGoerli) setDisabled(false);
  }, [isGoerli]);

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
                {"\u2022 Choose the correct options"}
              </Typography>
              <Typography variant="subtitle1">
                {" \u2022 Send your answers"}
              </Typography>
              <Typography variant="subtitle1">
                {"\u2022 Earn $QUIZ 🤑"}
              </Typography>
            </CardContent>
          </Card>
          <Typography variant="h6" color="white" marginBottom="18px">
            Click on today&apos;s survey to begin!
          </Typography>
          <Button
            label="Start now!"
            onClick={onStartSurvey}
            disabled={disabled}
          />
        </Box>
      </Container>
      <SurveyModal
        survey={survey}
        isOpen={showSurveyModal}
        onClose={() => setshowSurveyModal(false)}
      />
    </>
  );
};

export default HomeContainer;
