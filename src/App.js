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
      <p>Hello {user?.username}!</p>
      <button onClick={onToggleButton}>toggle</button>
      <Form />
    </div>
  );
}

export default App;
