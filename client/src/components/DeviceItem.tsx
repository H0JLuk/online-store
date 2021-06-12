import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { IDevice } from '../types/device'
import starIcon from '../assets/images/star.png'
import { useHistory } from 'react-router'
import { DEVICE_ROUTE } from '../utils/consts'
import { imgUrl } from '../utils/helpers'

interface DeviceItemProps {
  device: IDevice
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  const history = useHistory()

  return (
    <Col md={3}>
      <Card
        onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
        style={{ width: '200px', cursor: 'pointer' }}
        className='mb-2'
      >
        <Card.Img variant='top' src={imgUrl(device.img)} />
        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <div className='d-flex justify-content-between align-items-center'>
            <Card.Text className='mb-0'>{device.price} &#8381;</Card.Text>
            <div className='d-flex align-items-center'>
              <div>{device.rating}</div>
              <Image className='ml-1' width={16} height={16} src={starIcon} alt='star' />
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DeviceItem
