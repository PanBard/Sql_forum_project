import { en_US } from "lib/dictionary/app_common/en_GB" 
import { pl_PL } from "lib/dictionary/app_common/pl_PL"
export const useTranslations = (language: string) => {
    if(language=='PL')return pl_PL
    return en_US
}

// export const useTranslations = () => {
  
//     return pl_PL
// }