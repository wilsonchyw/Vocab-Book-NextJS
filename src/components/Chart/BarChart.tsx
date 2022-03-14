import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
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
const COLORS = ['#212529', '#495057', '#adb5bd', '#dee2e6', '#e9ecef']

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Daily distribution',
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

    const [startDay, setStart] = useState<string>(new Date().toLocaleDateString())
    const [weekly, setWeekly] = useState<boolean>(true)

    const initChartData = (): object => {
        const labels: string[] = Array(weekly ? 7 : 30).fill(null).map((_, index) => new Date(new Date(startDay) - DAY * index).toLocaleDateString()).reverse()
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
        console.log(startDay, new Date().toLocaleDateString(), startDay == new Date().toLocaleDateString())
        if (startDay == new Date().toLocaleDateString() && offset > 0) return
        const day = new Date(new Date(startDay).getTime() + offset * DAY).toLocaleDateString()
        setStart(day)
    }

    const data = initChartData()

    console.log(data)

    return (
        <>
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
            <Bar options={options} data={data} style={{ zIndex: 99 }} />
        </>
    )
}

export default BarChart