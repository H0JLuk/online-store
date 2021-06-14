import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Alert, Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { createDevice } from '../../http/deviceApi'
import BrandStore from '../../store/BrandStore'
import TypeStore from '../../store/TypeStore'
import { IBrand } from '../../types/brand'
import { IDeviceInfo } from '../../types/device'
import { IType } from '../../types/type'
import { MODAL_ANIM_TIME } from '../../utils/consts'
import { IAlert } from './CreateBrand'

interface ICreateDeviceProps {
  onHide: () => void
  show: boolean
}

interface IData {
  name: string
  price: string
  img: File | null
  type: IType | null
  brand: IBrand | null
}

const CreateDevice: React.FC<ICreateDeviceProps> = ({ show, onHide }) => {
  const { types } = TypeStore
  const { brands } = BrandStore
  const [info, setInfo] = useState<IDeviceInfo[]>([])

  const [data, setData] = useState<IData>({ name: '', price: '', brand: null, type: null, img: null })
  const [alertData, setAlertData] = useState<IAlert[]>([])

  const addInfo = () => setInfo([...info, { id: Date.now(), title: 'Title', description: 'Description' }])

  const removeInfo = (id: number) => setInfo(info.filter((i) => i.id !== id))

  const handleChangeInfo = (id: number, field: 'title' | 'description') => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInfo(
      info.map((info) => {
        info.id === id && (info[field] = e.target.value)
        return info
      })
    )

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('name', data.name)
    formData.set('price', data.price)
    formData.set('typeId', `${data.type?.id || ''}`)
    formData.set('brandId', `${data.brand?.id || ''}`)
    formData.set('img', data.img || '')
    info.length && formData.set('deviceInfo', JSON.stringify(info))

    createDevice(formData)
      .then(() => {
        const alertId = Date.now()
        setAlertData([{ id: alertId, show: true, message: ['Device was created'], type: 'success' }])
        setTimeout(() => hideAlert(alertId), MODAL_ANIM_TIME)
        onHide()
      })
      .catch((e) => {
        console.log('ERROR', e.response.data)
        const alertId = Date.now()
        const { message } = e.response.data
        setAlertData([...alertData, { id: alertId, show: true, message: [message], type: 'danger' }])
        setTimeout(() => hideAlert(alertId), MODAL_ANIM_TIME)
      })
  }

  const hideAlert = (id: number) => setAlertData((prev) => prev.filter((alert) => alert.id !== id))

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'file' ? e.target.files && e.target.files[0] : e.target.value
    setData({ ...data, [field]: value })
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 60, right: 40, zIndex: 1100 }}>
        {alertData.map((alert) => (
          <Alert
            show={alert.show}
            variant={alert.type}
            onClose={() => hideAlert(alert.id)}
            style={{ maxWidth: 500, wordWrap: 'break-word' }}
            dismissible
          >
            <ul>
              {alert.message.map((message) => (
                <li>{message}</li>
              ))}
            </ul>
          </Alert>
        ))}
      </div>

      <Modal
        style={{ backdropFilter: 'blur(3px)' }}
        show={show}
        onHide={onHide}
        size='lg'
        backdrop='static'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Add device</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreate}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Device name</Form.Label>
              <Form.Control value={data.name} onChange={handleChange('name')} placeholder='Enter device name' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Device price</Form.Label>
              <Form.Control value={data.price} onChange={handleChange('price')} placeholder='Enter device price' />
            </Form.Group>

            <Dropdown className='mb-2'>
              <Dropdown.Toggle>{data.type?.name || 'Choose a type'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {types.map((type) => (
                  <Dropdown.Item onClick={() => setData({ ...data, type })} key={type.id}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='mb-2'>
              <Dropdown.Toggle>{data.brand?.name || 'Choose a brand'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {brands.map((brand) => (
                  <Dropdown.Item onClick={() => setData({ ...data, brand })} key={brand.id}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Form.Group className='mb-3'>
              <Form.Label>Device image</Form.Label>
              <Form.Control type='file' value={''} onChange={handleChange('img')} />
            </Form.Group>

            {/* {data.img && <Image src={data.img} />} */}

            <hr />
            <Button onClick={addInfo} variant='outline-dark' className='mb-3'>
              Add new field
            </Button>
            {info.map(({ id, title, description }) => (
              <Row className='align-items-center mt-1' key={id}>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Info title</Form.Label>
                    <Form.Control
                      value={title}
                      onChange={handleChangeInfo(id, 'title')}
                      placeholder='Type info title'
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Info description</Form.Label>
                    <Form.Control
                      value={description}
                      onChange={handleChangeInfo(id, 'description')}
                      placeholder='Type info description'
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Button onClick={() => removeInfo(id)} variant='outline-danger'>
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>
              Close
            </Button>
            <Button variant='outline-success' type='submit'>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default observer(CreateDevice)
