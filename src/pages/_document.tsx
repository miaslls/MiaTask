import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Effortless Task Management. Stay Organized and Boost Productivity with this Simple Task List Web App."
        />
        <meta
          name="keywords"
          content="Task List, Task Management, Add Tasks, Update Tasks, Delete Tasks, Complete Tasks, Stay Organized, Boost Productivity, Task Tracker, To-Do List, Task Organizer, Web App"
        />
        <meta name="author" content="miaslls" />

        <link rel="shortcut icon" href="img/logo.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
