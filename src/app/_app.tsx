import { useEffect } from 'react';
import { initGA, logPageView } from '../components/analytics';

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    initGA(); 
    logPageView(); 

  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;