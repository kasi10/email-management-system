using System;

namespace EmailManagementAPI.Models
{
    public class Query
    {
        public int Id { get; set; }

        // Original Email Data

        public string SenderEmail { get; set; }
            = string.Empty;

        public string Subject { get; set; }
            = string.Empty;

        public string Body { get; set; }
            = string.Empty;

        // Timestamps

        public DateTime CreatedTs { get; set; }
            = DateTime.UtcNow;

        public DateTime? ClassifiedAt { get; set; }

        // AI Classification

        public string? Category { get; set; }

        public string? Priority { get; set; }

        // OLD FIELD
        // Keep temporarily during migration

        public string? AssignedTeam { get; set; }

        // NEW ENTERPRISE FIELD

        public int? AssignedDepartmentId { get; set; }

        // Navigation Property

        public Department? AssignedDepartment { get; set; }

        // AI Confidence

        public double? ConfidenceScore { get; set; }

        // Workflow Flags

        public bool IsClassified { get; set; }
            = false;

        public bool NeedsManualReview { get; set; }
            = false;

        public bool ReturnedToAdmin { get; set; }
            = false;

        // Workflow Status

        public string Status { get; set; }
            = "Pending Classification";

        // Raw AI Response

        public string? AiResponseRaw { get; set; }
    }
}