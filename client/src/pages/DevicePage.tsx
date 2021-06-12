import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap'

import DeviceStore from '../store/DeviceStore'
import { imgUrl } from '../utils/helpers'
import starIcon from '../assets/images/grey-star.png'
import { fetchOneDevice } from '../http/deviceApi'
import { useParams } from 'react-router'

interface stateType {
  id: string
}

function DevicePage() {
  const params = useParams<stateType>()
  const { currentDevice: device, loading, setLoading, setCurrentDevice } = DeviceStore

  useEffect(() => {
    setLoading(true)

    fetchOneDevice(+params.id).then((data) => setCurrentDevice(data))
  }, [params.id, setCurrentDevice, setLoading])

  if (loading) {
    return (
      <Row className='justify-content-center align-items-center' style={{ height: '100vh' }}>
        <Spinner animation='border' />
      </Row>
    )
  }

  if (!device) {
    return (
      <Row className='justify-content-center align-items-center' style={{ height: '100vh' }}>
        <p>Error... Please, reload page</p>
      </Row>
    )
  }

  return (
    <Container className='mt-2'>
      <Row>
        <Col md={4}>
          <Image width={300} src={imgUrl(device.img)} />
        </Col>
        <Col md={4}>
          <Row className='d-flex justify-content-center'>
            <h2>{device?.name}</h2>
            <div
              className='d-flex align-items-center justify-content-center'
              style={{
                background: `url(${starIcon})  no-repeat center center`,
                backgroundSize: 'cover',
                width: 240,
                height: 240,
                fontSize: 64,
              }}
            >
              {device?.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className='p-3 d-flex flex-column align-items-center justify-content-between'
            style={{ gap: 15, border: '3px solid lightgray', height: 300 }}
          >
            <h3 style={{ fontSize: 32 }}>From: {device.price} &#8381;</h3>
            <Button className='pr-4 pl-4' style={{ fontSize: 23 }} variant='outline-dark'>
              Add to card
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className='flex-column mt-3 mr-0 ml-0'>
        <h2>Characteristics</h2>
        {device.devicesInfo.map((info, index) => (
          <Row key={info.id} className='mr-0 ml-0 p-1' style={{ background: index % 2 ? 'transparent' : 'lightgray' }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  )
}

export default observer(DevicePage)
