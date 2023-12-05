import React from 'react'
import EditableTable from './components/editableTable/editableTable'
import Loader from './components/loader'
import './index.scss'
import { DataSources, UpdateDataSources } from './requests'
import { useFetch, useMutate } from './util'

const MyApp = () => {
  const { data, loading, refetch } = useFetch(DataSources, {
    returnKey: 'collection'
  })
  const { mutation, loading: updateLoading } = useMutate(UpdateDataSources, {})

  const handleSave = async (data) => {
    const updatePromises = data.map(async item =>
      await mutation(
        { variables: { id: item.id, name: item.name, archived: item.archived } })
    )
    await Promise.all(updatePromises).then(() => refetch())
  }

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
      {(loading || updateLoading) && <Loader isLoading={(loading || updateLoading)} />}
      {(!loading || !updateLoading) && data?.dataSources.length > 0 && (
        <EditableTable
          dataSource={data.dataSources}
          tableConfig={tableConfig}
          handleSave={handleSave}
        />)}
    </div>
  )
}

export default MyApp
