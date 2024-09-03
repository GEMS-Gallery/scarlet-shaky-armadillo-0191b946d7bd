import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface Task {
  'id' : bigint,
  'completedAt' : [] | [bigint],
  'createdAt' : bigint,
  'completed' : boolean,
  'description' : string,
  'category' : string,
}
export interface _SERVICE {
  'addTask' : ActorMethod<[string, string], Result_1>,
  'completeTask' : ActorMethod<[bigint], Result>,
  'deleteTask' : ActorMethod<[bigint], Result>,
  'getCategories' : ActorMethod<[], Array<string>>,
  'getTasks' : ActorMethod<[], Array<Task>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
