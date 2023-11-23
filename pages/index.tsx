import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/material";

import Layout from "../src/layout/Layout";
import HomeContainer from "../src/containers/Home/HomeContainer";
import { Survey } from "../src/types/survey";
import surveyData from "../src/constants/survey.json";

interface HomeProps {
  dailySurvey: Survey;
}

const Home: NextPage<HomeProps> = ({ dailySurvey }) => {
  return (
    <Box sx={{ padding: "0 2rem" }}>
      <Head>
        <title>Rather Quiz Challenge</title>
        <meta name="description" content="Rather Labs blockchain challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeContainer survey={dailySurvey} />
      </Layout>
    </Box>
  );
};

export async function getServerSideProps() {
  const dailySurvey = surveyData;

  return {
    props: { dailySurvey },
  };
}

export default Home;
