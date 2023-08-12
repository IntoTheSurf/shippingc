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

const props = {
  // this is the important part of the example! play with the props to understand better the API options
  curveness: Number(0),
  color: "blue",
  lineColor:"red",
  strokeWidth: Number(4),
  showHead: false,
  labels: {
    middle: (
      <div
        style={{
          fontSize: '1.3em',
          fontStyle: 'bold',
          textShadow: '2px 0px 0px white',
        }}>
        middle
      </div>
    ),
  },
};

const Playground = ({ ...args }) => {
  console.log('SimpleExample update');
  const box1 = { id: 'box1'};
  const box2 = { id: 'box2'};
  const box3 = { id: 'box3'};

  return (
    <React.Fragment>
      <h3>
        <u>Simple Example:</u>
      </h3>
      <div style={canvasStyle} id="canvas">
        <Box id={box1.id} ref={box1.ref} top={400} left={200}> {box1.id}</Box>
        <Box id={box2.id} ref={box2.ref} left={600}>{box2.id}</Box>
        <Box id={box3.id} ref={box2.ref} left={200}>{"Tord"}</Box>
        <Xarrow start={box1.id} end={box2.id} {...props} {...args} />
        <Xarrow start={box2.id} end={box1.id} {...props} {...args} />
        <Xarrow start={box2.id} end={box3.id} {...props} {...args} />
      </div>
    </React.Fragment>
  );
};

export default Playground;
