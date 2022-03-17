import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import useAgent from 'lib/useAgent';
import { FunctionComponent, useState } from 'react';
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type dateMap = {
    [key: string]: Map<string, number>
}

const DAY = 1000 * 60 * 60 * 24
const DATASET_NAME = ['verb', 'noun', 'adverb', 'adjective', 'other']
//const COLORS = ['#212529', '#495057', '#adb5bd', '#dee2e6', '#e9ecef']
const COLORS = ['#3498DB', '#FFD600', '#2ECC71', '#E74C3C', '#BDC3C7']

const options = {
    plugins: {
        title: {
            display: true,
            text: '',
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
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
            ticks: {
                color: 'white',
                size: 12,
            }
        },
        y: {
            stacked: true,
            grid: {
                drawBorder: true,
                color: '#6c757d',
            },
            ticks: {
                color: 'white',
                fontSize: 12,
            }
        },
    },
};


function BarChart({ dateMap }: { dateMap: dateMap }): FunctionComponent {
    const [startDay, setStart] = useState<string>(new Date().toLocaleDateString().replace(/-/g, "/"))
    const [weekly, setWeekly] = useState<boolean>(true)

    console.log("useAgent()", useAgent())
    const initChartData = (): { labels: string[], datasets: object } => {
        const labels: string[] = Array(weekly ? 7 : 30).fill(null).map((_, index) => new Date(new Date(startDay) - DAY * index).toLocaleDateString().replace(/-/g, "/")).reverse()
        return {
            labels,
            datasets: DATASET_NAME.map((name, index) => ({
                label: name.charAt(0).toLocaleUpperCase() + name.slice(1),
                data: labels.map(date => dateMap[name].get(date)),
                backgroundColor: COLORS[index]
            }))
        };
    }

    const dayShift = (offset: number) => {
        if (startDay >= new Date().toLocaleDateString().replace(/-/g, "/") && offset > 0) return
        const day = new Date(new Date(startDay).getTime() + offset * DAY).toLocaleDateString().replace(/-/g, "/")
        setStart(day)
    }

    const data = initChartData()
    options.plugins.title.text = `Daily distribution from ${data.labels[0]} ~ ${data.labels.slice(-1)}`
    return (
        <div className="col-12 col-md-8 mt-4" style={{ zIndex: 99 }}>
            <Row className="text-white" style={{ zIndex: 99 }} >
                <Col className="d-flex align-items-center">
                    <FastRewindIcon fontSize={'medium'} onClick={() => dayShift(weekly ? -7 : -30)} />
                    <ArrowLeftIcon fontSize={'large'} onClick={() => dayShift(-1)} />
                </Col>
                <Col >
                    <ButtonGroup className="d-flex align-items-center">
                        <Button variant={weekly ? 'secondary' : 'outline-secondary'} onClick={() => setWeekly(true)}>Weekly</Button>
                        <Button variant={!weekly ? 'secondary' : 'outline-secondary'} onClick={() => setWeekly(false)}>Monthly</Button>
                    </ButtonGroup>
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                    <ArrowRightIcon fontSize={'large'} onClick={() => dayShift(1)} />
                    <FastForwardIcon fontSize={'medium'} onClick={() => dayShift(weekly ? 7 : 30)} />
                </Col>
            </Row>
            <div style={{ height: "50vh", width: "100%" }} >
                <Bar options={options} data={data} style={{ zIndex: 99 }} />
            </div>

        </div>
    )
}

export default BarChart