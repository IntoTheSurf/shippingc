import styles from '../css/frame.module.css';
import { ItemTypes } from './ItemTypes'
import { useDrag } from 'react-dnd'

function Frame({ id, left, top, hideSourceOnDrag, children }) {
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
    className={styles.frame}
      ref={drag}
      style={{ ...styles, left, top }}
      data-testid="node"
    >
      {children}
    </div>
  )
}

export {Frame};