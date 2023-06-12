import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { userService } from 'services/driver';
import ActionAlerts from 'ui-component/AlertSucess/AlertSucess';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from 'ui-component/Loader';
import TimePickerValue from 'ui-component/hourInput/InputHour';
import MainCard from 'ui-component/cards/MainCard';
import { TimeLine } from 'components/timeline';

const AddRoutes = () => {
    const { idUser } = useParams();
    const [user, setUser] = useState();
    const [sucess, setSucess] = useState(false);
    const [isEdit, setIsEdit] = useState();

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    useEffect(() => {
        if (idUser) {
            userService.getById(idUser).then((result) => {
                setUser(result.data.data);
                setIsEdit(true);
            });
        } else {
            setIsEdit(true);
        }
    }, [idUser]);

    let initialValues = {
        email: idUser && user ? user.email : '',
        name: idUser && user ? user.name : '',
        cnh: idUser && user ? user.cnh : '',
        date_of_birth: idUser && user ? new Date(user.date_of_birth) : '',
        password: idUser && user ? user.password : '',
        phone: idUser && user ? user.phone : '',
        cpf: idUser && user ? user.cpf : ''
    };
    return (
        <>
            <MainCard>
                <h3>Adicionar Paradas</h3>
                {isEdit ? (
                    <>
                        {sucess ? <ActionAlerts message="Cadastro realizado com sucesso!" isOpen={true} /> : null}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={Yup.object().shape({
                                date_of_birth: Yup.date().required('Campo Obrigatório'),
                                cpf: Yup.string().required('CPF do motorista é obrigatório'),
                                name: Yup.string().required('Nome do motorista é obrigatório'),
                                cnh: Yup.string().required('CNH do motorista é obrigatório'),
                                km: Yup.string().required('Km é obrigatório'),
                                password: Yup.string().max(255).required('A senha é obrigatória')
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        const data = await userService.create(values);
                                        if (data) {
                                            setStatus({ success: true });
                                            setSucess(true);
                                            setSubmitting(false);
                                        }
                                        setSubmitting(true);
                                    }
                                } catch (err) {
                                    console.error();
                                    if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.response.data.message });
                                        setSubmitting(false);
                                    }
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                                        <FormControl fullWidth required sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-required-label">Origem</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={''}
                                                label="Age *"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Iguatu</MenuItem>
                                                <MenuItem value={20}>Cedro</MenuItem>
                                                <MenuItem value={30}>Acopiara</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth required sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-required-label">Destino</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={''}
                                                label="Age *"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Iguatu</MenuItem>
                                                <MenuItem value={20}>Cedro</MenuItem>
                                                <MenuItem value={30}>Acopiara</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div style={{ width: '99%', display: 'flex', margin: 'auto', justifyContent: 'left' }}>
                                        <FormControl
                                            style={{ marginRight: '1rem' }}
                                            error={Boolean(touched.email && errors.email)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <TimePickerValue style={{ width: '100%' }} label="Hora da Partida" />
                                        </FormControl>

                                        <FormControl
                                            style={{ marginRight: '1rem' }}
                                            error={Boolean(touched.email && errors.email)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <TimePickerValue label="Hora da chegada" />
                                        </FormControl>
                                        <FormControl
                                            error={Boolean(touched.email && errors.email)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                                sx={{ m: 1, minWidth: 120 }}
                                            >
                                                <InputLabel htmlFor="km-route">Distancia em km entre as duas cidades</InputLabel>
                                                <OutlinedInput
                                                    id="km-route"
                                                    type="km"
                                                    value={values.km}
                                                    name="km"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="km"
                                                    inputProps={{}}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="km-route">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </FormControl>
                                    </div>

                                    <FormControl fullWidth required sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-required-label">SubRota de: </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={''}
                                            label="Age *"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Cedro - Iguatu</MenuItem>
                                            <MenuItem value={20}>Crato - Juazeiro</MenuItem>
                                            <MenuItem value={30}>Iguatu - Icó</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                                        <Box sx={{ mt: 2 }}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    size="medium"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    {idUser ? 'Editar  Rota' : 'Cadastrar Rota'}
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </>
                ) : (
                    <Loader />
                )}
                <Divider />
                <h3>Adicionar Paradas</h3>
                <TimeLine total={300} subRoutes={[]} />
            </MainCard>
        </>
    );
};

export default AddRoutes;
