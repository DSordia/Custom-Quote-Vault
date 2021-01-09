import React from 'react'
import QuoteCategories from './QuoteCategories'

const Vault = props => {
    return <QuoteCategories userID={props.userID}
                            vaultID={props.vaultID}
                            closeVault={props.closeVault} />
}
  
export default Vault