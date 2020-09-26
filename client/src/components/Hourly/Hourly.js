import React, { Component } from "react";
import { calcTemp, calcAmPm, renderToday } from '../../Utils/Temperature';
import { Table } from 'semantic-ui-react';

export default class Hourly extends Component {

    renderHeader = () => {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                    <Table.HeaderCell>Overview</Table.HeaderCell>
                    <Table.HeaderCell>Temperature</Table.HeaderCell>
                    <Table.HeaderCell>Feels like</Table.HeaderCell>
                    <Table.HeaderCell>Precip Probability</Table.HeaderCell>
                    <Table.HeaderCell>UV Index</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        );
    }

    renderTableBody = () => {
        const { hourly, loading, tempType } = this.props;
        if (!hourly || loading) return <div />;
        const { data } = hourly;
        return data.map((hour, i) => {
            const time = new Date(hour.time * 1000);
            const temp = calcTemp(parseFloat(hour.temperature), tempType);
            const feelslike = calcTemp(parseFloat(hour.apparentTemperature), tempType);
            const rainC = hour.precipProbability > 0.04 ? parseInt((hour.precipProbability) * 100) : 0;
            const { ampm, hours } = calcAmPm(time);
            const day = renderToday(time);
            return (
                <Table.Row key={`row${i}`}>
                    <Table.Cell>{day} {hours} {ampm}</Table.Cell>
                    <Table.Cell><span className={`hourly-temp ${hour.icon}`} />{hour.summary}</Table.Cell>
                    <Table.Cell>{temp.temp} {temp.deg}</Table.Cell>
                    <Table.Cell>{feelslike.temp} {feelslike.deg}</Table.Cell>
                    <Table.Cell>{rainC.toFixed(0)} %</Table.Cell>
                    <Table.Cell>{hour.uvIndex}</Table.Cell>
                </ Table.Row>
            )
        })
    }

    render() {
        const { hourly, loading, tempType } = this.props;
        if (!hourly || loading) return <div />;
        return (
            <Table celled className='hours-table'>
                {this.renderHeader()}
                <Table.Body>
                    {this.renderTableBody()}
                </Table.Body>

            </Table>
        )
    }
}