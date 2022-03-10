import { localforageDb } from "@/local-forage/localforageDb";
import { Task } from "@/store/useTodoListStore";
import { getMd5FromArray, md5 } from "@/util/md5";
import _ from "lodash";
import { EventBus, eventBus, EventType } from "./todoListEventBus";

export type ServiceTask = Task;

export const addItem = async (item: Pick<Task, "createAt" | "title">) => {
  const createAt = item.createAt;
  const padCreateAt = _.padStart(_.toString(createAt), 20);

  let lint = 0;
  let hasSaveId = true;
  let padLint = _.padStart(_.toString(lint), 20);
  for (; hasSaveId; ) {
    lint++;
    padLint = _.padStart(_.toString(lint), 20);
    hasSaveId = !!(await localforageDb.getItem(`${padCreateAt}:${padLint}`));
  }
  const id = `${padCreateAt}:${padLint}`;
  const currentTask = {
    ...item,
    id,
    finished: false,
    active: false,
  };
  await localforageDb.setItem<Task>(id, currentTask);

  eventBus.add.forEach((f) => {
    f(currentTask, id);
  });
};

export const editItems = async (items: Array<Partial<Task>>) => {
  const isTask = (item: Task | undefined): item is Task => {
    return !!item;
  };

  const newItems = (
    await Promise.all(
      items.map(async (item) => {
        const id = item.id;
        if (id) {
          const savedItem = await localforageDb.getItem<Task>(id);
          if (savedItem) {
            const newItem = {
              ...savedItem,
              ...item,
            };
            await localforageDb.setItem<Task>(id, newItem);
            return newItem;
          }
        }
      }),
    )
  ).filter(isTask);

  eventBus.edit.forEach((f) => f(newItems));
  return newItems;
};

export const getAllItem = async (count?: number) => {
  const result: Array<Task> = [];
  await localforageDb.iterate<Task, void>((value, key) => {
    result.push(value);
  });
  return count ? result.slice(-count) : result;
};

export const deleteItems = async (ids: Array<string>) => {
  const successIds = await Promise.all(
    ids.map(async (id) => {
      await localforageDb.removeItem(id);
      return id;
    }),
  );

  eventBus.remove.forEach((f) => {
    f(successIds);
  });
};

export const subscribe = async (
  eventName: keyof typeof EventType,
  handler: EventBus[EventType][number],
) => {
  eventBus[eventName].push(handler as any);
};

export const getLastItemHash = async (ids: number) => {
  const allItem = await getAllItem(ids);
  return getMd5FromArray(allItem.map((v) => v.id));
};

export const todoListService = {
  addItem,
  deleteItems,
  editItems,
  getAllItem,
  subscribe,
  getLastItemHash,
};
