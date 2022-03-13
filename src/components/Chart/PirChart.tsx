import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { FunctionComponent } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type dateMap = {
    [key: string]: Map<string, number>
}

const DAY = 1000 * 60 * 60 * 24
const DATASET_NAME = ['verb', 'noun', 'adverb', 'adjective', 'other']
const COLORS = ['#e9ecef', '#dee2e6', '#adb5bd', '#495057', '#212529']

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Words distribution',
            color: 'white',
            font: {
                size: 20
            },
        },
        legend: {
            labels: {
                color: "white",
            }
        },
    },
    responsive: true,
    maintainAspectRatio: true
};

function PirChart({ dateMap }: { dateMap: dateMap }): FunctionComponent {
    const initData = () => {
        console.log("initData call")
        return {
            labels: DATASET_NAME,
            datasets: [{
                data: DATASET_NAME.map((name: string) => [...dateMap[name].values()].reduce((acc, value) => acc + value, 0)),
                backgroundColor: COLORS,
                borderWidth: 0,
            }]

        };
    }

    return (
        <div style={{ width: "60vw", zIndex: 99 }} className=" mt-4">
            {<Pie data={initData()} options={options} />
            }
        </div>
    )
}

export default PirChart