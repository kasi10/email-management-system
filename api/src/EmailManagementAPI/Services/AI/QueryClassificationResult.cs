namespace EmailManagementAPI.Services.AI
{
    public class QueryClassificationResult
    {
        // AI Classification

        public string Category { get; set; }
            = string.Empty;

        public string Priority { get; set; }
            = string.Empty;

        // AI returns department name
        // NOT database IDs

        public string Department { get; set; }
            = string.Empty;

        // AI Confidence Score

        public double ConfidenceScore { get; set; }

        // Manual Review Flag

        public bool NeedsManualReview { get; set; }
    }
}