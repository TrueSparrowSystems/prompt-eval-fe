import Home from '../components/Home/Home';
import Head from 'next/head';
import logger from '../logger/logger';
import Router from 'next/router';
import { useEffect } from 'react';

// https://nextjs.org/docs/messages/no-document-title
export default function LandingPage() {
  logger.info('Client side logging');

  useEffect(() => {
    if(localStorage.getItem("onBoardingKey") === "true")
    Router.push('/experiments/1');
    else
    localStorage.setItem("onBoardingKey", "false");
    
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
