import { FETCH_VIDS, NEXT_TOKEN, CURR_QUERY } from './types'

export const fetchVids = (query, pageToken) => dispatch => {

    let urlToAppend = (pageToken === null) ? `https://www.googleapis.com/youtube/v3/search?key=AIzaSyA6PQ3-TKZmy24CR3BXIC-baS9X-W0N9_A&maxResults=25&part=snippet&q=${query}` : urlToAppend = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyA6PQ3-TKZmy24CR3BXIC-baS9X-W0N9_A&maxResults=25&part=snippet&q=${query}&pageToken=${pageToken}`

    let vidArr = []
    let nextToken = ''

    fetch(urlToAppend)
        .then((resp) => resp.json())
        .then((response) => {

            nextToken = response.nextPageToken

            console.log("Resp ", response)
            response.items.forEach(item => {
                if (item.id.kind !== 'youtube#channel') {
                    let obj = { id: item.id.videoId, snippet: item.snippet }
                    vidArr.push(obj)
                }
            });
        }).then(() => {
            dispatch({
                type: FETCH_VIDS,
                payload: vidArr,
                nextToken: (pageToken !== null) ? true : false,
            })
        }).then(() => {
            dispatch({
                type: NEXT_TOKEN,
                payload: nextToken
            })
        }).then(() => {
            dispatch({
                type: CURR_QUERY,
                payload: query
            })
        })

}

export const sortVids = (vidArr, type) => dispatch => {
    console.log("While Sorting Videos ", vidArr)
    console.log("While Sorting Type ", type)

    let dateArr = []

    vidArr.forEach(element => {
        let obj = { id: element.id, date: element.snippet.publishedAt, snippet: element.snippet }
        dateArr.push(obj)
    });

    switch (type) {
        case 'd-l-h':
            return dispatch({
                type: FETCH_VIDS,
                payload: dateArr.sort(function (a, b) {
                    let c = new Date(a.date);
                    let d = new Date(b.date);
                    return c - d;
                })
            })
        case 'd-h-l':
            return dispatch({
                type: FETCH_VIDS,
                payload: dateArr.sort(function (a, b) {
                    let c = new Date(a.date);
                    let d = new Date(b.date);
                    return d - c;
                })
            })

        case 'a-z':
            return dispatch({
                type: FETCH_VIDS,
                payload: vidArr.sort((a, b) => {
                    return a.snippet.title.toUpperCase().localeCompare(b.snippet.title.toUpperCase())
                })
            })

        case 'z-a':
            return dispatch({
                type: FETCH_VIDS,
                payload: vidArr.sort((a, b) => {
                    return b.snippet.title.toUpperCase().localeCompare(a.snippet.title.toUpperCase())
                })
            })

        default:
            console.log('default')
            break;
    }

}

