import { APP_CONFIG } from "lib/config"
import styled from "styled-components"
import { useTranslations } from "lib/hooks/useTranslations"

type FooterProps = {
    lang: string
}

export const Footer: React.FunctionComponent<FooterProps> = ({
    lang
}) => {
    const T = useTranslations(lang)
    const year = new Date().getFullYear() //pobiera aktualny rok

    return(
        <FooterContainer>
            <CodemaskContainer>
                &copy; {year} {T.common.companyName}
            </CodemaskContainer>
            <LinkContainer>
                <Link href={APP_CONFIG.GITHUB_URL} target='_blank'>
                    {T.components.footer.github}
                </Link>
                <Link  href={APP_CONFIG.MODELS_URL}  target='_blank'>
                    {T.components.footer.models}
                </Link>
            </LinkContainer>
        </FooterContainer>
    )

}



const FooterContainer = styled.div`
  padding: 0 15px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 95%;
    z-index: 400;
    width: 100%;
`

const CodemaskContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    
`

const Link = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px
`