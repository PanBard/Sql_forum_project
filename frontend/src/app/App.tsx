import React from "react"
import styled, {ThemeProvider} from "styled-components"
import {myTheme} from "lib/styles"
import { OneRouter } from "lib/components/OneRouter"
import 'regenerator-runtime/runtime'
export const App = () => {

    return(
       <ThemeProvider theme={ myTheme }>
            <MojDIV>
                <OneRouter/>
            </MojDIV>
       </ThemeProvider>
    )
}     

const MojDIV = styled.div`
    /* width: 100%;
    height: 100vh; */
    background-color: ${ ({theme}) => theme.colors.background };
    color: ${({theme}) => theme.colors.typography};
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
`


