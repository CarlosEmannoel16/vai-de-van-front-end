import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function ActionAlerts({ message, isOpen = true }) {
    const [open, setOpen] = useState(isOpen);
    return open ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert
                action={
                    <Button color="inherit" size="small" onClick={() => setOpen(!open)}>
                        x
                    </Button>
                }
            >
                {message}
            </Alert>
        </Stack>
    ) : null;
}
