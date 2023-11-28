import React, { useEffect, useState } from 'react'
import connect from './connect'
import EditableTable from './components/editableTable/editableTable'
import Loader from './components/loader'
import './index.scss'

const MyApp = ({ loadDataSource, updateDataSource, loading, auth }) => {
  const [dataSource, setDataSource] = useState([])

  const loadData = () => {
    loadDataSource()
      .then((res) => {
        setDataSource(res)
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  const tableConfig = [
    { label: 'name', value: 'name', type: 'text', editable: true, index: 0 },
    { label: 'icon', value: 'icon', type: 'text', editable: false, index: 1 },
    { label: 'createdAt', value: 'createdAt', type: 'date', editable: false, index: 2 },
    { label: 'lastImport', value: 'lastImport', type: 'date', editable: false, index: 3 },
    { label: 'itemsCount', value: 'itemsCount', type: 'number', editable: false, index: 4 },
    { label: 'archived', value: 'archived', type: 'boolean', editable: true, index: 5 }
  ]
  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      {!loading && dataSource.length > 0 && (
        <EditableTable
          dataSource={dataSource}
          updateDataSource={updateDataSource}
          tableConfig={tableConfig}
        />)}
    </div>
  )
}

export default connect(MyApp)
