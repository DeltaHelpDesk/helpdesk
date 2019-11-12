import 'package:flutter/material.dart';
import 'src/app.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

void main() {
  final HttpLink httpLink = HttpLink(
    uri: "https://delta-helpdesk.herokuapp.com/graphql",
    headers: <String, String>{
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJhdXRoVHlwZSI6IkVNQUlMIiwiaXNzdWVkIjoiMjAxOS0xMS0xMVQyMjozMToyMC43ODVaIiwiaWF0IjoxNTczNTExNDgwLCJleHAiOjE1NzM2ODQyODB9.zrcygQ_ZpD2M0iJpJn1k5RtaJHsnee19E1oKqercLLU',
    },
  );
  final ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      cache: InMemoryCache(),
      link: httpLink as Link,
    ),
  );
  runApp(HelpdeskApp(client));
}
