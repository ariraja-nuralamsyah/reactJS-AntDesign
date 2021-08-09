import { useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function ChordDiagram() {
    const chart4 = useRef(null);

    useLayoutEffect(() => {
        // Create chart
        let x4 = am4core.create("chartdiv4", am4charts.ChordDiagram);

        // Set data
        x4.data = [
            { "from": "A", "to": "D", "value": 10 },
            { "from": "B", "to": "D", "value": 8 },
            { "from": "B", "to": "E", "value": 4 },
            { "from": "B", "to": "C", "value": 2 },
            { "from": "C", "to": "E", "value": 14 },
            { "from": "E", "to": "D", "value": 8 },
            { "from": "C", "to": "A", "value": 4 },
            { "from": "G", "to": "A", "value": 7 },
            { "from": "D", "to": "B", "value": 1 }
          ];

        // Create series
        x4.dataFields.fromName = "from";
        x4.dataFields.toName = "to";
        x4.dataFields.value = "value";

        chart4.current = x4;

        return () => {
        x4.dispose();
        };
    }, []);

    return (
        <div id="chartdiv4" style={{ width: "100%", height: "300px" }}></div>
      );
}

export default ChordDiagram
