import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ConfirmModal from 'ui-component/modal/ConfirmModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function BodyListVehicles({ vehicle }) {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleDelete = (id) => {
        setOpenModalDelete(true);
    };
    const handleEdit = (id) => {
        setOpenModalDelete(true);
    };

    useEffect(() => {
        console.log('==> Veiculo', vehicle);
        if (confirmDelete) {
        }
    }, []);

    return (
        <>
            {
                <ConfirmModal
                    setOpen={setOpenModalDelete}
                    title={`Voce realmente deseja excluir este veiculo?`}
                    open={openModalDelete}
                    setSubmitDelete={setConfirmDelete}
                />
            }
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell align="left">{vehicle.plate}</TableCell>
                    <TableCell align="left">{vehicle.cor}</TableCell>
                    <TableCell align="left">{vehicle.amount_of_accents}</TableCell>
                    <TableCell align="left">{vehicle.update_at}</TableCell>

                    <TableCell align="left">
                        <IconButton variant="outlined" onClick={handleEdit} size="small">
                            <EditIcon />
                        </IconButton>
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
