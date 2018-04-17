import React from 'react'
import './index.scss'

const Header = ({ user, repoName }) => (
    <div className="header">
        <div className="headerInnerContainer">
            <h1 className="headerTitle">GitHub Issue Viewer</h1>
            <a 
                className="headerLink"
                href={`https://github.com/${user}/${repoName}`} 
                target="_blank"
            >
                {`https://github.com/${user}/${repoName}`}
            </a>
        </div>
    </div>
)

export default Header