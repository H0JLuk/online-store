import { observer } from 'mobx-react-lite'
import React from 'react'
import { Row } from 'react-bootstrap'
import DeviceStore from '../store/DeviceStore'
import DeviceItem from './DeviceItem'

const DeviceList: React.FC = () => {
  const { devices } = DeviceStore
  return (
    <Row>
      {devices.map((device) => (
        <DeviceItem device={device} key={device.id} />
      ))}
    </Row>
  )
}

export default observer(DeviceList)
