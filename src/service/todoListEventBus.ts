import { Task } from "@/store/useTodoListStore";

export enum EventType {
  add = "add",
  remove = "remove",
  edit = "edit",
}

export interface EventBus {
  [EventType.add]: Array<(task: Task, id: string) => any>;
  [EventType.remove]: Array<(ids: Array<string>) => any>;
  [EventType.edit]: Array<(tasks: Array<Task>) => any>;
}

export const eventBus: EventBus = {
  [EventType.add]: [],
  [EventType.remove]: [],
  [EventType.edit]: [],
};
