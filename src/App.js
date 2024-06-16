import { useEffect } from 'react';
import './App.css';
import useTelegram from './hooks/useTelegram';
const tg = window.Telegram.WebApp

function App() {
  const {onToggleButton, tg, user} = useTelegram()

  useEffect(() => {
    tg.ready()
  },[])
  return (
    <div className="App">
      <p>Hello {user}!</p>
      <button onClick={onToggleButton}></button>
    </div>
  );
}

export default App;
