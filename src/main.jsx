import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import Example from './components/Example.jsx';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Playground from './demo/Playground';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
			<DndProvider backend={HTML5Backend}>
					<Example />
			</DndProvider>
  </React.StrictMode>,
)
