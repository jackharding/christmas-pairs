import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    max-width: 760px;
    margin: 0 auto;
    
    >div {
        z-index: 1;
        
        &:nth-of-type(n+5) {
            z-index: 2;
        }
        
        &:nth-of-type(n+9) {
            z-index: 3;
        }
        
        &:nth-of-type(n+13) {
            z-index: 4;
        }
    }
    
    //@media (max-width: 599px) {
    //    grid-template-columns: repeat(2, 1fr);
    //}
`;