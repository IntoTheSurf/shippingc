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

const boxStyle= {
  left:100,
  top:"200px"
};

export const Container = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState([  {id: 1, top: 20, left: 390, title: "Drag me around" },
  {id: 2, top: 180, left: 350, title: "Drag me too" }]
);
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
    setBoxes(boxes.concat({id: boxes.length, top: 120, left: 390 }));
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
      <Menu createNode={addNewBox}/>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key];
        return (<>
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        </>

        );
      })}
    </div>
  );
};
