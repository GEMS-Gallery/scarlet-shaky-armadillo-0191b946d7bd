import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

import Result "mo:base/Result";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";

actor {
  type Task = {
    id: Nat;
    category: Text;
    description: Text;
    completed: Bool;
    createdAt: Int;
    completedAt: ?Int;
  };

  stable var nextTaskId: Nat = 0;
  let taskMap = HashMap.HashMap<Nat, Task>(0, Int.equal, Int.hash);

  let categories: [Text] = ["Work", "Personal", "Shopping", "Other"];

  public func addTask(category: Text, description: Text) : async Result.Result<Nat, Text> {
    let taskId = nextTaskId;
    let task: Task = {
      id = taskId;
      category = category;
      description = description;
      completed = false;
      createdAt = Time.now();
      completedAt = null;
    };
    taskMap.put(taskId, task);
    nextTaskId += 1;
    #ok(taskId)
  };

  public func completeTask(taskId: Nat) : async Result.Result<(), Text> {
    switch (taskMap.get(taskId)) {
      case (null) {
        #err("Task not found")
      };
      case (?task) {
        let updatedTask: Task = {
          id = task.id;
          category = task.category;
          description = task.description;
          completed = true;
          createdAt = task.createdAt;
          completedAt = ?Time.now();
        };
        taskMap.put(taskId, updatedTask);
        #ok()
      };
    }
  };

  public func deleteTask(taskId: Nat) : async Result.Result<(), Text> {
    switch (taskMap.remove(taskId)) {
      case (null) {
        #err("Task not found")
      };
      case (?_) {
        #ok()
      };
    }
  };

  public query func getTasks() : async [Task] {
    Iter.toArray(taskMap.vals())
  };

  public query func getCategories() : async [Text] {
    categories
  };

  system func preupgrade() {
    // No need to implement as we're using a stable variable for nextTaskId
    // and taskMap is already using a stable HashMap
  };

  system func postupgrade() {
    // No need to implement as we're using a stable variable for nextTaskId
    // and taskMap is already using a stable HashMap
  };
}
