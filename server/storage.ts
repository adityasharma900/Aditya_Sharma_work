import { type User, type InsertUser, type InsertContact, type ContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
}

// In-memory storage for development/temporary use
// Contact submissions and users are stored in memory and will be cleared on server restart
class InMemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private usersByUsername: Map<string, User> = new Map();
  private contactSubmissions: Map<string, ContactSubmission> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.usersByUsername.get(username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.set(id, user);
    this.usersByUsername.set(insertUser.username, user);
    return user;
  }

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    
    // Log to console for visibility
    console.log("📬 New contact submission received:");
    console.log(`  Name: ${submission.name}`);
    console.log(`  Email: ${submission.email}`);
    console.log(`  Subject: ${submission.subject}`);
    console.log(`  Message: ${submission.message}`);
    console.log(`  Submitted at: ${submission.createdAt.toISOString()}`);
    
    return submission;
  }

  // Helper method to get all contact submissions (for debugging)
  getAllContactSubmissions(): ContactSubmission[] {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new InMemoryStorage();
