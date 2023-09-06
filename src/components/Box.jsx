import { useState } from "react";
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import style from '../css/frame.module.css'
import { useXarrow } from 'react-xarrows';

export const Box = ({ props, index, id, left, top, children }) => {

  const selectedBox = props.boxCustomization[index];
  const boxShape = selectedBox.shape;
  const boxSize = selectedBox.size;
  const url = selectedBox.url;
  const borderColor = selectedBox.borderColor;
  const bgColor = selectedBox.bgColor;
  const borderWidth = selectedBox.borderWidth;
  const textColor = selectedBox.textColor;
  const zValue = selectedBox.z;


  const boxStyle = {
    color: textColor,
    zIndex: zValue,
    height: `${boxSize}px`,
    width: `${boxSize}px`,
    backgroundColor: bgColor,
    backgroundImage: `url(${url})`,
    borderRadius: boxShape != 'square' ? "50%" : '10px',
    border: `${borderWidth}px solid ${borderColor}`,
    cursor: 'move',
    position: "absolute"
  }

  const updateXarrow = useXarrow();


  const externalImage =
    'https://w0.peakpx.com/wallpaper/229/806/HD-wallpaper-one-piece-gear-5-one-piece-monkey-d-luffy-thumbnail.jpg';

  const handleClick = (e) => {
    handleZChange();

    e.stopPropagation(); //so only the click event on the box will fire on not on the container itself
    if (props.actionState === 'Normal') {
      props.handleSelect(e);
      props.setEditMenu({ type: 'box', index: index });

    } else if (props.actionState === 'Create line' && props.selected.id !== id) {
      props.setLines((lines) => [
        ...lines,
        {
          props: { start: props.selected.id, end: id },
          menuWindowOpened: false,
        },
      ]);
      props.setLineCustomization(props.lineCustomization.concat({
        style: "solid", label: " ", color: "#d62727", width: 1
      }));
      props.setActionState('Normal');

    } else if (props.actionState === 'Remove node') {
      props.setLines((lines) => {
        return lines.filter(
          (line) => !(line.props.start === props.selected.id || line.props.end === props.selected.id)
        );
      }); 
      if (props.boxes.map((box) => box.id).includes(props.selected.id)) {
        props.setBoxes((boxes) => boxes.filter((box) => !(box.id === props.selected.id)));
      }
      
    };
  }
  function handleZChange() {
    props.setBoxes(items => items.map((item, i) => {
      console.log(selectedBox.z);
      console.log(props.boxes.length);
      props.setMaxZ(selectedBox.z + props.boxes.length);
      console.log(props.maxZ);
      if (i === props.index) {
        return {
          ...item,
          z: props.maxZ
        };
      } else {
        return item;
      }
    }));
  }


  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.NODE,
      item: { index, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: updateXarrow
    }),
    [index, left, top],
  )
  if (isDragging) {
    return <div ref={drag} />
  }
  return (
    <div
      className={style.frame}
      ref={drag}
      index={index}
      id={id}
      style={{ ...style, left, top, ...boxStyle }}
      data-testid="box"
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
