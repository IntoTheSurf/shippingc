import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.jsx";
import { ItemTypes } from "./ItemTypes.js";
import { Menu } from "./Menu.jsx";
import Xarrow from 'react-xarrows';

const styles = {
  width: '100%',
  height: '100%',
  border: "1px solid black"
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

export const Container = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState([{ index: 1, id:"box1", top: 20, left: 390, z: 0, title: "Drag me around" },
  { index: 2, id:"box2", top: 180, left: 350, z: 1, title: "Drag me too" }]
  );

  const maxZ = boxes.reduce(function (prev, current) {
    return (prev.z > current.z) ? prev.z : current.z
  });

  const moveBox = useCallback(
    (index, left, top) => {
      setBoxes(
        update(boxes, {
          [index]: {
            $merge: { left, top }
          }
        })
      );
    },
    [boxes, setBoxes]
  );

  const addNewBox = event => {
    const max = boxes.reduce(function (prev, current) {
      return (prev.z > current.z) ? prev.z : current.z
    })
    setBoxes(boxes.concat({ index: boxes.length, id:"box" + boxes.length, top: 120, left: 390, z: max + 1 }));
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.NODE,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.index, left, top);
        return undefined;
      }

    }),
    [moveBox]
  );

  return (
    <div ref={drop} style={styles}>
      <Menu createNode={addNewBox} />

      <div style={{ isolation: "isolate" }}>
        {Object.keys(boxes).map((key) => {
          const { left, top, z, id, title } = boxes[key];
          return (

            <Box
              key={key}
              index={key}
              id={id}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
              zIndex={z}
              maxZ={maxZ}
            >
              {title}
            </Box>
          );
        })}
      </div>

      <Xarrow start={boxes[0].id} end={boxes[1].id} {...props}/>
    </div>
  );
};
