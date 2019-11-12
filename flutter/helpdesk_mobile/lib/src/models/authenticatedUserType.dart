import './enums.dart';

class AuthenticatedUserType {
  String id;
  String fullName;
  String email;
  DateTime created_at;
  DateTime updated_at;
  String token;
  UserRole role;

  AuthenticatedUserType.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        fullName = json['fullName'],
        email = json['email'],
        created_at = (json['created_at'] == null)
            ? null
            : DateTime.parse(json['created_at']),
        updated_at = (json['created_at'] == null)
            ? null
            : DateTime.parse(json['created_at']),
        token = json['token'],
         role = json['role'] == null
            ? null
            : json['role'] == 'ADMIN'
                ? UserRole.ADMIN
                : json['role'] == 'DEFAULT'
                    ? UserRole.DEFAULT
                    : UserRole.SUPERADMIN;
}
