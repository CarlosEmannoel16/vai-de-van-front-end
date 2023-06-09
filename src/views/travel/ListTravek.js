import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MainCard from 'ui-component/cards/MainCard';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
function createData(name, status) {
    return {
        name,
        status,
        history: [
            {
                origem: 'Cedro',
                destino: 'Cascudo',
                km: '14km',
                status: 'Ativo'
            },
            {
                origem: 'Cedro',
                destino: 'Cascudo',
                km: '14km',
                status: 'Ativo'
            },
            {
                origem: 'Cedro',
                destino: 'Cascudo',
                km: '14km',
                status: 'Ativo'
            }
        ]
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.status}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sobrotas
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Origem</TableCell>
                                        <TableCell>Destino</TableCell>
                                        <TableCell align="right">Km</TableCell>
                                        <TableCell align="right">status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.origem}
                                            </TableCell>
                                            <TableCell>{historyRow.destino}</TableCell>
                                            <TableCell align="right">{historyRow.km}</TableCell>
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
    );
}

const rows = [
    createData('', 'Cedro - Iguatu', '123', 'Ativa'),
    createData('Iguatu - Acopiara', 'Ativa'),
    createData('Iguatu - Acopiara', 'Ativa'),
    createData('Iguatu - Acopiara', 'Ativa'),
    createData('Iguatu - Acopiara', 'Ativa'),
    createData('Iguatu - Acopiara', 'Ativa'),
    createData('Cedro - Iguatu', 'Ativa'),
    createData('Cedro - Iguatu', 'Ativa'),
    createData('Cedro - Iguatu', 'Ativa'),
    createData('Cedro - Iguatu', 'Ativa')
];

export default function ListTravels() {
    return (
        <MainCard title="Viagens">
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
                            <TableCell></TableCell>
                            <TableCell>Origem/Destino</TableCell>
                            <TableCell>Km</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}
