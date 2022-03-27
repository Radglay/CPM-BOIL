import logo from './logo.svg';
import './App.css';
import Form from './component/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>
          Czas trwania czynności [godzina]:<input/>
        </p>
        <p> 
          Czynności poprzedzające:<input/>
        </p> */}
        <Form />
      </header>
    </div>
  );
}

export default App;
