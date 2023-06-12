import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ActionAlerts from 'ui-component/AlertSucess/AlertSucess';
import { useParams } from 'react-router-dom';

import { serviceVehicles } from 'services/vehicle';
const FormVechicle = ({ updatedTable, updateFormVehicle }) => {
    const { idUser } = useParams();

    const [sucess, setSucess] = useState(false);
    const [isEdit, setIsEdit] = useState();

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    let initialValues = {
        amount_of_accents: '',
        plate: '',
        cor: '',
        with_air: true
    };

    return (
        <>
            {sucess ? <ActionAlerts message="Cadastro realizado com sucesso!" isOpen={true} /> : null}
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    amount_of_accents: Yup.number().required('Campo Obrigatório'),
                    plate: Yup.string().required('Campo Obrigatório'),
                    cor: Yup.string().required('Campo Obrigatório'),
                    with_air: Yup.boolean().required()
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            console.log('values=>', values);
                            const data = await serviceVehicles.create({ ...values, ownerId: idUser });
                            if (data) {
                                setStatus({ success: true });
                                setSucess(true);
                                setSubmitting(false);
                                updatedTable(true);
                                updateFormVehicle(false);
                            }
                            setSubmitting(true);
                        }
                    } catch (err) {
                        alert('0000');
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
                    <form
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
                                    <FormHelperText error id="escription-plate">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                style={{ width: '48%' }}
                                error={Boolean(touched.name && errors.name)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="amount_of_accents-vechicle">Quantida máxima de acentos*</InputLabel>
                                <OutlinedInput
                                    id="amount_of_accents-vechicle"
                                    type="number"
                                    value={values.amount_of_accents}
                                    name="amount_of_accents"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="amount_of_accents"
                                    inputProps={{}}
                                />
                                {touched.amount_of_accents && errors.amount_of_accents && (
                                    <FormHelperText error id="amount_of_accents-vechicle">
                                        {errors.amount_of_accents}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <FormControl
                                style={{ width: '48%' }}
                                error={Boolean(touched.cor && errors.cor)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="cor-vechicle">Cor*</InputLabel>
                                <OutlinedInput
                                    id="cor-vechicle"
                                    type="text"
                                    value={values.cor}
                                    name="cor"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="cor"
                                    inputProps={{}}
                                />
                                {touched.cor && errors.cor && (
                                    <FormHelperText error id="cor-vechicle">
                                        {errors.cor}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl style={{ width: '48%' }}>
                                <InputLabel id="demo-simple-select-label7">Possui ar-condicionado</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label7"
                                    id="demo-simple-select"
                                    value={values.with_air}
                                    label="with_air"
                                    onChange={handleChange}
                                    style={{ height: '80%', marginTop: '5px' }}
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
    );
};

export default FormVechicle;
