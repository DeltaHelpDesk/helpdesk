import './enums.dart';
import './userType.dart';

class LogType {
  String id;
  UserType author;
  DateTime created_at;
  String comment;
  Status state;
  UserType assignee;

  LogType.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        author = UserType.fromJson(json['author']),
        created_at = (json['created_at'] == null)
            ? null
            : DateTime.parse(json['created_at']),
        comment = json['comment'],
        state = json['state'] == null
        ? null
        : json['state'] == 'SOLVED'
            ? Status.SOLVED
            : json['state'] == 'RETURNED'
                ? Status.RETURNED
                : json['state'] == 'SOLVING' ? Status.SOLVING : Status.UNRESOLVED,
        assignee = UserType.fromJson(json['assignee']);
}
