import { useState } from 'react';
import './styles/App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 SlideBot</h1>
        <p>AI-Powered Presentations</p>
        <div className="card">
          <button onClick={() => setCount(count => count + 1)}>
            count is {count}
          </button>
          <p>
            Welcome to SlideBot! Your AI-powered presentation assistant.
          </p>
        </div>
        <p className="read-the-docs">
          Click on the button above to test the React setup
        </p>
      </header>
    </div>
  );
}

export default App;
