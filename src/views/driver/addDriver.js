import MainCard from 'ui-component/cards/MainCard';
import FormAddDriver from './form/formAdd';
import { useParams } from 'react-router';
import { userService } from 'services/driver';
import { useEffect } from 'react';
import { useState } from 'react';
const AddDrivers = () => {
    const { idUser } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        if (idUser) {
            setIsEdit(true);
            userService.getById(idUser).then((result) => {
                setUser(result.data.data);
            });
        }
    }, []);

    return (
        <MainCard title={!isEdit ? `Criar Novo Usuário` : `Editando ${user.name}`}>
            <FormAddDriver />
        </MainCard>
    );
};

export default AddDrivers;
