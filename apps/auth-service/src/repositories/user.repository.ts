import { db } from "@/db";
import { type InsertUser, type User, users } from "@/db/schemas/users";
import { hashPassword } from "@/utils/password";
import { eq } from "drizzle-orm";

export class UserRepository {
	constructor(private readonly dbInstance = db) {}

	async getUserByEmail(email: string): Promise<User | undefined> {
		return this.dbInstance.query.users.findFirst({
			where: eq(users.email, email),
		});
	}

	async getUserById(id: string): Promise<User | undefined> {
		return this.dbInstance.query.users.findFirst({
			where: eq(users.id, id),
		});
	}

	async createUser(user: InsertUser, trx: typeof db = this.dbInstance) {
		const [newUser] = await trx
			.insert(users)
			.values({ ...user })
			.returning();

		return newUser;
	}

	async updateUserPassword(userId: string, password: string, trx: typeof db = this.dbInstance): Promise<void> {
		const hashedPassword = await hashPassword(password);
		await trx.update(users).set({ password: hashedPassword }).where(eq(users.id, userId));
	}
}

// Export a singleton instance for convenience
export const userRepository = new UserRepository();
