import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from 'ui-component/cards/MainCard';

import { BodyListVehicles } from './bodyTableListVehicles';
export default function ListVehicles({ vehicles }) {
    return (
        <MainCard>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Placa</TableCell>
                            <TableCell align="left">Cor</TableCell>
                            <TableCell align="left">Capacidade máxima</TableCell>
                            <TableCell align="left">Última Atualizacao</TableCell>
                            <TableCell align="left">Editar</TableCell>
                            <TableCell align="left">Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.length ? vehicles.map((row, key) => <BodyListVehicles vehicle={row} key={key}></BodyListVehicles>) : ''}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}
