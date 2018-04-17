import React from 'react'
import { Label } from '../../../components'
import _ from 'lodash'
import './index.scss'

const Issue = ({ title, body, labels, state }) => (
    <div className="issueContainer">
        <p className="issueTitle">{title}</p>
        <div className="issueBottomContainer">
            <div className="issueBottomInnerContainer">
            <p className="issueTextBody">{_.truncate(body, { length: 90 })}</p>
            </div>
            <div className="labelsContainer">
                {labels.map(label => <Label {...label} />)}
            </div>
        </div>
    </div>
)

export default Issue