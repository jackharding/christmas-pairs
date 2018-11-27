import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    max-width: 760px;
    margin: 0 auto;
    
    @media (max-width: 599px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;