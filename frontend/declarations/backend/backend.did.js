export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Task = IDL.Record({
    'id' : IDL.Nat,
    'completedAt' : IDL.Opt(IDL.Int),
    'createdAt' : IDL.Int,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addTask' : IDL.Func([IDL.Text, IDL.Text], [Result_1], []),
    'completeTask' : IDL.Func([IDL.Nat], [Result], []),
    'deleteTask' : IDL.Func([IDL.Nat], [Result], []),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getTasks' : IDL.Func([], [IDL.Vec(Task)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
