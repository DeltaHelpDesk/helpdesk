import 'package:flutter/material.dart';
import 'package:helpdesk_mobile/src/models/taskType.dart';

class TaskCard extends StatelessWidget {
  final TaskType task;
  TaskCard(this.task);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(15, 10, 15, 0),
      child: Card(
        child: Container(
          height: 100,
          padding: EdgeInsets.all(10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                task.subject,
                textAlign: TextAlign.left,
                style: TextStyle(fontWeight: FontWeight.w500),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    "${task.created_at.day}/${task.created_at.month}",
                    style: TextStyle(color: Colors.grey),
                  ),
                  Text(
                    task.author.fullName,
                    style: TextStyle(color: Colors.grey),
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
