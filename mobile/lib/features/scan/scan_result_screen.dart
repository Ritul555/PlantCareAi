/// PlantCare AI — Scan Result Screen
///
/// Displays the full AI plant health analysis returned from the backend.
/// Shows health score gauge, plant identification, detected issues,
/// care requirements, and personalized recommendations.

import 'dart:io';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/models/scan_result.dart';

class ScanResultScreen extends StatefulWidget {
  final ScanResult result;
  final File? imageFile;

  const ScanResultScreen({
    super.key,
    required this.result,
    this.imageFile,
  });

  @override
  State<ScanResultScreen> createState() => _ScanResultScreenState();
}

class _ScanResultScreenState extends State<ScanResultScreen>
    with TickerProviderStateMixin {
  late AnimationController _scoreAnimController;
  late Animation<double> _scoreAnimation;

  @override
  void initState() {
    super.initState();
    _scoreAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _scoreAnimation = Tween<double>(
      begin: 0,
      end: widget.result.healthScore / 100.0,
    ).animate(CurvedAnimation(
      parent: _scoreAnimController,
      curve: Curves.easeOutCubic,
    ));
    _scoreAnimController.forward();
  }

  @override
  void dispose() {
    _scoreAnimController.dispose();
    super.dispose();
  }

  // -------------------------------------------------------
  // Status color helper
  // -------------------------------------------------------
  Color _statusColor(String status) {
    switch (status) {
      case 'healthy':
        return const Color(0xFF2E7D32);
      case 'mild_stress':
        return const Color(0xFF558B2F);
      case 'needs_attention':
        return const Color(0xFFF57F17);
      case 'high_risk':
        return const Color(0xFFE65100);
      case 'critical':
        return const Color(0xFFC62828);
      default:
        return AppColors.textSecondary;
    }
  }

  Color _scoreColor(int score) {
    if (score >= 80) return const Color(0xFF2E7D32);
    if (score >= 60) return const Color(0xFF558B2F);
    if (score >= 40) return const Color(0xFFF57F17);
    if (score >= 20) return const Color(0xFFE65100);
    return const Color(0xFFC62828);
  }

  // -------------------------------------------------------
  // Build
  // -------------------------------------------------------
  @override
  Widget build(BuildContext context) {
    final result = widget.result;
    final statusColor = _statusColor(result.healthStatus);
    final scoreColor = _scoreColor(result.healthScore);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          // ---- Hero Image Header ----
          SliverAppBar(
            expandedHeight: 260,
            pinned: true,
            backgroundColor: statusColor,
            flexibleSpace: FlexibleSpaceBar(
              background: widget.imageFile != null
                  ? Image.file(
                      widget.imageFile!,
                      fit: BoxFit.cover,
                    )
                  : Container(
                      color: statusColor.withOpacity(0.2),
                      child: Icon(
                        Icons.eco_rounded,
                        size: 80,
                        color: statusColor,
                      ),
                    ),
            ),
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // ---- Plant Name + Status Badge ----
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              result.plantName,
                              style: const TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            if (result.scientificName != null) ...[
                              const SizedBox(height: 4),
                              Text(
                                result.scientificName!,
                                style: TextStyle(
                                  fontSize: 14,
                                  fontStyle: FontStyle.italic,
                                  color: AppColors.textSecondary,
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: statusColor.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: statusColor.withOpacity(0.4)),
                        ),
                        child: Text(
                          result.healthStatusLabel,
                          style: TextStyle(
                            color: statusColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // ---- Health Score Gauge ----
                  _HealthScoreGauge(
                    animation: _scoreAnimation,
                    score: result.healthScore,
                    scoreColor: scoreColor,
                  ),
                  const SizedBox(height: 24),

                  // ---- AI Explanation ----
                  _SectionCard(
                    icon: Icons.psychology_rounded,
                    iconColor: AppColors.primary,
                    title: 'AI Analysis',
                    child: Text(
                      result.aiExplanation,
                      style: TextStyle(
                        color: AppColors.textSecondary,
                        height: 1.6,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // ---- Care Requirements Row ----
                  Row(
                    children: [
                      Expanded(
                        child: _RequirementChip(
                          icon: Icons.water_drop_rounded,
                          label: 'Water',
                          value: result.waterRequirement,
                          color: Colors.blue.shade600,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _RequirementChip(
                          icon: Icons.wb_sunny_rounded,
                          label: 'Light',
                          value: result.lightRequirement,
                          color: Colors.amber.shade700,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // ---- Detected Issues ----
                  if (result.detectedIssues.isNotEmpty) ...[
                    _SectionCard(
                      icon: Icons.warning_amber_rounded,
                      iconColor: Colors.orange.shade700,
                      title: 'Issues Detected',
                      child: Column(
                        children: result.detectedIssues
                            .map(
                              (issue) => Padding(
                                padding: const EdgeInsets.symmetric(vertical: 4),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Icon(
                                      Icons.circle,
                                      size: 8,
                                      color: Colors.orange.shade700,
                                    ),
                                    const SizedBox(width: 10),
                                    Expanded(
                                      child: Text(
                                        issue,
                                        style: TextStyle(
                                          color: AppColors.textSecondary,
                                          height: 1.4,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            )
                            .toList(),
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],

                  // ---- Disease Detection ----
                  if (result.detectedDisease != null) ...[
                    _SectionCard(
                      icon: Icons.coronavirus_rounded,
                      iconColor: Colors.red.shade700,
                      title: 'Disease Detected',
                      child: Text(
                        result.detectedDisease!,
                        style: TextStyle(
                          color: Colors.red.shade700,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],

                  // ---- Air Recommendation ----
                  if (result.airRecommendation != null) ...[
                    _SectionCard(
                      icon: Icons.air_rounded,
                      iconColor: Colors.teal.shade600,
                      title: 'Air & Humidity',
                      child: Text(
                        result.airRecommendation!,
                        style: TextStyle(
                          color: AppColors.textSecondary,
                          height: 1.5,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],

                  // ---- Care Recommendations ----
                  _SectionCard(
                    icon: Icons.tips_and_updates_rounded,
                    iconColor: AppColors.primary,
                    title: 'Care Recommendations',
                    child: Column(
                      children: result.careRecommendations
                          .asMap()
                          .entries
                          .map(
                            (entry) => Padding(
                              padding: const EdgeInsets.symmetric(vertical: 6),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    width: 24,
                                    height: 24,
                                    decoration: BoxDecoration(
                                      color: AppColors.primary.withOpacity(0.1),
                                      shape: BoxShape.circle,
                                    ),
                                    child: Center(
                                      child: Text(
                                        '${entry.key + 1}',
                                        style: TextStyle(
                                          color: AppColors.primary,
                                          fontSize: 12,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Text(
                                      entry.value,
                                      style: TextStyle(
                                        color: AppColors.textSecondary,
                                        height: 1.5,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          )
                          .toList(),
                    ),
                  ),
                  const SizedBox(height: 32),

                  // ---- Scan Again Button ----
                  ElevatedButton.icon(
                    onPressed: () => Navigator.of(context).pop(),
                    icon: const Icon(Icons.camera_alt_rounded),
                    label: const Text('Scan Another Plant'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// -------------------------------------------------------
// Health Score Gauge Widget
// -------------------------------------------------------
class _HealthScoreGauge extends StatelessWidget {
  final Animation<double> animation;
  final int score;
  final Color scoreColor;

  const _HealthScoreGauge({
    required this.animation,
    required this.score,
    required this.scoreColor,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: scoreColor.withOpacity(0.06),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              'Health Score',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 16),
            AnimatedBuilder(
              animation: animation,
              builder: (context, _) {
                return CustomPaint(
                  size: const Size(160, 100),
                  painter: _GaugePainter(
                    progress: animation.value,
                    color: scoreColor,
                  ),
                  child: SizedBox(
                    height: 100,
                    child: Align(
                      alignment: Alignment.bottomCenter,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            '${(animation.value * score / animation.value.clamp(0.001, 1.0)).round()}',
                            style: TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.bold,
                              color: scoreColor,
                            ),
                          ),
                          Text(
                            'out of 100',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _GaugePainter extends CustomPainter {
  final double progress;
  final Color color;

  _GaugePainter({required this.progress, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height);
    final radius = size.width / 2 - 10;
    const startAngle = math.pi;
    const sweepAngle = math.pi;

    // Background arc
    final bgPaint = Paint()
      ..color = color.withOpacity(0.15)
      ..strokeWidth = 14
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      startAngle,
      sweepAngle,
      false,
      bgPaint,
    );

    // Foreground arc (progress)
    final fgPaint = Paint()
      ..color = color
      ..strokeWidth = 14
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      startAngle,
      sweepAngle * progress,
      false,
      fgPaint,
    );
  }

  @override
  bool shouldRepaint(_GaugePainter oldDelegate) =>
      oldDelegate.progress != progress || oldDelegate.color != color;
}

// -------------------------------------------------------
// Section Card
// -------------------------------------------------------
class _SectionCard extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String title;
  final Widget child;

  const _SectionCard({
    required this.icon,
    required this.iconColor,
    required this.title,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: iconColor, size: 20),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            child,
          ],
        ),
      ),
    );
  }
}

// -------------------------------------------------------
// Requirement Chip
// -------------------------------------------------------
class _RequirementChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const _RequirementChip({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: color.withOpacity(0.08),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 8),
            Text(
              label,
              style: TextStyle(
                color: AppColors.textSecondary,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              value,
              style: TextStyle(
                color: color,
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
