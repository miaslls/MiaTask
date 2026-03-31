import Head from 'next/head';
import type { NextPage } from 'next';

import HomeView from '@root/src/ui/pages/index';
import { mockTasks } from '@root/src/ui/mocks/tasks';

const UiPreviewDefaultPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>UI Preview Default | MiaTask</title>
        <meta name="robots" content="noindex" />
      </Head>

      <HomeView state="default" initialTasks={mockTasks} />
    </>
  );
};

export default UiPreviewDefaultPage;
