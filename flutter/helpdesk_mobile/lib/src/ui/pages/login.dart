import 'package:flutter/material.dart';
import 'package:helpdesk_mobile/src/secureStorage.dart';

/* Flutter packages */
import 'package:graphql_flutter/graphql_flutter.dart';
/* Flutter packages */

/* Pages */
import 'package:helpdesk_mobile/src/ui/pages/tasklist.dart';
/* Pages */

class _LoginData {
  String email = '';
  String password = '';
}

class Login extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _Login();
  }
}

class _Login extends State<Login> {
  final SecureStorage _secureStorage = new SecureStorage();
  final String loginEmailMutation = """
    mutation loginEmail(\$email: String!, \$password: String!){
      loginEmail(email: \$email, password: \$password) {
        token
      }
    }
  """;
  final _formKey = GlobalKey<FormState>();
  final _LoginData _data = new _LoginData();

  void _submit(RunMutation runMutation) {
    if (this._formKey.currentState.validate()) {
      _formKey.currentState.save();
      runMutation({'email': this._data.email, 'password': this._data.password});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Mutation(
        options: MutationOptions(
          documentNode: gql(loginEmailMutation),
          onCompleted: (dynamic resultData) {
            _secureStorage.setToken(resultData["loginEmail"]["token"]);
          },
        ),
        builder: (
          RunMutation runMutation,
          QueryResult result,
        ) {
          return Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                TextFormField(
                  decoration: const InputDecoration(
                    hintText: 'Enter your email',
                    icon: Icon(
                      Icons.person,
                    ),
                  ),
                  validator: (String value) {
                    if (value.isEmpty) {
                      return 'Please enter your email.';
                    }
                    return null;
                  },
                  onSaved: (String value) {
                    this._data.email = value;
                  },
                ),
                TextFormField(
                  decoration: const InputDecoration(
                    hintText: 'Enter your password',
                    icon: Icon(
                      Icons.lock,
                    ),
                  ),
                  validator: (String value) {
                    if (value.isEmpty) {
                      return 'Please enter password';
                    }
                    return null;
                  },
                  onSaved: (String value) {
                    this._data.password = value;
                  },
                ),
                RaisedButton(
                  onPressed: () {
                    this._submit(runMutation);
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => TaskList()),
                    );
                  },
                  child: Text('Submit'),
                ),
              ],
            ),
          );
        });
  }
}
