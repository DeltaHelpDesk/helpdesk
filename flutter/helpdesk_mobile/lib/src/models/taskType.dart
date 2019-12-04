import './userType.dart';
import './enums.dart';
import './logType.dart';

class TaskType {
  String id;
  String subject;
  String issue;
  UserType author;
  UserType assignee;
  DateTime created_at;
  DateTime updated_at;
  Status state;
  List<LogType> logs;

  TaskType();
  static TaskType fromJson(Map<String, dynamic> json) {
    var task = new TaskType();
    var logs = new List<LogType>();
/*
    for (var log in json['logs']) {
      logs.add(LogType.fromJson(log));
    } */
    task.id = json['id'];
    task.subject = json['subject'];
    task.issue = json['issue'];
    task.author = json['author'] == null ? null : UserType.fromJson(json['author']);
    task.assignee = json['assignee'] == null ? null : UserType.fromJson(json['assignee']);
    task.created_at = (json['created_at'] == null)
        ? null
        : DateTime.parse(json['created_at']);
    task.updated_at = (json['updated_at'] == null)
        ? null
        : DateTime.parse(json['updated_at']);
    task.state = json['state'] == null
        ? null
        : json['state'] == 'SOLVED'
            ? Status.SOLVED
            : json['state'] == 'RETURNED'
                ? Status.RETURNED
                : json['state'] == 'SOLVING' ? Status.SOLVING : Status.UNRESOLVED;
    task.logs = logs;

    return task;
  }
}
