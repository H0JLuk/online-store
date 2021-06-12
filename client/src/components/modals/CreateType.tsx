import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { createType } from '../../http/typeApi'
import TypeStore from '../../store/TypeStore'
import { MODAL_ANIM_TIME } from '../../utils/consts'
import { IAlert } from './CreateBrand'

interface ICreateTypeProps {
  onHide: () => void
  show: boolean
}

const CreateType: React.FC<ICreateTypeProps> = ({ show, onHide }) => {
  const { addType } = TypeStore
  const [value, setValue] = useState('')
  const [alertData, setAlertData] = useState<IAlert[]>([])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    createType(value)
      .then((type) => {
        addType(type)
        const alertId = Date.now()
        setAlertData([{ id: alertId, show: true, message: ['Type was created'], type: 'success' }])
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
          <Alert show={alert.show} variant={alert.type} onClose={() => hideAlert(alert.id)} dismissible>
            {alert.message}
          </Alert>
        ))}
      </div>

      <Modal
        style={{ backdropFilter: 'blur(3px)' }}
        show={show}
        onHide={onHide}
        backdrop='static'
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Form onSubmit={handleCreate}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>Add type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Type name</Form.Label>
              <Form.Control value={value} onChange={(e) => setValue(e.target.value)} placeholder='Enter type name' />
            </Form.Group>
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

export default observer(CreateType)
