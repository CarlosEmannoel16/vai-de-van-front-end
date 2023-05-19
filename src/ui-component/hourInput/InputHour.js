import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerValue({ label }) {
    const [value, setValue] = React.useState();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker', 'TimePicker']}>
                <TimePicker style={{ width: '100%' }} label={label} value={value} onChange={(newValue) => setValue(newValue)} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
