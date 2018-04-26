import React, { Component } from 'react'
import { connect } from 'react-redux'
import Issue from './Issue'
import { Container, Row, Col } from 'react-grid-system'
import _ from 'lodash'
import { 
    findRepo,
    closeRepo,
    changeActiveTab,
} from '../../actions'
import { Header } from '../../components'
import closeIcon from '../../styles/icons/close.svg'
import './index.scss'

class IssuesList extends Component {
    componentWillMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        const { findRepo, currentPageNumber, lastPageNumber, repoName, user, allIssues, loading, error } = this.props
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50) && allIssues.length && !loading && !error && currentPageNumber <= lastPageNumber) {
            findRepo(user, repoName, currentPageNumber + 1)
        }
    }
    
    render() {
        const { 
            allIssues, 
            loading, 
            tabActive, 
            changeActiveTab, 
            openIssues, 
            closedIssues, 
            prIssues, 
            closeRepo, 
            repoName, 
            user 
        } = this.props

        let listToRender
        if (tabActive === 'openIssues'){
            listToRender = openIssues
        } else if (tabActive === 'closedIssues'){
            listToRender = closedIssues
        } else if (tabActive === 'prIssues'){
            listToRender = prIssues
        } else if (tabActive === 'allIssues'){
            listToRender = allIssues
        }

        const issues = _.chunk(listToRender, 3)
        return (
            <div>
                <Header user={user} repoName={repoName} />
                <Container>
                    <div className="tabContainer">
                        <div className="tabContainerSpace">
                            <div className="tabContainerRow">
                                <p onClick={() => changeActiveTab('allIssues')} className={tabActive === 'allIssues' ? 'tabActive' : 'tabInactive'}>All Issues</p>
                                <p onClick={() => changeActiveTab('openIssues')} className={tabActive === 'openIssues' ? 'tabActive' : 'tabInactive'}>Open Issues</p>
                                <p onClick={() => changeActiveTab('closedIssues')} className={tabActive === 'closedIssues' ? 'tabActive' : 'tabInactive'}>Closed Issues</p>
                                <p onClick={() => changeActiveTab('prIssues')} className={tabActive === 'prIssues' ? 'tabActive' : 'tabInactive'}>Pull Requests</p>
                            </div>
                            <img alt="" src={closeIcon} onClick={() => closeRepo()} className="close" />
                        </div>
                    </div>
                    
                    {issues && issues.map((issueArr, i) => (
                        <Row key={`issueArray-${i}`}>
                            {issueArr.map((issue, i) => (
                                <Col key={`issue-${i}`} lg={4}>
                                    <Issue {...issue} />
                                </Col>
                            ))}
                        </Row>
                    ))}
                    {loading && <p className="loading">Loading...</p>}
                </Container>
            </div>
        )
    }
}

const mapState = ({ issue: { ...issue  }}) => ({ ...issue })
const mapDispatch = { findRepo, changeActiveTab, closeRepo }
export default connect(mapState, mapDispatch)(IssuesList)