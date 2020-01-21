import 'package:flutter/material.dart';
import 'src/app.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'src/secureStorage.dart';

Future<void> main() async {
  SecureStorage _secureStorage = new SecureStorage();
  WidgetsFlutterBinding.ensureInitialized();
  final HttpLink httpLink = HttpLink(
    uri: "https://delta-helpdesk.herokuapp.com/graphql",
    headers: <String, String>{
      'authorization': 'Bearer ${await _secureStorage.getToken()}',
    },
  );
  final ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      cache: InMemoryCache(),
      link: httpLink,
    ),
  );
  runApp(HelpdeskApp(client));
}
