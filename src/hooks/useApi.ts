export const useApi = () => {

    const call = async <R, P = {}>(url: string, method: 'GET' | 'POST', body?: P) => {

        const commonData = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const reqData = body ? {
            ...commonData,
            body: JSON.stringify(body)
        } : commonData

        try {
            const res = await fetch("http://localhost:3000/" + url, reqData);

            if (res.ok) {
                const data: R = await res.json();
                return data;
            } else {
                const apiError = await res.text();
                throw new Error(apiError);
            }

        } catch (e) {
            throw new Error('Error occured!');
        }
    }

    const apiGet = async<R>(url: string) => {
        return await call<R>(url, 'GET');
    }

    const apiPost = async<R, P>(url: string, data: P) => {
        return await call<R, P>(url, 'POST', data);
    }

    return {
        apiGet,
        apiPost,
    }
}