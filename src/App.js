import './App.css';
import React, { useState } from 'react'
import Navigation from './components/Navigation';
import Content from './components/Content';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [currentContent, setCurrentContent] = useState(null)

  return (
    <section>
      <Navigation setCurrentContent={setCurrentContent} ></Navigation>
      <Content content={currentContent || 'carts'} ></Content>
    </section>
  );
}

export default App;
