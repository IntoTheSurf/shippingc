import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.jsx";
import { ItemTypes } from "./ItemTypes.js";
import { Menu } from "./Menu.jsx";
const styles = {
  width: '100%',
  height: '100%',
  border: "1px solid black"
};

export const Container = ({ }) => {
  const [boxes, setBoxes] = useState([{ id: 1, top: 20, left: 390, z: 0, title: "Drag me around" },
  { id: 2, top: 180, left: 350, z: 1, title: "Drag me too" }]
  );

  const stackNodes = (id) => {
    const max = boxes.reduce(function (prev, current) {
      return (prev.z > current.z) ? prev.z : current.z
    });

    const newState = boxes.map(obj => {
      if (obj.id === id && obj.z != max) {
        return { ...obj, z: max+1 };
      }
      return obj;
    });

    setBoxes(newState);
  };

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
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
    setBoxes(boxes.concat({ id: boxes.length, top: 120, left: 390, z: max + 1 }));
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.NODE,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
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
              id={key}
              left={left}
              top={top}
              zIndex={z}
              onClick={() => { stackNodes(key); }}
            >
              {title}
            </Box>
          );
        })}
      </div>
    </div>
  );
};
