import { Request, Response } from 'express';
import { createContact, editContactLinkprecedence, findContactByEmailOrPhoneNumber, findContactByIdOrLinkedId } from '../repositories/contact-repository';
import { linkPrecedence } from '../enums/contact-enums';
import { sendContactResponse, sendErrorResponse } from '../responses/contact-responses';
import { check } from 'express-validator';

export const identifyUser = async (req: Request, res: Response) => {
    try {
        const { email = null, phoneNumber = null } = req.body;

        let primaryContactId: number;
        let emails: string[] = [];
        let phoneNumbers: string[] = [];
        let secondaryContactIds: number[] = [];
        let primaryContact: any;
        let contacts: any;

        const existingContact = await findContactByEmailOrPhoneNumber(email, phoneNumber);
        console.log('existingContact', existingContact);

        if (!existingContact || existingContact.length == 0) {
            primaryContactId = await createContact(email, phoneNumber, linkPrecedence.primary);
            emails.push(email);
            phoneNumbers.push(phoneNumber);

            sendContactResponse(res, primaryContactId, emails, phoneNumbers, secondaryContactIds);
        }

        else if (existingContact[0].linkprecedence == linkPrecedence.primary) {
            console.log('existingContact[0].linkprecedence', existingContact[0].linkprecedence);
            primaryContact = existingContact[0];
            contacts = await findContactByIdOrLinkedId(primaryContact.id);
        }

        else {
            contacts = await findContactByIdOrLinkedId(existingContact[0].linkedid);
        }

        if (contacts) {
            console.log('contacts', contacts);

            for (const contact of contacts) {

                if (contact.linkprecedence == linkPrecedence.primary) {

                    // primary contact id
                    if (contact.linkedid == null) {
                        primaryContact = contact;
                    }

                    // if more than one primary contacts change the linkprecedence to secondary
                    else {
                        await editContactLinkprecedence(contact.id, linkPrecedence.secondary);
                    }
                }

                emails.push(contact.email);
                phoneNumbers.push(contact.phonenumber);
                if (contact.linkedid != null) {
                    secondaryContactIds.push(contact.id);
                }
            }
        }

        primaryContactId = primaryContact.id;


        // check if email or phone number already exists or not
        // if not then create a new contact
        const emailExistence = checkExistence(emails, email);
        const phoneNumberExistence = checkExistence(phoneNumbers, phoneNumber);

        if (!emailExistence || !phoneNumberExistence) {
            const id = await createContact(email, phoneNumber, linkPrecedence.secondary, primaryContactId);
            emails.push(email);
            phoneNumbers.push(phoneNumber);
            secondaryContactIds.push(id);
        }

        sendContactResponse(res, primaryContactId, emails, phoneNumbers, secondaryContactIds);
    }

    catch (error) {
        console.error(error);
        sendErrorResponse(res);
    }
};


const checkExistence = (arrayOfStrings: string[], singleString: string) => {

    if (singleString == null) {
        return true;
    } else if (arrayOfStrings.includes(singleString)) {
        return true;
    }

    return false;
}

