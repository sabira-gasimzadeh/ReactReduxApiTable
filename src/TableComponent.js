import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './actions';
import axios from 'axios';
import './App.css'

const TableComponent = ({ data, loading, error, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <table border="1">
    <thead>
      <tr>
        <th rowspan="2">ID</th>
        <th rowspan="2">Name</th>
        <th rowspan="2">Username</th>
        <th rowspan="2">Email</th>
        <th colspan="6">Address</th>
        <th rowspan="2">Phone</th>
        <th rowspan="2">Website</th>
        <th colspan="3">Company</th>
      </tr>
      <tr>
        <th>Street</th>
        <th>Suite</th>
        <th>City</th>
        <th>Zipcode</th>
        <th colspan="2">Geo</th>
        <th>Name</th>
        <th>Catch Phrase</th>
        <th>Business</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.address ? item.address.street : '-'}</td>
          <td>{item.address ? item.address.suite : '-'}</td>
          <td>{item.address ? item.address.city : '-'}</td>
          <td>{item.address ? item.address.zipcode : '-'}</td>
          <td colSpan="2">
            {item.address && item.address.geo ? (
              <>
                <div>Latitude: {item.address.geo.lat}</div>
                <div>Longitude: {item.address.geo.lng}</div>
              </>
            ) : (
              '-'
            )}
          </td>
          <td>{item.phone}</td>
          <td>{item.website}</td>
          <td>{item.company ? item.company.name : '-'}</td>
          <td>{item.company ? item.company.catchPhrase : '-'}</td>
          <td>{item.company ? item.company.bs : '-'}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => {
    dispatch(fetchDataRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => dispatch(fetchDataSuccess(response.data)))
      .catch((error) => dispatch(fetchDataFailure(error)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);