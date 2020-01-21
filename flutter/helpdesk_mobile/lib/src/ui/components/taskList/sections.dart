import 'package:flutter/material.dart';
import 'package:helpdesk_mobile/src/models/taskType.dart';
import 'package:helpdesk_mobile/src/ui/components/taskList/taskCard.dart';
import 'package:helpdesk_mobile/src/models/enums.dart';

class Sections extends StatefulWidget {
  final List<TaskTypeList> tasks;
  Sections({Key key, this.tasks}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _SectionsState(tasks: this.tasks);
}

class _SectionsState extends State<Sections> {
  PageController pageController;

  final List<TaskTypeList> tasks;
  Map<String, List<TaskTypeList>> sectionedTasks = Map<String, List<TaskTypeList>>();

  _SectionsState({this.tasks}) {
    sectionedTasks['Nezapočato'] =
        tasks.where((task) => task.state == Status.UNRESOLVED).toList();
    sectionedTasks['Pracuje se na tom'] =
        tasks.where((task) => task.state == Status.SOLVING).toList();
    sectionedTasks['Dokončeno'] =
        tasks.where((task) => task.state == Status.SOLVED).toList();
  }

  @override
  void initState() {
    super.initState();
    pageController = PageController(initialPage: 0, viewportFraction: 0.8);
  }

  @override
  Widget build(BuildContext context) {
    return PageView.builder(
      controller: pageController,
      itemCount: this.sectionedTasks.length,
      itemBuilder: (context, position) {
        return SafeArea(
          child: Card(
            color: Color.fromRGBO(245, 245, 245, 1),
            child: Padding(
              padding: EdgeInsets.only(top: 10),
              child: ListView(
                children: <Widget>[
                  Center(
                    child: Text(
                      sectionedTasks.keys.elementAt(position).toUpperCase(),
                      style: TextStyle(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  Center(
                    child: Column(
                      children: List.generate(
                        sectionedTasks[sectionedTasks.keys.elementAt(position)]
                            .length,
                        (index) {
                          return TaskCard(sectionedTasks[
                              sectionedTasks.keys.elementAt(position)][index]);
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }
}
