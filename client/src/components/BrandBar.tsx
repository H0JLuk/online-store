import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Row } from 'react-bootstrap'
import BrandStore from '../store/BrandStore'

const BrandBar: React.FC = () => {
  const { brands, setCurrentBrand, currentBrand } = BrandStore

  return (
    <Row>
      {brands.map((brand) => (
        <Card
          className='p-2 mr-3 mb-2'
          key={brand.id}
          border={currentBrand?.id === brand.id ? 'primary' : 'light'}
          onClick={() => setCurrentBrand(brand)}
          style={{ cursor: 'pointer' }}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  )
}

export default observer(BrandBar)
