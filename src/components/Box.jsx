import { useState } from "react";
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import style from '../css/frame.module.css'
import { useXarrow } from 'react-xarrows';

export const Box = ({ index, id, left, top, z, children }) => {
  
  const updateXarrow = useXarrow();

  const [zIndex, setZIndex] = useState(z);

  const handleClick = (e) => {
    setZIndex(z++);

    e.stopPropagation(); //so only the click event on the box will fire on not on the container itself
    if (props.actionState === 'Normal') {
      props.handleSelect(e);
    } else if (props.actionState === 'Add Connections' && props.selected.id !== props.box.id) {
      props.setLines((lines) => [
        ...lines,
        {
          props: { start: props.selected.id, end: props.box.id },
          menuWindowOpened: false,
        },
      ]);
    } else if (props.actionState === 'Remove Connections') {
      props.setLines((lines) =>
        lines.filter((line) => !(line.root === props.selected.id && line.end === props.box.id))
      );
    }
    
  };

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
      style={{ ...style, left, top, z }}
      data-testid="box"
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
