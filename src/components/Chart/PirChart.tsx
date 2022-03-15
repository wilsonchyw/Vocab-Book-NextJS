import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { FunctionComponent } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type dateMap = {
    [key: string]: Map<string, number>
}

const DATASET_NAME = ['verb', 'noun', 'adverb', 'adjective', 'other']
//const COLORS = ['#212529', '#495057', '#adb5bd', '#dee2e6', '#e9ecef']
const COLORS = ['#3498DB', '#FFD600', '#2ECC71', '#E74C3C', '#BDC3C7']

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
            display:false,
        },
    },
    responsive: true,
    maintainAspectRatio: true
};

function PirChart({ dateMap }: { dateMap: dateMap }): FunctionComponent {
    const initData = () => {
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
        <div style={{ zIndex: 99 }} className="col-12 col-md-6 mt-4">
            {<Pie data={initData()} options={options} />
            }
        </div>
    )
}

export default PirChart