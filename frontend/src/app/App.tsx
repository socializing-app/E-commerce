import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import { simpleModal } from "../services/modal.service";

function App() {
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = () => {
    console.log("submitted.")
    setModalShow(false);
  }

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
      
      { simpleModal(modalShow, "title", "text", () => setModalShow(false), () => handleSubmit()) }
     
    </div>
  );
}

export default App;