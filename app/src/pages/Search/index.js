import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findRepo } from '../../actions'
import './index.scss'

class Search extends Component {
    pasteUrl = e => {
        const splitUrl = e.nativeEvent.clipboardData.getData('text').split('/')
        const user = splitUrl[3]
        const repoName = splitUrl[4]

        this.props.findRepo(user, repoName, 1)
    }

    render() {
        const { loading, error } = this.props
        return (
            <div className="searchContainer">
                <div className="alignCenter">
                    <h1 className="searchTitle">Github Issue Viewer</h1>
                    <input
                        onKeyPress={e => e.preventDefault()}
                        onPaste={this.pasteUrl}
                        className="searchInput"
                        type="text"
                        placeholder="Paste a link to a GitHub repo" 
                    />
                    {loading && <p className="searchMessage">Loading GitHub issues...</p>}
                    {error && <p className="searchMessage">{error}</p>}
                </div>
            </div>
        )
    }
}

const mapState = ({ issue: { ...issue }}) => ({ ...issue })
const mapDispatch = { findRepo }

export default connect(mapState, mapDispatch)(Search)