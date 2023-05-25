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
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TimeLine } from 'components/timeline';
function createData(name, status) {
    return {
        name,
        status,
        history: [
            {
                destino: 'Iguatu',
                km: 15,
                color: 'yellow',
                status: 'Ativo'
            },
            {
                destino: 'Gadelha',
                km: 25,
                color: 'green',
                status: 'Ativo'
            },
            {
                destino: 'Umarizeira',
                km: 4,
                color: 'black',
                status: 'Ativo'
            },
            {
                destino: 'Caipu',
                km: 19,
                color: 'pink',
                status: 'Ativo'
            }
        ]
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    let totalKms = 0;
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
                                        <>
                                            {(totalKms += historyRow.km)}
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.origem}
                                                </TableCell>
                                                <TableCell align="right">{historyRow.km}</TableCell>
                                                <TableCell align="right">{historyRow.status}</TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                            <TimeLine subRoutes={row.history} total={totalKms} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Cedro - Iguatu', 'Ativa'),
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

export default function ListRoutes() {
    return (
        <MainCard title="Rotas">
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
                            <TableCell>Origem/Destino</TableCell>
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
