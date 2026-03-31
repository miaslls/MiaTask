import Head from 'next/head';
import type { NextPage } from 'next';

import HomeView from '@root/src/ui/pages/index';
import { mockTasks } from '@root/src/ui/mocks/tasks';

const UiPreviewLoadingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>UI Preview Loading | MiaTask</title>
        <meta name="robots" content="noindex" />
      </Head>

      <HomeView state="loading" initialTasks={mockTasks} />
    </>
  );
};

export default UiPreviewLoadingPage;
