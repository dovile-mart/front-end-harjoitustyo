import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RuokaApp from './RuokaApp';
import reportWebVitals from './reportWebVitals';
//import Navbar from './components/Narbar';
//import Resepti from './components/Resepti';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RuokaApp />
   {/** <Navbar />
    <Resepti/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
