import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button,  } from 'antd';
import { Container } from 'reactstrap';
import axios from 'axios';

class CustomerEditView extends Component {

  emptyCustomer = {
    id: '',
    firstname: '',
    lastname: '',
    age: '',
    address: '',
    copyrigtby: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCustomer
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const customer = (await axios.get(`http://localhost:8080/api/customer/${this.props.match.params.id}`).catch(error => {console.log(error)}));
      this.setState({item: customer.data});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
    
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    (item.id) ? 
      await axios.put('http://localhost:8080/api/customer', item)
      : 
      await axios.post('http://localhost:8080/api/customer', item)
    this.props.history.push('/customers');
  }
  
  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Customer' : 'Add Customer'}</h2>;
    const layout = {
        labelCol: {
          span: 3,
        },
        wrapperCol: {
          span: 19,
        },
      };
      
    return <div>
      <Container>
        <div style={{textAlign:'center'}}>{title}</div>
        <Form {...layout} name="nest-messages" onFinish={this.handleSubmit} >
            <Form.Item
            label="FirstName"
            >
                <Input value={item.firstname} 
            onChange={event => this.handleChange(event)}  autoComplete="firstname"
            name="firstname" id="firstname"/>
            </Form.Item>
            <Form.Item
            label="Lastname"
            >
                <Input value={item.lastname}
            onChange={event => this.handleChange(event)} autoComplete="lastname" 
            name="lastname" id="lastname"/>
            </Form.Item>
            <Form.Item
            label="Age"
            >
            <Input value={item.age}
            onChange={event => this.handleChange(event)} autoComplete="age" 
            name="age" id="age"/>
            </Form.Item>
            <Form.Item 
            label="Address" 
            >
            <Input.TextArea value={item.address}
            onChange={event => this.handleChange(event)} autoComplete="address"
            name="address" id="address"/>
            </Form.Item>
            
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                <Button color="primary" type="submit" onClick={this.handleSubmit}>Save</Button>{' '}
                <Link to='/customers'>
                    <Button color="secondary">Cancel</Button>
                </Link>
            </Form.Item>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CustomerEditView);