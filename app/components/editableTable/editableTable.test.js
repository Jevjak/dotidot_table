import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import EditableTable from './editableTable'

describe('EditableTable Component', () => {
  const dataSource = [
    { id: 1, name: 'Item 1', archived: false },
    { id: 2, name: 'Item 2', archived: true }
  ]

  const updateDataSource = jest.fn()

  const tableConfig = [
    { value: 'id', label: 'ID', type: 'text', editable: false },
    { value: 'name', label: 'Name', type: 'text', editable: true },
    { value: 'archived', label: 'Archived', type: 'boolean', editable: true }
  ]

  it('Renders the EditableTable component properly', () => {
    render(
      <EditableTable dataSource={dataSource} updateDataSource={updateDataSource} tableConfig={tableConfig} />
    )

    const columnsLabel = screen.getByText('Columns:')
    const saveButton = screen.getByText('Save All')

    expect(columnsLabel).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  })
  it('Handles editing of text fields', () => {
    render(
      <EditableTable dataSource={dataSource} updateDataSource={updateDataSource} tableConfig={tableConfig} />
    )
    const textInputs = screen.getAllByTestId(/^text-input-\d+$/)
    const specificInput = textInputs[0]
    fireEvent.change(specificInput, { target: { value: 'New value' } })
  })

  it('Handles editing of boolean fields', () => {
    render(
      <EditableTable dataSource={dataSource} updateDataSource={updateDataSource} tableConfig={tableConfig} />
    )
    const checkboxInputs = screen.getAllByTestId(/^checkbox-input-\d+$/)
    const specificInput = checkboxInputs[0]
    fireEvent.click(specificInput)
  })
})
