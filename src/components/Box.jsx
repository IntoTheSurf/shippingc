import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import style from '../css/frame.module.css'

export const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.NODE,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }
  return (
    <div
    className={style.frame}
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="box"
    >
      {children}
    </div>
  )
}
