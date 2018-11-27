import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    
    @media (max-width: 599px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;