# SOC 2 Why It Matters: Breach Cost Tracker

A static, offline-capable web app that makes the business case for SOC 2 readiness with
real, publicly reported breach cost data. Searchable and sortable incident table, year filter,
running total computed from the dataset, industry benchmarks, and per-incident tags mapping
to SOC 2 Trust Services Criteria IDs.

Educational aid only. Figures are reported costs from cited sources, not predictions.
Not an audit, attestation, CPA opinion, or legal advice.

## Data sources

Every figure below was verified against a real published source on 2026-09-30. Incident
descriptions are original summaries; nothing is copied article text. Figures labeled
"(reported)" were reported by reputable press citing sources close to the matter but were
not confirmed by the company.

| Company | Year | Figure used | Source |
|---|---|---|---|
| Facebook (Meta) | 2019 | $5 billion FTC penalty | Reuters: https://www.reuters.com/article/us-facebook-ftc/facebook-to-pay-record-5-billion-u-s-fine-over-privacy-violations-critics-call-it-a-bargain-idUSKCN1UJ1L9/?feedType=RSS&feedName=businessNews&utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+reuters%2FbusinessNews+%28Business+News%29 |
| Change Healthcare (UnitedHealth) | 2024 | $3.09 billion total 2024 impact | Becker's Hospital Review (citing UHG year-end earnings): https://www.beckershospitalreview.com/healthcare-information-technology/cybersecurity/the-financial-toll-of-the-change-healthcare-hack-7-numbers/ |
| T-Mobile | 2021 | $350 million class action settlement | GeekWire (citing T-Mobile SEC filing): https://www.geekwire.com/2022/t-mobile-reaches-350m-settlement-in-2021-cyberattack-and-data-breach-impacting-more-than-76m-people/?web_view=true |
| Capital One | 2019 | $190 million class action settlement | WPReset: https://wpreset.com/class-action-settlement-capital-one-legal-update/ |
| MGM Resorts | 2023 | $100 million Q3 earnings impact (SEC 8-K) | Reuters: https://www.reuters.com/business/mgm-expects-cybersecurity-issue-negatively-impact-third-quarter-earnings-2023-10-05/ |
| Marriott (Starwood) | 2018 | $52 million multistate settlement | NC Department of Justice: https://ncdoj.gov/attorney-general-josh-stein-reaches-52-million-multistate-data-breach-settlement-with-marriott/ |
| Blackbaud | 2020 | $49.5 million multistate settlement | BleepingComputer: https://www.bleepingcomputer.com/news/security/ftc-orders-blackbaud-to-boost-security-after-massive-data-breach/ |
| CNA Financial | 2021 | $40 million ransom (reported, Bloomberg) | The Hacker News (citing Bloomberg): https://thehackernews.com/2021/05/insurance-firm-cna-financial-reportedly.html |
| 23andMe | 2023 | $30 million class action settlement | Security.org: https://www.security.org/identity-theft/breach/23andme/ |
| British Airways | 2018 | £20 million ICO fine (encoded as $26M at ~1.30) | Computer Weekly: https://www.computerweekly.com/news/252490640/BA-argues-ICO-data-breach-fine-down-to-20m |
| Caesars Entertainment | 2023 | $15 million ransom (reported, WSJ) | PYMNTS (citing Wall Street Journal): https://www.pymnts.com/news/security-and-risk/2023/report-caesars-entertainment-paid-15-million-ransom-after-cyberattack/ |
| JBS | 2021 | $11 million ransom | The Hacker News: https://thehackernews.com/2021/06/beef-supplier-jbs-paid-hackers-11.html?m=1&hl=en |
| Colonial Pipeline | 2021 | $4.4 million ransom paid ($2.3M recovered by DOJ) | Adaptive Security: https://www.adaptivesecurity.com/blog/colonial-pipeline-ransomware-attack |
| Pearson | 2018 | $1 million SEC civil penalty | U.S. SEC: https://www.sec.gov/newsroom/press-releases/2021-154 |
| AT&T | 2024 | $370,000 ransom (reported, Wired) | 9to5Mac (citing Wired): https://9to5mac.com/2024/07/15/att-hack-ransom-fbi/?extended-comments=1 |

Industry benchmarks: IBM Cost of a Data Breach Report 2025 (IBM and Ponemon Institute):
global average $4.44M, US average $10.22M, healthcare $7.42M.
https://www.ibm.com/downloads/documents/us-en/137a1e23d85ba684

Trust Services Criteria dataset (61 criteria): https://github.com/nehemiah313/tsc-dataset

## Files

- `index.html`, `styles.css`, `app.js`: the app (no build step, no external CDNs)
- `data/breaches.json`: 15 incidents plus 3 benchmarks
- `data/tsc.json`: copy of the TSC dataset (criterion titles for tag tooltips)
- `LICENSE`: MIT

## Notes

- The running total is the sum of the `cost_usd` values in `data/breaches.json`. It is labeled
  in the app as a sum of listed incidents, not a market estimate.
- SOC 2 criteria tags are illustrative mappings from public reporting to Trust Services
  Criteria IDs, not audit findings.
- The British Airways fine was levied in pounds and converted at approximately 1.30 for the
  running total; the original £20 million figure is shown in the cost label.
