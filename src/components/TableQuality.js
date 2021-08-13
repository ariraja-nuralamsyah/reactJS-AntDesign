import React, { useState } from 'react';
import { Table, Modal, Space, Button } from 'antd';
// import axios from 'axios';
import Chart from './../Grafik/ChartQuality';
import dataQualityDummy from '../data/dataQualityDummy.json';


function TableQuality() {
  const [data] = useState(dataQualityDummy);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState("1");

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

const columns = [
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
      render: ((date) => getFullDate(date)),
      fixed: 'left',
    },
    {
      title: 'group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      key: 'pic',
    },
    {
      title: 'dependents',
      dataIndex: 'dependents',
      key: 'dependents',
    },
    {
      title: 'KPI',
      dataIndex: 'kpi',
      key: 'kpi',
    },
    {
      title: 'Current val',
      dataIndex: 'current_value',
      key: 'cur',
    },
    {
      title: 'Threshold',
      dataIndex: 'threshold',
      key: 'threshold',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Aging',
      dataIndex: 'aging',
      key: 'aging',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'action',
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