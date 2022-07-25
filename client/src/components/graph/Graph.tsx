import './Graph.css'
import Paper from '@mui/material/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Chart,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import { IVacation } from '../../models/IVacation';

interface IDataItem {
    vacation: string,
    numOfFollowers: number,
}

export default function Graph() {
    const vacationsMap = useSelector((state: AppState) => state.vacationsMap);
    
    let chartData: IDataItem[]=[];
    vacationsMap.forEach((vacation: IVacation, id: number) => {
        chartData.push({vacation: vacation.destination, numOfFollowers: vacation.numOfFollowers});
    });
    return (
        <div className="graph">
            <h1>Admin Page - Followers Graph</h1>
            <Paper className="paper">
                <Chart data={chartData} >
                    <ValueScale name="numOfFollowers" />
                    <ArgumentAxis />
                    <ValueAxis  scaleName="numOfFollowers" showGrid={false} showLine={true} showTicks={true} />
                    <BarSeries
                        name="Units Sold"
                        valueField="numOfFollowers"
                        argumentField="vacation"
                        scaleName="numOfFollowers"
                    />
                </Chart>
            </Paper>
        </div>
    );

}
