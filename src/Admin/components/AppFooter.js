import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://muhammadrifat.xyz" target="_blank" rel="noopener noreferrer">
          Muhammad Rifat
        </a>
        <span className="ms-1">&copy; 2022 Muhammad Rifat.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
