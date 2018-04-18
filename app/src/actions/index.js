import {
    FIND_REPO, 
    FIND_REPO_SUCCESS, 
    FIND_REPO_FAILURE,
    CHANGE_ACTIVE_TAB,
    CLOSE_REPO
} from './types'
import history from '../history'
import axios from 'axios'
import { getLastPageNumber } from '../util'

export const findRepo = (user, repoName, currentPageNumber) => dispatch => {
    
    dispatch({ type: FIND_REPO })
    
    axios.get(`https://api.github.com/repos/${user}/${repoName}/issues?page=${currentPageNumber}&state=all`)
        .then(({ data, headers }) => {
            const lastPageNumber = getLastPageNumber(headers)

            return {
                lastPageNumber,
                data
            }
        })
        .then(repo => {
            const { data, lastPageNumber } = repo
            if (data.length){
                setTimeout(() => { // Responding too quickly so I added 1s of delay
                    dispatch(({ 
                        type: FIND_REPO_SUCCESS,
                        payload: { data, user, repoName, currentPageNumber, lastPageNumber }
                    }))
                    history.push('/issues')
                }, 1000)
            }
        })
        .catch((e) => {
            dispatch({ type: FIND_REPO_FAILURE, payload: 'The following repo does not have any issues or there was an error in your request.' })
        })
}

export const closeRepo = () => dispatch => {
    dispatch({ type: CLOSE_REPO })
    history.push('/')
}

export const changeActiveTab = tab => ({ type: CHANGE_ACTIVE_TAB, payload: tab })
