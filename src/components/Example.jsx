import { useCallback, useState } from 'react'
import { Container } from './Container.jsx'
export const Example = () => {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <>
        <Container hideSourceOnDrag={true} />
      </>

    </div>
  )
}

export default Example;