import { useEffect } from 'react';
import './App.css';
import Form from './Form/Form';
import useTelegram from './hooks/useTelegram';

const tg = window.Telegram.WebApp

function App() {
  const {onToggleButton, tg, user} = useTelegram()

  useEffect(() => {
    tg.ready()
  },[])
  return (
    <div className="App">
      <h2>Hello !</h2>
      <h3>Send your photo and question here</h3>
      
      <Form />
    </div>
  );
}

export default App;
