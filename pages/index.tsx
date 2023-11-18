import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/material";

import Layout from "../src/layout/Layout";
import HomeContainer from "../src/containers/Home/HomeContainer";

const Home: NextPage = () => {
  return (
    <Box sx={{ padding: "0 2rem" }}>
      <Head>
        <title>Rather Quiz Challenge</title>
        <meta name="description" content="Rather Labs blockchain challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeContainer />
      </Layout>
    </Box>
  );
};

export default Home;
