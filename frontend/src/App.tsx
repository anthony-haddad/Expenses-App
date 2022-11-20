import React from 'react';
import Table from './components/Table/Table';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Header />
      <Table />
      <Modal />
      <ToastContainer />
    </div>
  );
}

export default App;
