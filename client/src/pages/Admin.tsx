import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'
import { fetchBrands } from '../http/brandApi'
import { fetchTypes } from '../http/typeApi'
import BrandStore from '../store/BrandStore'
import TypeStore from '../store/TypeStore'

enum Modals {
  type = 'type',
  brand = 'brand',
  device = 'device',
}

type ModalTypes = Modals.type | Modals.brand | Modals.device

function Admin() {
  const [modals, setModals] = useState({ type: false, brand: false, device: false })
  const { setTypes, types } = TypeStore
  const { setBrands } = BrandStore

  useEffect(() => {
    if (!types.length) {
      fetchTypes().then((data) => setTypes(data))
      fetchBrands().then((data) => setBrands(data))
    }
  }, [setTypes, setBrands])

  const toggleModal = (name: ModalTypes) => (value: boolean) => setModals((prev) => ({ ...prev, [name]: value }))

  return (
    <Container className='d-flex flex-column'>
      <Button onClick={() => toggleModal(Modals.type)(true)} variant='outline-dark' className='mt-2 p-2'>
        Add Type
      </Button>
      <Button onClick={() => toggleModal(Modals.brand)(true)} variant='outline-dark' className='mt-2 p-2'>
        Add Brand
      </Button>
      <Button onClick={() => toggleModal(Modals.device)(true)} variant='outline-dark' className='mt-2 p-2'>
        Add Device
      </Button>
      <CreateType show={modals.type} onHide={() => toggleModal(Modals.type)(false)} />
      <CreateBrand show={modals.brand} onHide={() => toggleModal(Modals.brand)(false)} />
      <CreateDevice show={modals.device} onHide={() => toggleModal(Modals.device)(false)} />
    </Container>
  )
}

export default Admin
