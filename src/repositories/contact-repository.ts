import databaseConnection from '../configs/pg-config';

export const findContactByIdOrLinkedId = async (id: number) => {
    const query = 'SELECT id, linkprecedence, email, phoneNumber, linkedid FROM contact WHERE id = $1 OR linkedid = $1';
    const result = await databaseConnection.query(query, [id]);
    return result.rows;
};

export const findContactByEmailOrPhoneNumber = async (email: string, phoneNumber: string) => {
    const query = 'SELECT id, linkprecedence, email, phoneNumber, linkedid FROM contact WHERE email = $1 OR phonenumber = $2 order by id asc limit 1';
    const result = await databaseConnection.query(query, [email, phoneNumber]);
    return result.rows;
};

export const editContactLinkprecedence = async (id: number, linkPrecedence: string) => {
    const query = 'UPDATE contact SET linkPrecedence = $1 WHERE id = $2 RETURNING *';
    const result = await databaseConnection.query(query, [linkPrecedence, id]);
    return result.rows[0];
};

export const createContact = async (email: string, phoneNumber: string, linkPrecedence: string, linkedId?: number) => {
    const query =
        'INSERT INTO contact (email, phonenumber, linkedid, linkprecedence, createdat, updatedat) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id';
    const result = await databaseConnection.query(query, [email, phoneNumber, linkedId, linkPrecedence]);
    return result.rows[0].id;
};
