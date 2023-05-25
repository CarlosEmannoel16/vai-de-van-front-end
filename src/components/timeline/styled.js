import { styled } from 'styled-components';

export const TimelineWrapper = styled.div`
    transition: 0.3s;
    width: ${({ persent }) => (persent ? `${persent}%` : '100%')};
    height: 10px;
    background-color: ${({ color }) => color};
    position: relative;

    &::after {
        background-image: url('https://cdn-icons-png.flaticon.com/512/2775/2775994.png');
        background-size: 100% 100%;
        color: #000;
        text-align: center;
        position: absolute;
        height: 25px;
        margin-top: -20px;
        padding-left: 30px;
        width: 25px;
        border-radius: 25px;
        content: ${({ nameCity }) => `"${nameCity}"`};
    }
`;
