/// PlantCare AI — Scan Result Model
///
/// Matches the JSON response from POST /scan and POST /plants/{id}/scan

class ScanResult {
  final int? scanId;
  final int? plantId;
  final String plantName;
  final String? scientificName;
  final int healthScore;
  final String healthStatus;
  final List<String> detectedIssues;
  final String? detectedDisease;
  final String waterRequirement;
  final String lightRequirement;
  final String? airRecommendation;
  final String aiExplanation;
  final List<String> careRecommendations;
  final String? imagePath;
  final String? scannedAt;

  const ScanResult({
    this.scanId,
    this.plantId,
    required this.plantName,
    this.scientificName,
    required this.healthScore,
    required this.healthStatus,
    required this.detectedIssues,
    this.detectedDisease,
    required this.waterRequirement,
    required this.lightRequirement,
    this.airRecommendation,
    required this.aiExplanation,
    required this.careRecommendations,
    this.imagePath,
    this.scannedAt,
  });

  factory ScanResult.fromJson(Map<String, dynamic> json) {
    return ScanResult(
      scanId: json['scan_id'] as int?,
      plantId: json['plant_id'] as int?,
      plantName: json['plant_name'] as String? ?? 'Unknown Plant',
      scientificName: json['scientific_name'] as String?,
      healthScore: (json['health_score'] as num?)?.toInt() ?? 50,
      healthStatus: json['health_status'] as String? ?? 'unknown',
      detectedIssues: (json['detected_issues'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      detectedDisease: json['detected_disease'] as String?,
      waterRequirement: json['water_requirement'] as String? ?? 'Medium',
      lightRequirement: json['light_requirement'] as String? ?? 'Bright Indirect',
      airRecommendation: json['air_recommendation'] as String?,
      aiExplanation: json['ai_explanation'] as String? ?? '',
      careRecommendations: (json['care_recommendations'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      imagePath: json['image_path'] as String?,
      scannedAt: json['scanned_at'] as String?,
    );
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
