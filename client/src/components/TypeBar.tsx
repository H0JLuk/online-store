import { observer } from 'mobx-react-lite'
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import TypeStore from '../store/TypeStore'

const TypeBar: React.FC = () => {
  const { types, currentType, setCurrentType } = TypeStore

  return (
    <ListGroup>
      {types.map((type) => (
        <ListGroup.Item
          onClick={() => setCurrentType(type)}
          active={type.id === currentType?.id}
          key={type.id}
          style={{ cursor: 'pointer' }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default observer(TypeBar)
