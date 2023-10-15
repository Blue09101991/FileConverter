import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const BACKEND_BASE_URL = "http://135.148.26.44:5005";

export const config = {
    api: {
        bodyParser: false,
    },
};

interface BackendResponse {
    success: boolean;
    file_path?: string;
    downloadLink?: string;
    // ... any other fields you expect in the response ...
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const backendResponse = await fetch(`${BACKEND_BASE_URL}/convert/video`, {
            method: 'POST',
            headers: req.headers as any, // forward all headers
            body: req
        });

        const data = await backendResponse.json() as BackendResponse;

        if (data.success) {
            data.downloadLink = `${BACKEND_BASE_URL}${data.file_path}`;
        }

        res.status(backendResponse.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'There was an error processing your request.' });
    }
}
