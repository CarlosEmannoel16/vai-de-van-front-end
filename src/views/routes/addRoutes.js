import { Grid, TextField, FormControl, FormHelperText, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SendIcon from '@mui/icons-material/Send';

const AddDrivers = () => {
    return (
        <MainCard title="Adicionar Novo Motorista">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <TextField id="Name" aria-describedby="name-helpr" fullWidth label="Nome Completo" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="Email" fullWidth label="Email" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container rowSpacing={3} paddingTop={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <TextField
                        type="date"
                        id=""
                        fullWidth
                        label="Nascimento"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="CPF" fullWidth label="CPF" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container paddingTop={3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <TextField id="Name" aria-describedby="name-helpr" fullWidth label="CNH" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="Email" fullWidth label="Email" variant="outlined" />
                </Grid>
            </Grid>

            <Grid container paddingTop={3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={10}></Grid>
                <Grid item xs={2} alignItems="right">
                    <Button fullWidth variant="contained" size="medium" color="primary" endIcon={<SendIcon />}>
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AddDrivers;
