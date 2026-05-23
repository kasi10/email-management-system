using System.Text;
using System.Text.Json;
using EmailManagementAPI.Models;
using EmailManagementAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace EmailManagementAPI.Services.AI
{
    public class AIClassificationService
    {
        private readonly HttpClient _httpClient;

        private readonly IConfiguration _configuration;

        private readonly IWebHostEnvironment _environment;

        private readonly AppDbContext _context;

        public AIClassificationService(
            HttpClient httpClient,
            IConfiguration configuration,
            IWebHostEnvironment environment,
            AppDbContext context)
        {
            _httpClient = httpClient;

            _configuration = configuration;

            _environment = environment;

            _context = context;
        }

        public async Task<QueryClassificationResult?>
            ClassifyQuery(Query query)
        {
            var apiKey =
                _configuration["OpenRouter:ApiKey"];

            // LOAD PROMPT

            var promptPath = Path.Combine(
                _environment.ContentRootPath,
                "Prompts",
                "classification_prompt.txt"
            );

            var promptTemplate =
                await File.ReadAllTextAsync(promptPath);

            var prompt = promptTemplate
                .Replace(
                    "{{SUBJECT}}",
                    query.Subject
                )
                .Replace(
                    "{{BODY}}",
                    query.Body
                );

            // REQUEST BODY

            var requestBody = new
            {
                model = "openrouter/free",

                messages = new[]
                {
                    new
                    {
                        role = "user",

                        content = prompt
                    }
                }
            };

            // HTTP REQUEST

            var request =
                new HttpRequestMessage(
                    HttpMethod.Post,
                    "https://openrouter.ai/api/v1/chat/completions"
                );

            request.Headers.Add(
                "Authorization",
                $"Bearer {apiKey}"
            );

            request.Content =
                new StringContent(
                    JsonSerializer.Serialize(requestBody),
                    Encoding.UTF8,
                    "application/json"
                );

            // CALL AI

            var response =
                await _httpClient.SendAsync(request);

            var responseString =
                await response.Content
                    .ReadAsStringAsync();

            Console.WriteLine(
                "OPENROUTER RESPONSE:"
            );

            Console.WriteLine(responseString);

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(
                    "OPENROUTER REQUEST FAILED"
                );

                return null;
            }

            // PARSE AI RESPONSE

            using var document =
                JsonDocument.Parse(responseString);

            var text = document
                .RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            if (string.IsNullOrWhiteSpace(text))
            {
                return null;
            }

            text = text
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            try
            {
                var result =
                    JsonSerializer.Deserialize
                    <QueryClassificationResult>(
                        text,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        }
                    );

                if (result == null)
                {
                    return null;
                }

                // MANUAL REVIEW LOGIC

                result.NeedsManualReview =
                    result.ConfidenceScore < 75;

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    "JSON PARSE ERROR"
                );

                Console.WriteLine(ex.Message);

                return null;
            }
        }

        // MAP DEPARTMENT NAME → ID

        public async Task<int?>
            GetDepartmentId(string departmentName)
        {
            var department =
                await _context.Departments
                    .FirstOrDefaultAsync(
                        d =>
                            d.DepartmentName ==
                            departmentName
                    );

            return department?.DepartmentId;
        }
    }
}