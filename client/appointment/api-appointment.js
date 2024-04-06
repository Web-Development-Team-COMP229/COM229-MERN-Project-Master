const create = async (appointment, credentials) => {
    try {
        console.log(credentials.t)
        console.log(appointment);
        let response = await fetch('/api/appointment/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(appointment)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const list = async (signal, credentials) => {
    try {
        let response = await fetch('/api/appointment/?userId=' + credentials.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const read = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/appointment/' + params.appointmentid, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const update = async (params, credentials, appointment) => {
    try {
        let response = await fetch('/api/appointment/' + params.appointmentid, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(appointment)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const remove = async (params, credentials) => {
    try {
        
        let response = await fetch('/api/appointment/' + params.deleted, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
export { create, list, read, update, remove }
