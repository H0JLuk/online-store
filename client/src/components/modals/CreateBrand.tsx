import React, { useState } from 'react'
import { Alert, Button, Form, Modal, Row } from 'react-bootstrap'
import { createBrand } from '../../http/brandApi'
import BrandStore from '../../store/BrandStore'
import TypeStore from '../../store/TypeStore'
import { IType } from '../../types/type'
import { MODAL_ANIM_TIME } from '../../utils/consts'

interface ICreateBrandProps {
  onHide: () => void
  show: boolean
}

export interface IAlert {
  id: number
  message: string[]
  show: boolean
  type: 'success' | 'danger'
}

const CreateBrand: React.FC<ICreateBrandProps> = ({ show, onHide }) => {
  const { addBrand } = BrandStore
  const { types } = TypeStore
  const [data, setData] = useState<{ name: string; types: IType[] }>({ name: '', types: [] })
  const [alertData, setAlertData] = useState<IAlert[]>([])

  const handleChange = (key: 'name' | 'types') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (key === 'name') {
      const { value } = e.target
      setData({ ...data, [key]: value })
    } else {
      const typeId = +e.target.value
      const isTypeExisting = data.types.find((type) => type.id === +typeId)
      if (isTypeExisting) {
        setData({ ...data, types: data.types.filter((i) => i.id !== typeId) })
      } else {
        const type = types.find((i) => i.id === typeId)
        type && setData({ ...data, types: [...data.types, type] })
      }
    }
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    const types = data.types.map((i) => i.id)
    createBrand(data.name, types)
      .then((brand) => {
        addBrand(brand)
        const alertId = Date.now()
        setAlertData([{ id: alertId, show: true, message: ['Brand was created'], type: 'success' }])
        setTimeout(() => hideAlert(alertId), MODAL_ANIM_TIME)
        onHide()
      })
      .catch((e) => {
        const alertId = Date.now()
        const { message } = e.response.data
        setAlertData([...alertData, { id: alertId, show: true, message: [message], type: 'danger' }])
        setTimeout(() => hideAlert(alertId), MODAL_ANIM_TIME)
      })
  }

  const hideAlert = (id: number) => setAlertData((prev) => prev.filter((alert) => alert.id !== id))

  return (
    <>
      <div style={{ position: 'fixed', top: 60, right: 40, zIndex: 1100 }}>
        {alertData.map((alert) => (
          <Alert
            style={{ maxWidth: 300 }}
            show={alert.show}
            variant={alert.type}
            onClose={() => hideAlert(alert.id)}
            dismissible
          >
            {alert.message}
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
        <Form onSubmit={handleCreate}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>Add brand</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Brand name</Form.Label>
              <Form.Control value={data.name} onChange={handleChange('name')} placeholder='Enter brand name' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Brand types</Form.Label>
              <Form.Control
                as='select'
                multiple
                value={data.types.map((i) => String(i.id))}
                onChange={handleChange('types')}
              >
                {types.map((type) => (
                  <option key={type.id} value={String(type.id)}>
                    {type.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <hr />
            <Row className='justify-content-end mr-0 ml-0'>
              <Button variant='outline-danger' onClick={onHide} className='mr-3'>
                Close
              </Button>
              <Button variant='outline-success' type='submit'>
                Create
              </Button>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  )
}

export default CreateBrand
