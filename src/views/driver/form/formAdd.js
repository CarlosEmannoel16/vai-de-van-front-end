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
    OutlinedInput,
    Tooltip
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { userService } from 'services/driver';
import ActionAlerts from 'ui-component/AlertSucess/AlertSucess';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from 'ui-component/Loader';
import FormVechicle from './formAddVehicle';
import ListVehicles from '../vehicles/listVehicles';
const FormAddDriver = () => {
    const { idUser } = useParams();
    const [user, setUser] = useState();
    const [sucess, setSucess] = useState(false);
    const [isEdit, setIsEdit] = useState();
    const [vechicleForm, setVechicleForm] = useState(false);
    const [updatedTableVehicle, setUpdatedTableVechicle] = useState(false);

    const [vehicle, setVehicle] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    useEffect(() => {
        if (idUser) {
            userService.getById(idUser).then((result) => {
                console.log('User=>', result.data.data);
                setUser(result.data.data);
                setVehicle(result.data.data.Vehicle);
                setIsEdit(true);
            });
        } else {
            setIsEdit(true);
        }
    }, [idUser, updatedTableVehicle]);

    useEffect(() => {
        if (sucess) {
            setTimeout(() => {
                navigate('/drivers');
            }, 900);
        }
    }, [sucess]);

    let initialValues = {
        id: idUser && user ? idUser : '',
        type: idUser && user ? user.type : '',
        email: idUser && user ? user.email : '',
        name: idUser && user ? user.name : '',
        cnh: idUser && user ? user.Driver[0].cnh : '',
        date_of_birth: idUser && user ? moment(new Date(user.date_of_birth)).format('yyyy-MM-DD') : moment(new Date()).format('yyyy-MM-DD'),
        password: idUser && user ? user.password : '',
        phone: idUser && user ? user.phone : '',
        cpf: idUser && user ? user.cpf : '',
        cnhExpirationDate:
            idUser && user
                ? moment(new Date(user.Driver[0].cnhExpirationDate)).format('yyyy-MM-DD')
                : moment(new Date()).format('yyyy-MM-DD'),

        cnhDateOfIssue:
            idUser && user ? moment(new Date(user.Driver[0].cnhDateOfIssue)).format('yyyy-MM-DD') : moment(new Date()).format('yyyy-MM-DD')
    };
    console.log(initialValues);
    return (
        <>
            {isEdit ? (
                <>
                    {sucess ? (
                        <ActionAlerts message={`${!idUser ? 'Cadastrado Realizado' : 'Atualizacao Efetuada'}`} isOpen={true} />
                    ) : null}
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
                                    let data;
                                    if (!idUser) {
                                        let valuesData = values;
                                        delete valuesData.id;
                                        data = await userService.create(valuesData);
                                    } else {
                                        data = await userService.update(values);
                                    }

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
                                <h3>Dados da Conta</h3>
                                <Divider />
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
                                <h3>Documentos</h3>
                                <Divider />
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl
                                        style={{ width: '30%' }}
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
                                    <FormControl
                                        style={{ width: '30%' }}
                                        error={Boolean(touched.date_of_birth && errors.date_of_birth)}
                                        sx={{ ...theme.typography.customInput }}
                                        variant={'outlined'}
                                    >
                                        <InputLabel htmlFor="cnhDateOfIssue-drive">Data de Emsissao*</InputLabel>
                                        <OutlinedInput
                                            id="cnhDateOfIssue-drive"
                                            type="date"
                                            name="date_of_birth"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="cnhDateOfIssue-drive"
                                            value={values.cnhDateOfIssue}
                                            defaultValue={values.cnhDateOfIssue}
                                        />
                                        {touched.date_of_birth && errors.date_of_birth && (
                                            <FormHelperText error id="cnhDateOfIssue-drive">
                                                {errors.date_of_birth}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '30%' }}
                                        error={Boolean(touched.cnhExpirationDate && errors.cnhExpirationDate)}
                                        sx={{ ...theme.typography.customInput }}
                                        variant={'outlined'}
                                    >
                                        <InputLabel htmlFor="cnhDateOfIssue-drive">Data de Expiracao*</InputLabel>
                                        <OutlinedInput
                                            id="cnhDateOfIssue-drive"
                                            type="date"
                                            name="date_of_birth"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="cnhDateOfIssue"
                                            value={values.cnhExpirationDate}
                                            defaultValue={values.cnhExpirationDate}
                                        />
                                        {touched.cnhExpirationDate && errors.cnhExpirationDate && (
                                            <FormHelperText error id="cnhDateOfIssue-drive">
                                                {errors.date_of_birth}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl
                                        style={{ width: '30%' }}
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
                                            value={values.date_of_birth}
                                        />
                                        {touched.date_of_birth && errors.date_of_birth && (
                                            <FormHelperText error id="email-driver">
                                                {errors.date_of_birth}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '30%' }}
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
                                    <FormControl
                                        style={{ width: '30%' }}
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
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}></div>
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
                                                {idUser ? 'Editar  Usuário' : 'Cadastrar Usuário'}
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </div>
                            </form>
                        )}
                    </Formik>
                    {idUser ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3>Veiculos</h3>
                            <Divider />
                            <Tooltip title="Adicionar um novo veiculo">
                                <Button
                                    onClick={() => {
                                        setVechicleForm(true);
                                    }}
                                >
                                    Novo Veiculo
                                </Button>
                            </Tooltip>
                            {vechicleForm ? (
                                <FormVechicle updatedTable={setUpdatedTableVechicle} updateFormVehicle={setVechicleForm} />
                            ) : (
                                ''
                            )}
                            {vehicle.length > 0 ? <ListVehicles vehicles={vehicle} /> : 'Este Usuário nao possui nenhum veiculo'}
                        </div>
                    ) : (
                        ''
                    )}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default FormAddDriver;
