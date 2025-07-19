import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';
import { Contact, ContactFormData } from './types';

const DATABASE_NAME = 'contact_manager';
const COLLECTION_NAME = 'contacts';

export async function getContacts(): Promise<Contact[]> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const contacts = await collection
      .find({})
      .sort({ name: 1 })
      .toArray();
    
    return contacts.map(contact => ({
      ...contact,
      _id: contact._id.toString(),
    })) as Contact[];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Failed to fetch contacts');
  }
}

export async function getContactById(id: string): Promise<Contact | null> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const contact = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!contact) return null;
    
    return {
      ...contact,
      _id: contact._id.toString(),
    } as Contact;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw new Error('Failed to fetch contact');
  }
}

export async function createContact(contactData: ContactFormData): Promise<Contact> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const now = new Date();
    const newContact = {
      ...contactData,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await collection.insertOne(newContact);
    
    return {
      ...newContact,
      _id: result.insertedId.toString(),
    } as Contact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw new Error('Failed to create contact');
  }
}

export async function updateContact(id: string, contactData: ContactFormData): Promise<Contact> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const updateData = {
      ...contactData,
      updatedAt: new Date(),
    };
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      throw new Error('Contact not found');
    }
    
    return {
      ...result,
      _id: result._id.toString(),
    } as Contact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw new Error('Failed to update contact');
  }
}

export async function deleteContact(id: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    return result.deletedCount === 1;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw new Error('Failed to delete contact');
  }
}
