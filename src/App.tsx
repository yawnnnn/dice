import React from 'react';
import Main from './components/main/main';
import './app.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="header"></div>
      <Main></Main>
    </div>
  );
}

export default App;
