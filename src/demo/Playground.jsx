import React, { useRef } from 'react';
import Xarrow from 'react-xarrows';
import { Box } from '../components/Box';

const canvasStyle = {
  position: 'relative',
  height: '20vh',
  background: 'white',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const Playground = ({ ...args }) => {
  console.log('SimpleExample update');
  const box1 = { id: 'box1', ref: useRef(null), left: 100 };
  const box2 = { id: 'box2', ref: useRef(null), left: 400 };

  return (
    <React.Fragment>
      <h3>
        <u>Simple Example:</u>
      </h3>
      <div style={canvasStyle} id="canvas">
        <Box box={box1}>{box1.id}</Box>
        <Box box={box2}>{box2.id}</Box>
        <Xarrow start={box1.id} end={box2.ref} {...args} />
      </div>
    </React.Fragment>
  );
};

export default Playground;
