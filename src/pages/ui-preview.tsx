import Head from 'next/head';
import type { NextPage } from 'next';

import HomeView from '@root/src/ui/pages/index';
import Custom404View from '@root/src/ui/pages/404';
import Custom500View from '@root/src/ui/pages/500';
import { mockTasks } from '@root/src/ui/mocks/tasks';

const sectionStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--gray-02)',
  padding: '1rem',
  marginBottom: '1rem',
  background: 'var(--bg-color-translucent)',
};

const titleStyle: React.CSSProperties = {
  marginBottom: '0.75rem',
  fontWeight: 500,
};

const UiPreviewPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>UI Preview | MiaTask</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div>
        <h2 style={{ marginBottom: '1rem' }}>Extracted UI Preview</h2>

        <section style={sectionStyle}>
          <div style={titleStyle}>Home: default</div>
          <HomeView state="default" initialTasks={mockTasks} />
        </section>

        <section style={sectionStyle}>
          <div style={titleStyle}>Home: loading</div>
          <HomeView state="loading" initialTasks={mockTasks} />
        </section>

        <section style={sectionStyle}>
          <div style={titleStyle}>Home: empty</div>
          <HomeView state="empty" initialTasks={[]} />
        </section>

        <section style={sectionStyle}>
          <div style={titleStyle}>Home: error</div>
          <HomeView state="error" initialTasks={mockTasks} />
        </section>

        <section style={sectionStyle}>
          <div style={titleStyle}>Error Page: 404</div>
          <Custom404View />
        </section>

        <section style={sectionStyle}>
          <div style={titleStyle}>Error Page: 500</div>
          <Custom500View />
        </section>
      </div>
    </>
  );
};

export default UiPreviewPage;
