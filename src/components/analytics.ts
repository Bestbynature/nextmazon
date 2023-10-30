import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-L6ML7T5TCM');
};


export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};