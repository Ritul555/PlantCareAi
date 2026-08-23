/// PlantCare AI — Scan Result Model
///
/// Matches the JSON response from POST /scan and POST /plants/{id}/scan

class ScanResultIssue {
  final String name;
  final String severity;
  final String evidence;
  final String possibleCause;
  final String recommendation;

  ScanResultIssue({
    required this.name,
    required this.severity,
    required this.evidence,
    required this.possibleCause,
    required this.recommendation,
  });

  factory ScanResultIssue.fromJson(Map<String, dynamic> json) {
    return ScanResultIssue(
      name: json['name'] as String? ?? 'Unknown Issue',
      severity: json['severity'] as String? ?? 'Medium',
      evidence: json['evidence'] as String? ?? '',
      possibleCause: json['possible_cause'] as String? ?? '',
      recommendation: json['recommendation'] as String? ?? '',
    );
  }
}

class ScanResult {
  final int? scanId;
  final int? plantId;
  final String plantName;
  final String? scientificName;
  final double identificationConfidence;

  final int healthScore;
  final String healthStatus;
  final double healthConfidence;
  final String summary;

  final List<String> observations;
  final List<ScanResultIssue> issues;

  final Map<String, String> water;
  final Map<String, String> light;
  final Map<String, String> pests;
  final Map<String, String> imageQuality;

  final List<String> careRecommendations;
  final String? imagePath;
  final String? scannedAt;

  // Legacy fields (still kept for backward compatibility if needed)
  final List<String> detectedIssues;
  final String? detectedDisease;
  final String waterRequirement;
  final String lightRequirement;
  final String aiExplanation;

  const ScanResult({
    this.scanId,
    this.plantId,
    required this.plantName,
    this.scientificName,
    this.identificationConfidence = 0.5,
    required this.healthScore,
    required this.healthStatus,
    this.healthConfidence = 0.5,
    required this.summary,
    required this.observations,
    required this.issues,
    required this.water,
    required this.light,
    required this.pests,
    required this.imageQuality,
    required this.careRecommendations,
    this.imagePath,
    this.scannedAt,
    this.detectedIssues = const [],
    this.detectedDisease,
    this.waterRequirement = 'Medium',
    this.lightRequirement = 'Bright Indirect',
    this.aiExplanation = '',
  });

  factory ScanResult.fromJson(Map<String, dynamic> json) {
    return ScanResult(
      scanId: json['scan_id'] as int?,
      plantId: json['plant_id'] as int?,
      plantName: json['plant_name'] as String? ?? 'Unknown Plant',
      scientificName: json['scientific_name'] as String?,
      identificationConfidence: (json['identification_confidence'] as num?)?.toDouble() ?? 0.5,
      healthScore: (json['health_score'] as num?)?.toInt() ?? 50,
      healthStatus: json['health_status'] as String? ?? 'unknown',
      healthConfidence: (json['health_confidence'] as num?)?.toDouble() ?? 0.5,
      summary: json['summary'] as String? ?? json['ai_explanation'] as String? ?? 'Analysis complete.',
      observations: (json['observations'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      issues: (json['issues'] as List<dynamic>?)
              ?.map((e) => ScanResultIssue.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      water: _mapToStringString(json['water']),
      light: _mapToStringString(json['light']),
      pests: _mapToStringString(json['pests']),
      imageQuality: _mapToStringString(json['image_quality']),
      careRecommendations: (json['care_recommendations'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      imagePath: json['image_path'] as String?,
      scannedAt: json['scanned_at'] as String?,
      detectedIssues: (json['detected_issues'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      detectedDisease: json['detected_disease'] as String?,
      waterRequirement: json['water_requirement'] as String? ?? 'Medium',
      lightRequirement: json['light_requirement'] as String? ?? 'Bright Indirect',
      aiExplanation: json['ai_explanation'] as String? ?? '',
    );
  }

  static Map<String, String> _mapToStringString(dynamic data) {
    if (data is Map) {
      return data.map((key, value) => MapEntry(key.toString(), value.toString()));
    }
    return {};
  }

  /// Returns a display-friendly label for the health status
  String get healthStatusLabel {
    switch (healthStatus) {
      case 'healthy':
        return 'Healthy';
      case 'mild_stress':
        return 'Mild Stress';
      case 'needs_attention':
        return 'Needs Attention';
      case 'high_risk':
        return 'High Risk';
      case 'critical':
        return 'Critical';
      default:
        return 'Unknown';
    }
  }
}
