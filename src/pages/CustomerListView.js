import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Space, Button } from 'antd';
import axios from 'axios';

class CustomerListView extends Component {

  constructor(props) {
    super(props);
    this.state = {customers: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    axios.get('http://localhost:8080/api/customers')
      .then(data => this.setState({customers: data.data, isLoading: false}));
  }

  async remove(id) {
    await axios.delete(`http://localhost:8080/api/customer/${id}`)
      .then(() => {
      let updatedCustomers = [...this.state.customers].filter(i => i.data.id !== id);
      this.setState({customers: updatedCustomers});
    });
  }

  render() {
    const {customers, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const columns = [
        {
            title: 'Firstname',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <Space size="middle">
                  <Link to={"/customer/" + record.id}>
                    <Button type="primary">Edit</Button>
                  </Link>
                  <Button danger onClick={() => this.remove(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ]
    return (
    <>
        <Link to='/customer/new'>
            <Button type="primary" ghost>Add Customer</Button>
        </Link>
        <Table columns={columns} dataSource={customers} rowKey="id"/>
    </>
    );
  }
}

export default CustomerListView;