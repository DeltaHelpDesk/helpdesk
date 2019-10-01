import 'package:flutter/material.dart';

import 'pages/tasklist.dart';

void main() => runApp(App());

class App extends StatefulWidget {
  State<StatefulWidget> createState() {
    return _AppState();
  }
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
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
    );
  }
}
