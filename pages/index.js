import Home from "../components/Home/Home";
import Head from "next/head";
import logger from "../logger/logger";
import { useRouter } from "next/router";
import { useEffect } from "react";

// https://nextjs.org/docs/messages/no-document-title
export default function LandingPage() {
  logger.info("Client side logging");

  const Router = useRouter();

  useEffect(() => {
    if (Router.query?.reportId != null) {
      Router.push(
        "/experiments/" +
          Router.query["experiment-id"] +
          "?reportId=" +
          Router.query?.reportId
      );
    }

    if (
      localStorage.getItem("Onboarding") === "true" &&
      Router.query?.reportId == null
    ) {
      Router.push("/experiments/1");
    }
  }, []);

  return (
    <>
      <Head>
        {/* next/head works like page meta when included in different page routes */}
        <title>Prompt Evaluator</title>
      </Head>
      <Home />
    </>
  );
}
