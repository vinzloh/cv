import 'styles/index.css'

// Will be called once for every metric that has to be reported.
export function reportWebVitals(metric) {
  // These metrics can be sent to any analytics service
  console.log(metric)
}

const App = ({ Component, pageProps }) => (
  <div className="container h-full mx-auto flex">
    <main className="flex flex-col m-auto justify-center items-center">
      <Component {...pageProps} />
    </main>
  </div>
)
export default App
