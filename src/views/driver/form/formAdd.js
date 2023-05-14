import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { userService } from 'services/driver';
import ActionAlerts from 'ui-component/AlertSucess/AlertSucess';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from 'ui-component/Loader';

const FormAddDriver = () => {
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
                            email: Yup.string().email('Email inválido').max(255).required('Email é obrigatório'),
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
                                <div>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="name-driver">Nome*</InputLabel>
                                        <OutlinedInput
                                            id="name-driver"
                                            type="text"
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Nome "
                                            inputProps={{}}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="name-driver">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.email && errors.email)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="email-driver">Email*</InputLabel>
                                        <OutlinedInput
                                            id="email-drive"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="email"
                                            inputProps={{}}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="email-driver">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.cnh && errors.cnh)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="cnh-driver">CNH*</InputLabel>
                                        <OutlinedInput
                                            id="cnh-driver"
                                            type="text"
                                            value={values.cnh}
                                            name="cnh"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="cnh"
                                            inputProps={{}}
                                        />
                                        {touched.cnh && errors.cnh && (
                                            <FormHelperText error id="cnh-driver">
                                                {errors.cnh}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.date_of_birth && errors.date_of_birth)}
                                        sx={{ ...theme.typography.customInput }}
                                        variant={'outlined'}
                                    >
                                        <InputLabel htmlFor="email-driver">Data de Nascimento*</InputLabel>
                                        <OutlinedInput
                                            id="email-drive"
                                            type="date"
                                            name="date_of_birth"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="date_of_birth"
                                            inputProps={{}}
                                        />
                                        {touched.date_of_birth && errors.date_of_birth && (
                                            <FormHelperText error id="email-driver">
                                                {errors.date_of_birth}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.password && errors.password)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="password-driver">Senha*</InputLabel>
                                        <OutlinedInput
                                            id="password-driver"
                                            type="text"
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="password"
                                            inputProps={{}}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="password-driver">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.phone && errors.phone)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="phone-driver">Telefone*</InputLabel>
                                        <OutlinedInput
                                            id="phone-driver"
                                            type="text"
                                            value={values.phone}
                                            name="phone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="phone"
                                            inputProps={{}}
                                        />
                                        {touched.phone && errors.phone && (
                                            <FormHelperText error id="phone-driver">
                                                {errors.phone}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.cpf && errors.cpf)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="password-driver">CPF*</InputLabel>
                                        <OutlinedInput
                                            id="password-driver"
                                            type="text"
                                            value={values.cpf}
                                            name="cpf"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="cpf"
                                            inputProps={{}}
                                        />
                                        {touched.cpf && errors.cpf && (
                                            <FormHelperText error id="password-driver">
                                                {errors.cpf}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
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
                                                {idUser ? 'Editar  Motorista' : 'Cadastrar Motorista'}
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
        </>
    );
};

export default FormAddDriver;
