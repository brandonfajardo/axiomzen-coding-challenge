import React from 'react'
import { Label } from '../../../components'
import _ from 'lodash'
import './index.scss'
import issueClosed from '../../../styles/icons/issue-closed.svg'
import pullRequest from '../../../styles/icons/pull-request.svg'

const Issue = ({ title, body, labels, state }) => {
    let icon = state === 'pr' ? pullRequest : state === 'closed' ? issueClosed : ''
    return (
        <div className="issueContainer">
            <img alt="" className="issueIcon" src={icon} />
            <p className="issueTitle">{title}</p>
            <div className="issueBottomContainer">
                <div className="issueBottomInnerContainer">
                    {body ? <p className="issueTextBody">{_.truncate(body, { length: 90 })}</p>
                    : <p className="issueTextBody noDescription">No description provided.</p>}
                </div>
                <div className="labelsContainer">
                    {labels.map((label, i) => <Label key={`label-${i}`} {...label} />)}
                </div>
            </div>
        </div>
    )
}


export default Issue