import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from 'react';
import { userService } from 'services/driver';
import { useState } from 'react';
import { Button } from '@mui/material';
import { getUserIdLocal } from 'helpers/localStorage';
import ConfirmModal from 'ui-component/modal/ConfirmModal';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

import AddIcon from '@mui/icons-material/Add';
export default function ListDrivers() {
    const [rows, setRows] = useState([]);
    const [openModalDelete, serOpenModalDelete] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();
    function Row({ row }) {
        const [open, setOpen] = useState(false);
        const handleDelete = (id) => {
            serOpenModalDelete(true);
        };

        useEffect(() => {
            if (confirmDelete) {
                userService
                    .deleteById(row.id)
                    .then(() => {
                        serOpenModalDelete(false);
                    })
                    .catch(() => {});
            }
        }, []);

        const handleEdit = () => {
            navigate(`/add-driver/${row.id}`);
        };

        return (
            <>
                {
                    <ConfirmModal
                        setOpen={serOpenModalDelete}
                        title={`Voce realmente deseja excluir o motorista ${row.name}?`}
                        open={openModalDelete}
                        setSubmitDelete={setConfirmDelete}
                    />
                }
                <React.Fragment>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.cnh}</TableCell>
                        <TableCell align="left">{row.cpf}</TableCell>

                        <TableCell align="left">
                            <Button variant="outlined" onClick={handleEdit} size="small">
                                <SettingsIcon />
                            </Button>
                        </TableCell>
                        <TableCell align="left">
                            <IconButton aria-label="delete" size="small">
                                <DeleteIcon htmlColor="red" fontSize="inherit" onClick={() => handleDelete()} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
            </>
        );
    }

    function createData({ name, cnh, cpf, id, phone, email }) {
        return {
            name,
            cpf,
            id,
            cnh,
            phone,
            email
        };
    }

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
                                row2.push(createData({ name, cnh: user.cnh, cpf, id, phone, email }));
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
                    <TableBody>{rows.length ? rows.map((row, key) => <Row row={row} key={key}></Row>) : ''}</TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}
