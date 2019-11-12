import './enums.dart';

class UserType {
  String id;
  String fullName;
  String email;
  DateTime created_at;
  DateTime updated_at;
  UserRole role;

  UserType.fromJson(Map<String, dynamic> json)
      : id = json['id'] == null ? null : json['id'],
        fullName = json['fullName'] == null ? null : json['fullName'],
        email = json['email'] == null ? null : json['email'],
        created_at = (json['created_at'] == null)
            ? null
            : DateTime.parse(json['created_at']),
        updated_at = (json['updated_at'] == null)
            ? null
            : DateTime.parse(json['updated_at']),
        role = json['role'] == null
            ? null
            : json['role'] == 'ADMIN'
                ? UserRole.ADMIN
                : json['role'] == 'DEFAULT'
                    ? UserRole.DEFAULT
                    : UserRole.SUPERADMIN;
}
