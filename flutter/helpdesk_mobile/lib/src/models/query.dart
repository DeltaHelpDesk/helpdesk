import './authenticatedUserType.dart';
import './userType.dart';
import './taskType.dart';

class Query {
  AuthenticatedUserType session;
  List<UserType> admins;
  List<UserType> users;
  List<TaskType> tasks;
  TaskType task; // task(id: ID): Task

  Query();
  static Query fromJson(Map<String, dynamic> json) {
    Query query = new Query();
    List<UserType> admins = new List<UserType>();
    List<UserType> users = new List<UserType>();
    List<TaskType> tasks = new List<TaskType>();
    for (var admin in json['admins']) {
      admins.add(UserType.fromJson(admin));
    }
    for (var user in json['users']) {
      users.add(UserType.fromJson(user));
    }
    for(var task in json['tasks']){
      tasks.add(TaskType.fromJson(task));
    }
    query.session = AuthenticatedUserType.fromJson(json['session']);
    query.admins = admins;
    query.users = users;
    query.tasks = tasks;
    query.task = TaskType.fromJson(json['task']);
  }
}
