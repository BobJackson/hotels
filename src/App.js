import './App.css';
import {Container} from "react-bootstrap";
import HotelList from "./HotelList";

function App() {
  return (
      <div className="App">
        <Container className="mt-1">
          <HotelList/>
        </Container>
      </div>
  );
}

export default App;
