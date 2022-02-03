import 'styles/index.css'

// Will be called once for every metric that has to be reported.
export function reportWebVitals(metric) {
  // These metrics can be sent to any analytics service
  console.log(metric)
}

const App = ({ Component, pageProps }) => (
  <main>
    <Component {...pageProps} />
  </main>
)
export default App
