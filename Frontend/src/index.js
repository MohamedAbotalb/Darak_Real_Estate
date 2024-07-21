import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'App';
import reduxStore from 'store/index';
import Loader from 'components/Loader';
import 'index.css';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<Loader />}>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </Suspense>
);
