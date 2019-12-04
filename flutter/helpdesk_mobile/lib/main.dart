import 'package:flutter/material.dart';
import 'src/app.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

void main() {
  final HttpLink httpLink = HttpLink(
    uri: "https://delta-helpdesk.herokuapp.com/graphql",
    headers: <String, String>{
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJhdXRoVHlwZSI6IkVNQUlMIiwiaXNzdWVkIjoiMjAxOS0xMi0wNFQxMDo0OTozNC45ODhaIiwiaWF0IjoxNTc1NDU2NTc0LCJleHAiOjE1NzU2MjkzNzR9.UO5K2FLBwL2GXIXD2QvOLQBQ1q_VfgTL5bib1L-hDSs',
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
