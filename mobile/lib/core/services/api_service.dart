/// PlantCare AI — API Service
///
/// Handles all HTTP communication with the PlantCare FastAPI backend.
/// Base URL: http://localhost:8000
///
/// Endpoints used:
///   POST /auth/login   — authenticate user
///   POST /auth/register — create account
///   POST /scan         — analyze plant image with AI

import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/scan_result.dart';

class ApiService {
  // -------------------------------------------------------
  // Configuration
  // -------------------------------------------------------

  /// Backend base URL. Change this if running backend on a different host/port.
  static const String _baseUrl = 'http://localhost:8000';
  static const String _tokenKey = 'plantcare_jwt_token';

  // -------------------------------------------------------
  // Token Management
  // -------------------------------------------------------

  /// Save JWT token to local storage
  static Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  /// Load JWT token from local storage
  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  /// Clear stored token (logout)
  static Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  /// Build auth headers with stored JWT token
  static Future<Map<String, String>> _authHeaders() async {
    final token = await getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // -------------------------------------------------------
  // Authentication
  // -------------------------------------------------------

  /// Login with email and password.
  /// Returns the JWT token on success.
  /// Throws [ApiException] on failure.
  static Future<Map<String, dynamic>> login(
    String email,
    String password,
  ) async {
    final response = await http
        .post(
          Uri.parse('$_baseUrl/auth/login'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'email': email, 'password': password}),
        )
        .timeout(const Duration(seconds: 15));

    final data = jsonDecode(response.body) as Map<String, dynamic>;

    if (response.statusCode == 200) {
      final token = data['access_token'] as String;
      await saveToken(token);
      return data;
    } else {
      throw ApiException(
        statusCode: response.statusCode,
        message: data['detail'] as String? ?? 'Login failed',
      );
    }
  }

  /// Register a new account.
  /// Returns the JWT token on success.
  static Future<Map<String, dynamic>> register({
    required String fullName,
    required String email,
    required String password,
  }) async {
    final response = await http
        .post(
          Uri.parse('$_baseUrl/auth/register'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'full_name': fullName,
            'email': email,
            'password': password,
          }),
        )
        .timeout(const Duration(seconds: 15));

    final data = jsonDecode(response.body) as Map<String, dynamic>;

    if (response.statusCode == 201) {
      final token = data['access_token'] as String;
      await saveToken(token);
      return data;
    } else {
      throw ApiException(
        statusCode: response.statusCode,
        message: data['detail'] as String? ?? 'Registration failed',
      );
    }
  }

  // -------------------------------------------------------
  // Plant Scan
  // -------------------------------------------------------

  /// Upload a plant image and get AI health analysis.
  ///
  /// Calls POST /scan (standalone — no plant_id required).
  /// Returns a [ScanResult] with full health analysis.
  static Future<ScanResult> scanPlant(File imageFile) async {
    final token = await getToken();

    // Build multipart request
    final request = http.MultipartRequest(
      'POST',
      Uri.parse('$_baseUrl/scan'),
    );

    // Add auth header if logged in
    if (token != null) {
      request.headers['Authorization'] = 'Bearer $token';
    }

    // Attach image file
    final mimeType = _getMimeType(imageFile.path);
    request.files.add(
      await http.MultipartFile.fromPath(
        'image',
        imageFile.path,
        // contentType is inferred by the package
      ),
    );

    // Send request
    final streamedResponse = await request.send().timeout(
          const Duration(seconds: 60), // Gemini can take up to 30s
        );

    final response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body) as Map<String, dynamic>;

    if (response.statusCode == 200) {
      return ScanResult.fromJson(data);
    } else {
      throw ApiException(
        statusCode: response.statusCode,
        message: data['detail'] as String? ?? 'Scan failed',
      );
    }
  }

  // -------------------------------------------------------
  // Helpers
  // -------------------------------------------------------

  static String _getMimeType(String path) {
    final lower = path.toLowerCase();
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.webp')) return 'image/webp';
    return 'image/jpeg';
  }
}

// -------------------------------------------------------
// Exception
// -------------------------------------------------------

class ApiException implements Exception {
  final int statusCode;
  final String message;

  const ApiException({required this.statusCode, required this.message});

  @override
  String toString() => 'ApiException($statusCode): $message';
}
