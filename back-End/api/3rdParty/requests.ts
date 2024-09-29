import * as api from './api';

export const endpoints = {
    qr_code: '/get_qr_code',
    check_qr_code: '/qr_code',
};

const auth_token = '358a48db-3df8-4479-a4e2-3bd2e435fa45';


export const getQRCode = async () => {
    return api.post(endpoints.qr_code, { auth_token });
};

export const checkQRCode = async (qr_code: string) => {
    console.log(qr_code);

    return api.post(endpoints.qr_code, { auth_token, qr_code });
};
