import './App.css';
import TimeRangeForm from "./components/TimeRangeForm";
import styled from "styled-components";

const AppContainer = styled.div`
    background-color: #014b91;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function App() {
  return (
      <AppContainer>
          <div className="App">
              <h1>Введите временной диапазон</h1>
              <TimeRangeForm />
          </div>
      </AppContainer>
  );
}

export default App;
