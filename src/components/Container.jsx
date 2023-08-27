import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.jsx";
import { ItemTypes } from "./ItemTypes.js";
import { Menu } from "./Menu.jsx";
import Xarrow from './Xarrow.jsx';

const styles = {
  width: '100%',
  height: '100%',
  border: "1px solid black"
};

const arrowProps = {
  // this is the important part of the example! play with the props to understand better the API options
  curveness: Number(0),
  color: "blue",
  lineColor: "red",
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
  const [boxes, setBoxes] = useState([{ index: 0, id: "box0", top: 20, left: 390, z: 0, title: "Drag me around" },
  { index: 1, id: "box1", top: 180, left: 350, z: 1, title: "Drag me too" },
  { index: 2, id: "box2", top: 180, left: 350, z: 2, title: "Tom" },
  { index: 3, id: "box3", top: 180, left: 350, z: 2, title: "Tord" }]
  );

  const [lines, setLines] = useState([{
          props: { start:"box0", end:"box1" },
          menuWindowOpened: false,
        },{
          props: { start:boxes[1].id, end:boxes[2].id },
          menuWindowOpened: false,
        },{
          props: { start:boxes[0].id, end:boxes[3].id },
          menuWindowOpened: false,
        }]);

  // selected:{id:string,type:"arrow"|"box"}
  const [selected, setSelected] = useState(null);
  const [actionState, setActionState] = useState('Normal');

  const handleSelect = (e) => {
    if (e === null) {
      setSelected(null);
      setActionState('Normal');
    } else {
      setSelected({ id: e.target.id });
      console.log("Selected id is" + e.target.id);
    }
  };

  const menuProps = {
    selected,
    handleSelect,
    actionState,
    setActionState,
    lines,
    setLines,
  };

  const boxProps = {
    boxes,
    setBoxes,
    selected,
    handleSelect,
    actionState,
    setActionState,
    lines,
    setLines,
  };

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

  const createNode = event => {
    setBoxes(boxes.concat({ index: boxes.length, id: "box" + boxes.length, top: 120, left: 390 }));
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
    <div onClick={() => handleSelect(null)} ref={drop} style={styles}>
      <Menu createNode={createNode} {...menuProps} />

      <div style={{ isolation: "isolate" }}>
        {Object.keys(boxes).map((key) => {
          const { left, top, z, id, title } = boxes[key];
          return (

            <Box
              props={boxProps}
              key={key}
              index={key}
              id={id}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
              z={z}
            >
              {title}
            </Box>
          );
        })}
      </div>
      {lines.map((line, i) => (
        <Xarrow
          key={line.props.start + '-' + line.props.end + i}
          line={line}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};
