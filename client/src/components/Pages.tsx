import { observer } from 'mobx-react-lite'
import React from 'react'
import { Pagination } from 'react-bootstrap'
import DeviceStore from '../store/DeviceStore'

function Pages() {
  const { setPage, totalDevices, limit, page: activePage } = DeviceStore
  const pageCount = Math.ceil(totalDevices / limit)
  const pages = new Array(pageCount).fill(0).map((_, idx) => idx + 1)

  return (
    <Pagination className='mt-5'>
      {pages.map((page) => (
        <Pagination.Item active={activePage === page} onClick={() => setPage(page)} key={page}>
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default observer(Pages)
