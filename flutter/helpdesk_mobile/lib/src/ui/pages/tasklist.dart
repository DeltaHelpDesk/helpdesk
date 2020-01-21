import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:helpdesk_mobile/src/models/taskType.dart';
import '../components/taskList/sections.dart';

class TaskList extends StatelessWidget {
  final String tasks = """
  query getTasks{
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
    }
  }
  """;

  final String getTasks = """
    query getTasks{
      tasks{
        id
        subject
        created_at
        author{
          fullName
        }
        state
      }
    }
  """;
  
  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        documentNode: gql(getTasks),
      ),
      builder: (QueryResult result,
          {VoidCallback refetch, FetchMore fetchMore}) {
        if (result.hasException) {
          return Text(result.exception.toString());
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
        var parsedTasks = List<TaskTypeList>();
        tasks.forEach((task) => parsedTasks.add(TaskTypeList.fromJson(task)));
        return SafeArea(
          child: Sections(
            tasks: parsedTasks,
          ),
        );
      },
    );
  }
}
