interface HttpGetArgs {
    url: string,
    detailResponse?: boolean,
    onSuccess: (json: any) => void,
    onError?: (error: any) => void,
    doFinally?: () => void
}


export const httpGet = ({ url, onSuccess, onError, doFinally, detailResponse = false }: HttpGetArgs) => {
    fetch(url, { method: 'GET' })
    .then(response => {
        if (detailResponse) {
            return response.json().then(result => {
                return {
                    json: result,
                    ok: response.ok,
                    status: response.status
                }
            })
        } else {
            return response.json()
        }
    })
    .then(json => {
        onSuccess(json)
    })
    .catch(e => {
        if (onError) onError(e)
    })
    .finally(() => {
        if (doFinally) doFinally()
    })
}

// post 

interface HttpPostArgs {
    url: string,
    detailResponse?: boolean,
    body: any,
    onSuccess: (json: any) => void,
    onError?: (error: any) => void,
    doFinally?: () => void
}

export const httpPost = ({ url, body, onSuccess, onError, doFinally, detailResponse = false }: HttpPostArgs) => {
    const stringifiedJson = JSON.stringify(body)
    fetch(url, { method: 'post', body: stringifiedJson })
        .then(response => {
            if (detailResponse) {
                return response.json().then(result => {
                    return {
                        json: result,
                        ok: response.ok,
                        status: response.status
                    }
                })
            } else {
                return response.json()
            }
        }).then(json => {
            onSuccess(json)
        }).catch(e => {
            if (onError) onError(e)
        }).finally(() => {
            if (doFinally) doFinally()
        })
}

// delete
interface HttpDeleteArgs { url: string, detailResponse?: boolean, body?: any, onSuccess: (json?: any) => void, onError?: (error: any) => void, doFinally?: () => void }

export const httpDelete = ({ url, onSuccess, onError, doFinally, detailResponse = false }: HttpDeleteArgs) => {
    return fetch(url, { method: 'DELETE' }).then(response => {
        if (detailResponse) {
            return response.json().then(result => {
                return {
                    json: result,
                    ok: response.ok,
                    status: response.status
                }
            })
        } else {
            return null
        }
    }).then(json => {
        onSuccess(json)
    }).catch(e => {
        if (onError) onError(e)
    }).finally(() => {
        if (doFinally) doFinally()
    })
}