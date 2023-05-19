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
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.cnh}</TableCell>
                        <TableCell align="left">{row.cpf}</TableCell>

                        <TableCell align="left">
                            <Button variant="outlined" onClick={handleEdit} size="small">
                                Editar
                            </Button>
                        </TableCell>
                        <TableCell align="left">
                            <IconButton aria-label="delete" size="small">
                                <DeleteIcon htmlColor="red" fontSize="inherit" onClick={() => handleDelete()} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow style={{ backgroundColor: '#0000' }}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Veiculos deste motorista
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Modelo</TableCell>
                                                <TableCell>Marca</TableCell>
                                                <TableCell align="right">Acentos</TableCell>
                                                <TableCell align="right">status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history.map((historyRow) => (
                                                <TableRow key={historyRow.date}>
                                                    <TableCell component="th" scope="row">
                                                        {historyRow.date}
                                                    </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell align="right">{historyRow.amount}</TableCell>
                                                    <TableCell align="right">{historyRow.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
            </>
        );
    }

    function createData({ name, cpf, id, phone, email }) {
        return {
            name,
            cpf,
            id,
            phone,
            email,
            history: [
                {
                    date: 'Kombi',
                    customerId: 'Fiat',
                    amount: 12,
                    status: 'Ativo'
                }
            ]
        };
    }

    useEffect(() => {
        userService.getById(getUserIdLocal()).then((result) => {
            if (result.data.data.type === 'ADM')
                userService
                    .getAll()
                    .then((result) => {
                        const users = result.data.data;
                        const row2 = [];
                        if (users.length)
                            users.map((user) => {
                                console.log('==>', user);
                                const { cpf, email, name, phone, id } = user;
                                row2.push(createData({ name, cpf, id, phone, email }));
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
                            <TableCell />
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
