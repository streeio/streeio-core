import {
  todoCreateSchema,
  todoDeleteSchema,
  todoToggleSchema,
} from "@streeio-core/schemas/todo";

import { publicProcedure, router } from "../index";
import { TodoService } from "../services/todo";

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    return await TodoService.getAllTodos();
  }),

  create: publicProcedure
    .input(todoCreateSchema)
    .mutation(async ({ input }) => {
      return await TodoService.createTodo(input);
    }),

  toggle: publicProcedure
    .input(todoToggleSchema)
    .mutation(async ({ input }) => {
      return await TodoService.toggleTodo(input);
    }),

  delete: publicProcedure
    .input(todoDeleteSchema)
    .mutation(async ({ input }) => {
      return await TodoService.deleteTodo(input);
    }),
});
