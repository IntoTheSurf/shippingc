import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.jsx";
import { ItemTypes } from "./ItemTypes.js";
import { Menu } from "./Menu.jsx";
import { LineMenu } from "./LineMenu.jsx";
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
  const [boxes, setBoxes] = useState([{ index: 0, id: "box0", top: 20, left: 390, z: 0},
  { index: 1, id: "box1", top: 180, left: 350},
  { index: 2, id: "box2", top: 180, left: 350},
  { index: 3, id: "box3", top: 180, left: 350}]
  );

  const [lines, setLines] = useState([{
    props: { start: "box0", end: "box1" },
    menuWindowOpened: false,
  }, {
    props: { start: boxes[1].id, end: boxes[2].id },
    menuWindowOpened: false,
  }, {
    props: { start: boxes[0].id, end: boxes[3].id },
    menuWindowOpened: false,
  }]);

  // selected:{id:string,type:"arrow"|"box"}
  const [selected, setSelected] = useState(null);
  const [actionState, setActionState] = useState('Normal');
  const [editMenu, setEditMenu] = useState({ type: 'None', index: null });

 //Line properties 
  const [lineCustomization, setLineCustomization] = useState([{
    style: "solid", label: "a", color: "#d62727", width: 1
  }, {
    style: "solid", label: "b", color: "#d62727", width: 1
  }, {
    style: "solid", label: "c", color: "#296629", width: 1
  }
  ]);

  const [boxCustomization, setBoxCustomization] = useState([{
    label: "a", shape: "square", size: 100, url: " ", borderColor: "#cddb4b", bgColor: "#8febc0", borderWidth: 10, textColor: "#e3a909", z: 1
  }, {
    label: "b", shape: "circle", size: 100, url: " ", borderColor: "#7a40c2", bgColor: "#8febc0", borderWidth: 20, textColor: "#000000", z: 2
  }, {
    label: "c", shape: "square", size: 100, url: " ", borderColor: "#c24078", bgColor: "#8febc0", borderWidth: 30, textColor: "#000000", z: 3
  }, {
    label: "d", shape: "circle", size: 100, url: " ", borderColor: "#879494", bgColor: "#8febc0", borderWidth: 0, textColor: "#000000", z: 4
  }
  ]);

  const [maxZ, setMaxZ] = useState(10);

  const lineProperties = {
    lineCustomization,
    editMenu,
    setEditMenu
  }

  const handleSelect = (e) => {
    if (e === null) {
      setSelected(null);
      setActionState('Normal');
    } else {
      setSelected({ id: e.target.id });
      console.log("Selected id is" + e.target.id);
    }
  };

  const handleCanvasClick = (e) => {
    e.stopPropagation();
    setEditMenu({ type: 'None', index: null });
  }

  const menuProps = {
    selected,
    handleSelect,
    actionState,
    setActionState,
    lines,
    setLines, 
    editMenu,
    boxCustomization, 
    setBoxCustomization,
    lineCustomization, 
    setLineCustomization
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
    editMenu,
    setEditMenu,
    boxCustomization,
    lineCustomization,
    setLineCustomization,
    maxZ,
    setMaxZ
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
    setBoxCustomization(boxCustomization.concat({ label: "box" + boxes.length, shape: "square", size: 100, url: " ", borderColor: "#cddb4b", bgColor: "#7a40c2", borderWidth: 0, textColor: "#000000", z: boxes.length }));
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.NODE,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.index, left, top);
        setEditMenu({ type: 'None', index: null });
        return undefined;
      }

    }),
    [moveBox]
  );

  return (
    <div onClick={() => handleSelect(null)} ref={drop} style={styles}>
      <Menu createNode={createNode} {...menuProps} />


      <div style={{ isolation: "isolate" }} onClick={handleCanvasClick}>
        {Object.keys(boxes).map((key, i) => {
          const { index, left, top, z, id} = boxes[key]; 
          return (

            <Box
              props={boxProps}
              key={key}
              index={index}
              id={id}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag} 
            >
             <p  >{boxCustomization[index].label}</p>
            </Box>
          );
        })}
      </div>
      {lines.map((line, i) => (
        <Xarrow
          key={line.props.start + '-' + line.props.end + i}
          line={line}
          index={i}
          selected={selected}
          setSelected={setSelected}
          lineProps={lineProperties}
        />
      ))}
    </div>
  );
};
