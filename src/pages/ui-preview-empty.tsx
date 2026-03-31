import Head from 'next/head';
import type { NextPage } from 'next';

import HomeView from '@root/src/ui/pages/index';

const UiPreviewEmptyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>UI Preview Empty | MiaTask</title>
        <meta name="robots" content="noindex" />
      </Head>

      <HomeView state="empty" initialTasks={[]} />
    </>
  );
};

export default UiPreviewEmptyPage;
