/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import moment from 'moment'
import './editableTable.scss'

const EditableTable = ({ dataSource, tableConfig, handleSave }) => {
  const [data, setData] = useState(dataSource)
  const [editedData, setEditedData] = useState([])
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const storedColumns = JSON.parse(localStorage.getItem('visibleColumns'))
    return storedColumns || tableConfig.map(column => column.value)
  })
  const options = tableConfig.map((column, index) => ({ ...column, index }))

  useEffect(() => {
    setData(dataSource)
  }, [dataSource])

  const handleEdit = (id, field, value) => {
    const updatedData = data.map(item => (item.id === id ? { ...item, [field]: value } : item))
    setData(updatedData)

    const editedRow = updatedData.find(item => item.id === id)
    const existingEdit = editedData.find(item => item.id === id)

    const updatedEditedData = existingEdit
      ? editedData.map(item => (item.id === id ? { ...item, ...editedRow } : item))
      : [...editedData, editedRow]

    setEditedData(updatedEditedData)
  }

  const handleChange = selectedOptions => {
    const sortedOptions = selectedOptions.sort((a, b) => a.index - b.index)
    setVisibleColumns(sortedOptions.map(option => option.value))
    localStorage.setItem('visibleColumns', JSON.stringify(sortedOptions.map(option => option.value)))
  }

  const renderColumnValue = (item, column) => {
    if (column.editable && column.type === 'text') {
      return (
        <input
          type='text'
          value={item[column.value]}
          onChange={e => handleEdit(item.id, column.value, e.target.value)}
          data-testid={`text-input-${item.id}`}
        />
      )
    }

    if (column.editable && column.type === 'boolean') {
      return (
        <input
          type='checkbox'
          checked={item[column.value]}
          onChange={e => handleEdit(item.id, column.value, !item[column.value])}
          data-testid={`checkbox-input-${item.id}`}
        />
      )
    }

    return (
      <div>
        {column.type === 'date'
          ? moment(item[column.value]).format('D.M.YYYY HH:mm:ss')
          : item[column.value]}
      </div>
    )
  }

  const getVisibleColumns = () =>
    visibleColumns
      .map(columnValue => options.find(column => column.value === columnValue))
      .sort((a, b) => a.index - b.index)

  const renderTableHeader = () => getVisibleColumns().map(column => <th key={column.value}>{column.label}</th>)

  const renderTableBody = () =>
    data.map(item => (
      <tr key={item.id}>
        {getVisibleColumns().map(column => (
          <td key={column.value}>{renderColumnValue(item, column)}</td>
        ))}
      </tr>
    ))

  return (
    <div>
      <div className='actionBarWrapper'>
        <div className='actionBar'>
          <label>Columns:</label>
          <Select
            id='columnsDropdown'
            data-testid='columns-dropdown'
            options={options}
            isMulti
            value={options.filter(option => visibleColumns.includes(option.value))}
            onChange={handleChange}
          />
        </div>
        <button onClick={() => handleSave(editedData)}>Save All</button>
      </div>
      <table>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  )
}

export default EditableTable
