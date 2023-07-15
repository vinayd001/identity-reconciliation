import { Response } from 'express';

export const sendContactResponse = (res: Response, primaryContactId: number, emails: string[], phoneNumbers: string[], secondaryContactIds: number[]) => {
    const contact = {
        primaryContactId,
        emails: emails,
        phoneNumbers: phoneNumbers,
        secondaryContactIds,
    };
    console.log('contact', contact);

    res.status(200).json({ contact });
};

export const sendErrorResponse = (res: Response) => {
    res.status(500).json({ error: 'Internal Server Error' });
};
