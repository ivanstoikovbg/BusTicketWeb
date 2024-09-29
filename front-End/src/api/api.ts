const host = 'http://localhost:3000/api/v1';
interface RequestOptions {
    method: string;
    headers: {
        'Access-Control-Allow-Origin': string;
        'auth_token': string;
        'content-type'?: string;
        'x-authorization'?: string;
        // change here
    };
    body?: string;
}

const request = async (
    method: string,
    url: string,
    data?: any
): Promise<any> => {
    const options: RequestOptions = {
        method,
        headers: {
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Origin': '',
            'auth_token': '358a48db-3df8-4479-a4e2-3bd2e435fa45',
        },
    };

    if (data) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // auth token here

    // if (localStorage["x-authorization"]) { // auth token
    //     const token = localStorage["x-authorization"];
    //     options.headers['x-authorization'] = token;
    // }

    try {
        const res = await fetch(host + url, options);
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.message);
        }

        // if (res.status === 401) {
        //     localStorage.removeItem('access_info');
        // }

        return responseData;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const patch = request.bind(null, 'PATCH');
const del = request.bind(null, 'DELETE');

export { get, post, put, patch, del };
