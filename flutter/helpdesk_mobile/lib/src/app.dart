import 'package:flutter/material.dart';
import 'ui/pages/tasklist.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class HelpdeskApp extends StatelessWidget {
  final ValueNotifier<GraphQLClient> client;
  HelpdeskApp(ValueNotifier<GraphQLClient> client) : client = client;
  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: client,
      child: MaterialApp(
        title: 'Helpdesk - Delta',
        theme: ThemeData.light(),
        home: Scaffold(
          floatingActionButton: FloatingActionButton(
            tooltip: "Create new task",
            onPressed: () {
              print("New task");
            },
            child: Icon(Icons.add),
            backgroundColor: Colors.grey,
          ),
          body: TaskList(),
        ),
      ),
    );
  }
}
