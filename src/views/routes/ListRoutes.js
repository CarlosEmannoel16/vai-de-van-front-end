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
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from 'ui-component/cards/MainCard';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TimeLine } from 'components/timeline';
import EditIcon from '@mui/icons-material/Edit';
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
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.status}
                </TableCell>
                <TableCell align="left">
                    <IconButton variant="outlined" onClick={() => {}} size="small">
                        <EditIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon htmlColor="red" fontSize="inherit" onClick={() => {}} />
                    </IconButton>
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
                <Link to="/create-routes">
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Novo
                    </Button>
                </Link>
            </Stack>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Origem</TableCell>
                            <TableCell>Destino</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
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
