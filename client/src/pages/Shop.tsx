import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import TypeBar from '../components/TypeBar'
import { fetchBrands } from '../http/brandApi'
import { fetchDevices } from '../http/deviceApi'
import { fetchTypes } from '../http/typeApi'
import BrandStore from '../store/BrandStore'
import DeviceStore from '../store/DeviceStore'
import TypeStore from '../store/TypeStore'
import { IDeviceReqQueries } from '../types/device'

function Shop() {
  const { setTypes, currentType } = TypeStore
  const { setBrands, currentBrand } = BrandStore
  const { setDevices, setTotalDevices, limit: deviceLimit, page: devicePage } = DeviceStore

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data))
    fetchBrands().then((data) => setBrands(data))
  }, [setTypes, setBrands])

  useEffect(() => {
    ;(async () => {
      const brands = await fetchBrands(currentType?.id)
      setBrands(brands)
    })()
  }, [currentType, setBrands])

  useEffect(() => {
    const queries: IDeviceReqQueries = {
      typeId: currentType?.id,
      brandId: currentBrand?.id,
      limit: deviceLimit,
      page: devicePage,
    }

    fetchDevices(queries).then((data) => {
      setDevices(data.rows)
      setTotalDevices(data.count)
    })
  }, [currentType, currentBrand, devicePage, deviceLimit, setTotalDevices, setDevices])

  return (
    <Container className='mt-2'>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
}

export default observer(Shop)
