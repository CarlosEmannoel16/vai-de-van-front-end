import { useState } from 'react';
import { userService } from 'services/driver';
import ConfirmModal from 'ui-component/modal/ConfirmModal';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import React from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
const { useEffect } = require('react');
import DeleteIcon from '@mui/icons-material/Delete';

export function BodyTableDriver({ row }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [openModalDelete, serOpenModalDelete] = useState(false);

    const navigate = useNavigate();
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
