import DataStore from '@seald-io/nedb';
import { logger } from '../logger';

export interface DatabaseConfig {
  filename: string;
  autoload?: boolean;
}

type Document = Record<string, any>;

class Database {
  private db: DataStore;

  constructor(config: DatabaseConfig) {
    this.db = new DataStore({
      filename: config.filename,
      autoload: config.autoload ?? true,
      onload: (err: Error | null) => {
        if (err) {
          logger.error(`Database load error: ${err.message}`);
        } else {
          logger.info(`Database loaded: ${config.filename}`);
        }
      },
    });
  }

  // Insert
  async insert<T extends Document>(doc: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.insert(doc, (err: Error | null, newDoc: Document) => {
        if (err) reject(err);
        else resolve(newDoc as T);
      });
    });
  }

	// Find (returns array of matched items)
  async find<T extends Document>(query: Document): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.find(query, (err: Error | null, docs: Document[]) => {
        if (err) reject(err);
        else resolve(docs as T[]);
      });
    });
  }

	// Find one (returns only first match from array of matches or null)
  async findOne<T extends Document>(query: Document): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.db.findOne(query, (err: Error | null, doc: Document | null) => {
        if (err) reject(err);
        else resolve(doc as T | null);
      });
    });
  }

  // Update 
  async update(
    query: Document,
    update: Document,
    options: { multi?: boolean; upsert?: boolean } = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.update(query, update, options, (err: Error | null, numAffected: number) => {
        if (err) reject(err);
        else resolve(numAffected);
      });
    });
  }

  // Remove
  async remove(query: Document, options: { multi?: boolean } = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.remove(query, options, (err: Error | null, numRemoved: number) => {
        if (err) reject(err);
        else resolve(numRemoved);
      });
    });
  }
}

export { Database };
