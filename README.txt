Offargu AI Security — Static Site Bundle
Files included:
- index.html, about.html, insights.html, contact.html
- /services/ai-risk-governance.html
- /services/ai-soc-operations.html
- /services/privacy-compliance.html
- /services/vulnerability-management.html
- /privacy.html /terms.html /404.html
- /assets/styles.css /assets/main.js /assets/logo.svg
- /api/subscribe.js (serverless Brevo integration example)

Deployment notes:
- The newsletter form posts to /api/subscribe. Deploy the API file to a Node server or serverless platform and set BREVO_API_KEY and BREVO_LIST_ID environment variables.
- Google Calendar 'Book a call' links open the event editor for the user's Google Calendar so visitors can schedule.
- Replace example contact emails and phone numbers in contact.html.
- Adjust pricing and content as required.

SEO summary:
- Title tags and meta descriptions are set on main pages.
- Use the 'og' meta on the homepage for social sharing preview.
- Create additional blog posts under /insights/ and link internally to improve crawl depth.
