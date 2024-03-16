/* eslint-disable react/prop-types */
import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow, Button, Spinn } from '@nextui-org/react';
import moment from 'moment';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const NextTable = ({
  onOpen,
  setModalState,
  setValues,
  data = [],
  isLoading = false,
  isError = false,
}) => {

  const handleEdit = (item) => {
    setValues(item);
    setModalState('Update');
    onOpen();
  };

  const handleDelete = (item) => {
    setValues({ ...item, is_deleted: true });
    setModalState('Delete');
    onOpen();
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : isError ? (
        <div>Failed to load data</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>#</TableCell>
              {columns.map((column) => (
                <TableCell key={column}>{capitalize(column.replace('_', ' '))}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column}>{item[column] ? (column.includes('date') ? moment(item[column]).format('MMMM DD, YYYY') : item[column].toString()) : 'N/A'}</TableCell>
                  ))}
                  <TableCell>
                    <Button auto color="primary" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button auto color="error" onClick={() => handleDelete(item)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 2}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default NextTable;
