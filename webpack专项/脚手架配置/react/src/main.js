import React from 'react';
import ReactDom from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import APP from './App';
import "antd/dist/antd.css"
const root = ReactDom.createRoot(document.getElementById('app'));
root.render(
<BrowserRouter>
  <APP />
</BrowserRouter>
)