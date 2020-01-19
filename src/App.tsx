import React from 'react';
import Main from './components/main/main';
import Header from './components/main/header';
import './app.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
