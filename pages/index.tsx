import { useEffect } from "react";
import Head from "next/head";
import Button, { ButtonType } from "components/Button";

export default function Home() {
  useEffect(() => {}, []);
  return (
    <div className='container'>
      <Head>
        <title>vinzloh</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Button type={ButtonType.Primary}>
          <p>Test</p>
        </Button>
      </main>

      <footer className='flex justify-center'>
        <a
          href='//github.com/vinzloh'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by vinzloh
        </a>
      </footer>
    </div>
  );
}
