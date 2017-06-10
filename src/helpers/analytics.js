import ReactGA from 'react-ga';

ReactGA.initialize('UA-79177317-2');

export default function trackPageView() {
    ReactGA.pageview(window.location.pathname);
}
