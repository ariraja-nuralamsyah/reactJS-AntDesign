import React, { useState } from 'react';
import { Table, Modal, Space, Button, Input } from 'antd';
// import axios from 'axios';
import Chart from './../Grafik/ChartQuality';
import dataQualityDummy from '../data/dataQualityDummy.json';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


function TableQuality() {
  const [data] = useState(dataQualityDummy);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState("1");
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',}
  );
  let searchInput;
  
  // useEffect(() => {
  // async function fetchData(){
  //   const result = await axios(
  //     'dataQualityDummy.json',
  //     );
  
  //     setData(result.data);
  //   }
  // fetchData();
  // });
  
  function showModal(id){
    setModalKey(id);
    setIsModalVisible(true);
  };
  
  const handleOk = () => {
    setIsModalVisible(false);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const getFullDate = (date) => {
    const dateAndTime = date.split('T');
    
    return dateAndTime[0].split('-').reverse().join('-');
  };
  
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
      <Input
      ref={node => {
        searchInput = node;
      }}
      placeholder={`Search ${dataIndex}`}
      value={selectedKeys[0]}
      onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
      style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
      <Button
      type="primary"
      onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
      icon={<SearchOutlined />}
      size="small"
      style={{ width: 90 }}
      >
      Search
      </Button>
      <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
      Reset
      </Button>
      </Space>
      </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
      record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[state.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
        />
        ) : (
          text
          ),
        });
        
        const handleSearch = (selectedKeys, confirm, dataIndex) => {
          confirm();
          setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
          });
        };
        
        const handleReset = clearFilters => {
          clearFilters();
          setState({ searchText: '' });
        };
        
        
        const columns = [
          {
            title: 'date',
            dataIndex: 'date',
            key: 'date',
            render: ((date) => getFullDate(date)),
            fixed: 'left',
            sorter: (a, b) => moment(getFullDate(a.date)).unix() - moment(getFullDate(b.date)).unix()
          },
          {
            title: 'group',
            dataIndex: 'group',
            key: 'group',
            ...getColumnSearchProps('group'),
          },
          {
            title: 'source',
            dataIndex: 'source',
            key: 'source',
            ...getColumnSearchProps('source'),
          },
          {
            title: 'PIC',
            dataIndex: 'pic',
            key: 'pic',
            sorter: (a, b) => a.pic.localeCompare(b.pic),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('pic'),
          },
          {
            title: 'dependents',
            dataIndex: 'dependents',
            key: 'dependents',
            ...getColumnSearchProps('dependents'),
          },
          {
            title: 'KPI',
            dataIndex: 'kpi',
            key: 'kpi',      
            sorter: (a, b) => a.kpi.localeCompare(b.kpi),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('kpi'),
          },
          {
            title: 'Current val',
            dataIndex: 'current_value',
            key: 'current_value',
            ...getColumnSearchProps('current_value'),
          },
          {
            title: 'Threshold',
            dataIndex: 'threshold',
            key: 'threshold',
            ...getColumnSearchProps('threshold'),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status'),
          },
          {
            title: 'Aging',
            dataIndex: 'aging',
            key: 'aging',
            sorter: {
              compare: (a, b) => a.aging - b.aging,
            },
            ...getColumnSearchProps('aging'),
          },
          {
            title: 'Remark',
            dataIndex: 'remark',
            key: 'remark',
            filters: [
              {
                text: 'resolved',
                value: 'resolved',
              },
              {
                text: 'on check',
                value: 'on check',
              },
              {
                text: 'unresolved',
                value: 'unresolved',
              },
            ],
            onFilter: (value, record) => record.remark.indexOf(value) === 0,
          },
          {
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            render: (text, record) => (
              <Space size="middle">
              <Button id="button" type="link" onClick={() => { showModal(record.id)}}>Last 30 Days</Button>
              </Space>
              ),
              fixed:'right',
            },
          ]
          
          return (
            <>
            {/* <div style={{width:'1100px'}}> */}
            <Table 
            columns={columns} 
            dataSource={data} 
            rowKey="_id" 
            scroll={{ x: 1500 }}
            bordered title={() => <h1 align='center'>Tabel Data Quality</h1>}
            sticky
            />
            {/* </div> */}
            <Modal 
            title="Chart Quality" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel} 
            width={1200}
            >
            <>
            {modalKey}
            </>
            <Chart />
            </Modal>
            </>
            );
          }
          
          export default TableQuality;