import {FETCH_VIDS, NEXT_TOKEN, CURR_QUERY} from '../actions/types'

const initialState = { items: [], nextToken: null }

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_VIDS:
            console.log(action)
            return {
                ...state,
                items: (!action.nextToken) ? action.payload : state.items.concat(action.payload)
            }

        case NEXT_TOKEN:
            return {
                ...state,
                nextToken: action.payload
            }

        case CURR_QUERY:
            return {
                ...state,
                currQuery: action.payload
            }
            
        default: 
            return state
    }
}