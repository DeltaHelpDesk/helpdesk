import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  final storage = new FlutterSecureStorage();
  SecureStorage();

  setToken(String token) {
    storage.write(key: "token", value: token);
  }

  Future<String> getToken() {
    return storage.read(key: "token");
  }
}
