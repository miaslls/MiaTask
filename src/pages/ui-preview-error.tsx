import Head from 'next/head';
import type { NextPage } from 'next';

import HomeView from '@root/src/ui/pages/index';
import { mockTasks } from '@root/src/ui/mocks/tasks';

const UiPreviewErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>UI Preview Error | MiaTask</title>
        <meta name="robots" content="noindex" />
      </Head>

      <HomeView state="error" initialTasks={mockTasks} />
    </>
  );
};

export default UiPreviewErrorPage;
