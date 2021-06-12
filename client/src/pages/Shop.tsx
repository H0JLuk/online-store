import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import TypeBar from '../components/TypeBar'
import { fetchBrands } from '../http/brandApi'
import { fetchDevices } from '../http/deviceApi'
import { fetchTypes } from '../http/typeApi'
import BrandStore from '../store/BrandStore'
import DeviceStore from '../store/DeviceStore'
import TypeStore from '../store/TypeStore'
import { IDeviceReqQueries } from '../types/device'

function Shop() {
  const { setTypes, types, currentType } = TypeStore
  const { setBrands, currentBrand } = BrandStore
  const { setDevices, limit } = DeviceStore

  useEffect(() => {
    if (!types.length) {
      fetchTypes().then((data) => setTypes(data))
      fetchBrands().then((data) => setBrands(data))
    }
  }, [setTypes, setBrands])

  useEffect(() => {
    fetchBrands(currentType?.id, 1, limit)
  }, [currentType])

  useEffect(() => {
    const queries: IDeviceReqQueries = {}
    currentType && (queries.typeId = currentType.id)
    currentBrand && (queries.brandId = currentBrand.id)
    fetchDevices(queries).then((data) => setDevices(data))
  }, [currentType, currentBrand, setDevices])

  return (
    <Container className='mt-2'>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
        </Col>
      </Row>
    </Container>
  )
}

export default observer(Shop)
