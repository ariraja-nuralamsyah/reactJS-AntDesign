import React, { useState } from 'react'
import dataModuleLogs from '../data/userModuleLogs.json';
import { Table } from 'antd';

function getModulValue(modulName, data){
    return data.filter(item => item.module_name === modulName).length;
}

function countFreq(moduleName, chartData) {
    const output = [];
    moduleName.map((module_name, index) =>(
        output.push({'module_name' : module_name, 'frequency' : getModulValue(module_name, chartData)})
    ));
    return output;
}

function getTopTenModule(dataModuleFreq){
    const output = [];
    const sortData = dataModuleFreq.sort(function(a,b){return a.frequency < b.frequency ? 1 : -1;}).slice(0,10);
    sortData.map((module, index) => (
        output.push({'no' : index+1, 'module_name' : module.module_name, 'frequency' : module.frequency})
    ));
    return output;
}

function TableModuleLogs() {
    const [data] = useState(dataModuleLogs.data.user_module_logs);
    const [AllModulesName] = useState([...new Set(data.map(item => item.module_name))]);
    const columns = [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'Module Name',
          dataIndex: 'module_name',
          key: 'module_name'
        },
        {
          title: 'Frequency',
          dataIndex: 'frequency',
          key: 'frequency'
        },
        ]
    return (
        <div>
            <Table 
              columns={columns} 
              dataSource={getTopTenModule(countFreq(AllModulesName, data))}
              bordered title={() => <h1 align='center'>Tabel Data Quality</h1>}
              sticky
              />
        </div>
    )
}

export default TableModuleLogs
