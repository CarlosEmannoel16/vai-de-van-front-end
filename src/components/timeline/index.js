import { Button } from '@mui/material';
import { TimelineWrapper } from './styled';
import { useState } from 'react';

export const TimeLine = ({ subRoutes, total }) => {
    const [de, setDe] = useState();

    const [routes, setRoutes] = useState(subRoutes);

    return (
        <>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
                {routes.map((data, index) => (
                    <>
                        <TimelineWrapper
                            id={index}
                            nameCity={data.destino}
                            onDragStart={(e) => {
                                setDe(e.target.id);
                            }}
                            draggable={true}
                            onClick={() => {
                                alert(index);
                            }}
                            color={data.color}
                            persent={((data.km / total) * 100).toFixed(2)}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                            onDrop={(e) => {
                                let routesAux = [...routes];
                                let dataDe = routes[de];
                                console.log('De', dataDe);
                                let dataPara = routes[e.target.id];
                                console.log('Para', dataPara);

                                routesAux[de] = dataPara;
                                routesAux[e.target.id] = dataDe;

                                console.log(routesAux);

                                setRoutes(routesAux);
                            }}
                        ></TimelineWrapper>
                    </>
                ))}
            </div>
        </>
    );
};
