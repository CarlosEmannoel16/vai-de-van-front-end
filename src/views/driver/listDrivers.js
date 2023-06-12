import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { userService } from 'services/driver';
import { useState } from 'react';
import { Button } from '@mui/material';
import { getUserIdLocal } from 'helpers/localStorage';
import MainCard from 'ui-component/cards/MainCard';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { BodyTableDriver } from './driversTable/bodyTableDrivers';
export default function ListDrivers() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        userService.getById(getUserIdLocal()).then((result) => {
            if (result.data.data.type === 'ADM')
                userService
                    .getAll()
                    .then((result) => {
                        const users = result.data.data;
                        console.log('users', users);
                        const row2 = [];
                        if (users.length)
                            users.map((user) => {
                                console.log('==>', user);
                                const { cpf, email, name, phone, id } = user.User;
                                row2.push({ name, cnh: user.cnh, cpf, id, phone, email });
                            });
                        setRows(row2);
                    })
                    .catch((err) => console.log(err));
        });
    }, []);

    return (
        <MainCard title="Motoristas">
            <Stack spacing={2} direction="row">
                <Link to="/add-driver">
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Novo
                    </Button>
                </Link>
            </Stack>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">CNH</TableCell>
                            <TableCell align="left">CPF</TableCell>
                            <TableCell align="left">Editar</TableCell>
                            <TableCell align="left">Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length ? rows.map((row, key) => <BodyTableDriver row={row} key={key}></BodyTableDriver>) : ''}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}
