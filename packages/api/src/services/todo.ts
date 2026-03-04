import type {
  TodoCreateInput,
  TodoDeleteInput,
  TodoToggleInput,
} from "@streeio-core/schemas/todo";
import { TodoRepository } from "../repositories/todo";

export const TodoService = {
  async getAllTodos() {
    return await TodoRepository.findAll();
  },

  async createTodo(input: TodoCreateInput) {
    return await TodoRepository.create(input);
  },

  async toggleTodo(input: TodoToggleInput) {
    return await TodoRepository.toggle(input);
  },

  async deleteTodo(input: TodoDeleteInput) {
    return await TodoRepository.deleteById(input.id);
  },
};
