import 'styles/index.css'

export default ({ Component, pageProps }) => (
  <div className="container h-full mx-auto flex">
    <main className="flex flex-col m-auto justify-center items-center">
      <Component {...pageProps} />
    </main>
  </div>
)
