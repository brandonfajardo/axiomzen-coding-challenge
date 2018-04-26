import { 
    FIND_REPO,
    FIND_REPO_FAILURE,
    FIND_REPO_SUCCESS,
    CHANGE_ACTIVE_TAB,
    CLOSE_REPO
} from '../actions/types'

const initialState = {
    loading: false,
    error: null,
    user: null,
    repoName: null,
    currentPageNumber: 0,
    lastPageNumber: null,
    tabActive: 'allIssues',
    openIssues: [],
    closedIssues: [],
    prIssues: [],
    allIssues: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case FIND_REPO:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FIND_REPO_SUCCESS:
            const openIssues = [...state.openIssues, ...action.payload.data].filter(issue => {
                if (issue.state === 'open'){
                    return issue
                }
            })
            const closedIssues = [...state.closedIssues, ...action.payload.data].filter(issue => {
                if (issue.state === 'closed'){
                    return issue
                }
            })
            const prIssues = [...state.prIssues, ...action.payload.data].filter(issue => {
                if (issue.state === 'pr'){
                    return issue
                }
            })
            
            return {
                ...state,
                error: null,
                loading: false,
                user: action.payload.user,
                repoName: action.payload.repoName,
                allIssues: [...state.allIssues, ...action.payload.data],
                openIssues,
                closedIssues,
                prIssues,
                currentPageNumber: action.payload.currentPageNumber,
                lastPageNumber: action.payload.lastPageNumber,
            }
        case FIND_REPO_FAILURE: 
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CHANGE_ACTIVE_TAB:
            return {
                ...state,
                tabActive: action.payload
            }
        case CLOSE_REPO: 
            return initialState
        default:
            return state
    }
}