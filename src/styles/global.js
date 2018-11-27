import { css } from 'styled-components';

export default css`
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans TC', sans-serif;
    }
`;