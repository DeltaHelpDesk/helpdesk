import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:helpdesk_mobile/src/models/taskType.dart';
import '../components/taskList/sections.dart';

class TaskList extends StatelessWidget {
  final String tasks = r''' query getTasks{
      tasks {
        id
        subject
        issue
        author {
          id
          fullName
          email
          created_at
          updated_at
          role
        }
        assignee {
          id
          fullName
          email
          created_at
          updated_at
          role
        }
        created_at
        updated_at
        state
        logs {
          id
          author {
            id
            fullName
            email
            created_at
            updated_at
            role
          }
          created_at
          comment
          state
          assignee {
            id
            fullName
            email
            created_at
            updated_at
            role
          }
        }
    }
  }
  ''';

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: tasks,
      ),
      builder: (QueryResult result, {VoidCallback refetch}) {
        if (result.errors != null) {
          print(result.data['tasks']);
          return Text(result.errors.toString());
        }

        if (result.loading) {
          return Center(
            child: CircularProgressIndicator(),
          );
        }

        if (result.data == null) {
          return Center(child: Text("No Data Found!"));
        }

        var tasks = result.data['tasks'];
        var parsedTasks = List<TaskType>();
        tasks.forEach((task) => parsedTasks.add(TaskType.fromJson(task)));
        return SafeArea(
          child: Sections(
            tasks: parsedTasks,
          ),
        );
      },
    );
  }
}
