import { useState } from "react";
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import style from '../css/frame.module.css'
import { useXarrow } from 'react-xarrows';

export const Box = ({ props, index, id, left, top, z, children }) => {
  
  const updateXarrow = useXarrow();

  const [zIndex, setZIndex] = useState(z);

  const externalImage =
    'https://w0.peakpx.com/wallpaper/229/806/HD-wallpaper-one-piece-gear-5-one-piece-monkey-d-luffy-thumbnail.jpg';

  const handleClick = (e) => {
    setZIndex(z++);
    console.log(props.actionState);

    e.stopPropagation(); //so only the click event on the box will fire on not on the container itself
    if (props.actionState === 'Normal') {
      props.handleSelect(e);
    } else if (props.actionState === 'Create line' && props.selected.id !== id) {
      props.setLines((lines) => [
        ...lines,
        {
          props: { start: props.selected.id, end: id },
          menuWindowOpened: false,
        },
      ]);
      props.setActionState('Normal');
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
      style={{ ...style, left, top, zIndex: zIndex, backgroundImage: `url(${externalImage})` }}
      data-testid="box"
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
