import { db } from "@streeio-core/db";
import { todo } from "@streeio-core/db/schema/todo";
import type {
  TodoCreateInput,
  TodoToggleInput,
} from "@streeio-core/schemas/todo";
import { eq } from "drizzle-orm";

export const TodoRepository = {
  async findAll() {
    return await db.select().from(todo);
  },

  async create(input: TodoCreateInput) {
    return await db.insert(todo).values({
      text: input.text,
    });
  },

  async toggle(input: TodoToggleInput) {
    return await db
      .update(todo)
      .set({ completed: input.completed })
      .where(eq(todo.id, input.id));
  },

  async deleteById(id: number) {
    return await db.delete(todo).where(eq(todo.id, id));
  },
};
