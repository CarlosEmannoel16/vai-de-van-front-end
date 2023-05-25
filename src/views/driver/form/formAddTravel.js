import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
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
    Select,
    Tooltip
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
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
const FormVechicle = () => {
    const { idUser } = useParams();
    const [user, setUser] = useState();
    const [sucess, setSucess] = useState(false);
    const [isEdit, setIsEdit] = useState();

    const [travels, setTravels] = useState([]);
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    useEffect(() => {
        if (idUser) {
            userService.getById(idUser).then((result) => {
                console.log('User=>', result.data.data);
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
        cnh: idUser && user ? user.Driver[0].cnh : '',
        date_of_birth: idUser && user ? moment(new Date(user.date_of_birth)).format('yyyy-MM-dd') : moment(new Date()).format('yyyy-MM-dd'),
        password: idUser && user ? user.password : '',
        phone: idUser && user ? user.phone : '',
        cpf: idUser && user ? user.cpf : ''
    };
    console.log(initialValues);
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
                                        <InputLabel htmlFor="description-vechicle">Descricao*</InputLabel>
                                        <OutlinedInput
                                            id="description-vechicle"
                                            type="text"
                                            value={values.description}
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="dexcription"
                                            inputProps={{}}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="escription-vechicle">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.modelVechicle && errors.modelVechicle)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="model-vechicle">Modelo*</InputLabel>
                                        <OutlinedInput
                                            id="model-vechicle"
                                            type="model-vechicle"
                                            value={values.modelVechicle}
                                            name="model-vechicle"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="model-vechicle"
                                            inputProps={{}}
                                        />
                                        {touched.modelVechicle && errors.modelVechicle && (
                                            <FormHelperText error id="model-vechicle">
                                                {errors.modelVechicle}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '48%' }}
                                        error={Boolean(touched.plate && errors.plate)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="plate-vechicle">Placa*</InputLabel>
                                        <OutlinedInput
                                            id="plate-vechicle"
                                            type="text"
                                            value={values.plate}
                                            name="plate"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="plate"
                                            inputProps={{}}
                                        />
                                        {touched.plate && errors.plate && (
                                            <FormHelperText error id="plate-vechicle">
                                                {errors.plate}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl
                                        style={{ width: '30%' }}
                                        error={Boolean(touched.color && errors.color)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="color-vechicle">Cor*</InputLabel>
                                        <OutlinedInput
                                            id="color-vechicle"
                                            type="text"
                                            value={values.color}
                                            name="color"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="color"
                                            inputProps={{}}
                                        />
                                        {touched.color && errors.color && (
                                            <FormHelperText error id="color-vechicle">
                                                {errors.color}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl style={{ width: '30%' }} sx={{ ...theme.typography.customInput }}>
                                        <InputLabel id="demo-simple-select-label">Possui Ar-condicionado</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.with_air}
                                            label="Age"
                                            onChange={handleChange}
                                            defaultValue={'Sim'}
                                        >
                                            <MenuItem value={true}>Sim</MenuItem>
                                            <MenuItem value={false}>Nao</MenuItem>
                                        </Select>
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
                                                {'Adicionar Veiculo'}
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

export default FormVechicle;
