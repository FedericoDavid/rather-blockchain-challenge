import { Container, Box, Typography, Card, CardContent } from "@mui/material";
import Button from "../../components/Button";

export default function HomeContainer() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "88vh",
        width: "70%",
        backgroundImage: "url(/images/banner.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" color="white" gutterBottom>
          Daily surveys
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          Answer, submit & earn $QUIZ
        </Typography>
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            color: "#fff",
            marginY: "28px",
          }}
        >
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
        <Button label="Start now!" onClick={() => {}} />
      </Box>
    </Container>
  );
}
