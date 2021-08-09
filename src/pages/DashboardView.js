import React from 'react';
import XYChart from '../Grafik/XYChart'
import PieChart from '../Grafik/PieChart'
import VennDiagram from '../Grafik/VenDiagram'
import ChordDiagram from '../Grafik/ChordDiagram';
import { Col, Row } from 'antd';

const style = { background: 'white', padding: '8px 0', textAlign: 'center'};

function DashboardView(){
    return(
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={12}>
                    <div style={style}>
                        <h1>XYChart</h1>
                        <XYChart />
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div style={style}>
                        <h1>PieChart</h1>
                        <PieChart />
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div style={style}>
                        <h1>Ven Diagram</h1>
                        <VennDiagram />
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div style={style}>
                        <h1>Chord Diagram</h1>
                        <ChordDiagram />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default DashboardView;