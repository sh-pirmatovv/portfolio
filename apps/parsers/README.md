# Parsers and Automations

Each parser service is structured as an observable automation node:

- parser identity via environment variables
- shared heartbeat shape
- job result metrics for central monitoring
- placeholder extraction logic ready for `httpx`, `BeautifulSoup`, or Playwright

