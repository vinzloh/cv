import { useState } from "react";
import Head from "next/head";
import Resume from "components/Resume";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className='container root-container'>
      <Head>
        <title>vinzloh</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main
        className={`${
          isLoading ? "h-full" : ""
        } flex justify-center items-center`}
      >
        <Resume onLoad={() => setIsLoading(false)} />
      </main>

      <footer className='footer fixed left-0 bottom-0 right-0 flex justify-center mt-10 mb-5 text-red-400'>
        <a
          href='//www.linkedin.com/in/vinzloh/'
          target='_blank'
          rel='noopener noreferrer'
        >
          ♥ vinzloh
        </a>
      </footer>
      <style jsx>
        {`
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            margin: 1rem;
          }
        `}
      </style>
    </div>
  );
}
