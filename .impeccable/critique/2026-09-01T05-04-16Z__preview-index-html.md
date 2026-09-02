---
target: the China itinerary preview
total_score: 22
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 0
target_identity: "file:/home/abhi/projects/china-itinerary/preview/index.html"
target_fingerprint: "sha256:dc5c5bf97f361280b14640408ad27ff6411c7458a204b6f7fff52c2ff15e82a6"
target_path: /home/abhi/projects/china-itinerary/preview/index.html
timestamp: 2026-09-01T05-04-16Z
slug: preview-index-html
closed: true
---
## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 4 | Active date, current city, gallery counter, and focus states are visible. |
| 2 | Match system / real world | 4 | The route, dates, bases, meals, and movement read in natural trip order. |
| 3 | User control and freedom | 3 | Anchors, swipe, arrows, and back-to-top work; the mobile date rail could advertise horizontal movement more clearly. |
| 4 | Consistency and standards | 4 | One coherent pixel-journal system now spans hero, route, cities, days, and meals. |
| 5 | Error prevention | n/a | This read-only itinerary has no destructive or data-entry task. |
| 6 | Recognition rather than recall | 4 | Current date and location stay explicit; meal controls are labeled and counters remain visible. |
| 7 | Flexibility and efficiency | n/a | No expert workflow is relevant to this read/experience surface. |
| 8 | Aesthetic and minimalist design | 3 | The hierarchy is strong; the 14-day length is inherently substantial, though well chunked. |
| 9 | Error recovery | n/a | The surface has no user-generated error path. |
| 10 | Help and documentation | n/a | The itinerary is self-explanatory and has no separate operational task to document. |
| **Total** |  | **22/24** | **Excellent** |

## Design Specificity Verdict

The preview feels authored for this trip rather than interchangeable with another travel page. The date rail behaves like an itinerary strip, modern-city portraits contrast with Guilin and Xingping landscape interludes, and the meal art follows each day’s actual route and cuisine. The mobile city reel is a context-appropriate adaptation rather than a scaled-down desktop sticky panel.

The deterministic scan returned no regex-level findings, but it explicitly ran in degraded mode because `htmlparser2`, `css-select`, `css-tree`, and `domutils` were unavailable. Custom-property, selector, and computed-contrast checks were therefore an undercount. Manual source review and measured contrast were used to close that evidence gap.

## Overall Impression

The visual concept is coherent, memorable, and unusually specific. The largest earlier UX valley—the sticky image consuming a phone screen—is gone. The strongest remaining opportunity is making the few peripheral controls as deliberate as the main itinerary.

## What’s Working

- The hero now has a clear editorial hierarchy and lets the panoramic rail image support rather than compete with the title.
- Desktop keeps the cinematic city continuity, while mobile gets a normal-flow swipe reel with a visible next-card affordance.
- Every day is chunked into one summary, three highlights, and three meal cards; all 126 meal illustrations are uniquely addressed.

## Priority Issues

### [P2] Peripheral links need full touch targets

- **Why it matters:** The brand/home link and footer back-to-top link are visually clear but their text-sized hit areas are smaller than the 44px mobile target used elsewhere.
- **Fix:** Give both controls a 44px minimum block size without changing their visual weight.
- **Suggested command:** `$impeccable polish`

### [P3] The mobile date rail’s horizontal affordance is implicit

- **Why it matters:** The cropped run of dates suggests overflow, but a distracted first-time visitor may not immediately realize the strip can be swiped.
- **Fix:** Add a quiet edge fade while preserving automatic centering of the active date.
- **Suggested command:** `$impeccable clarify`

## Persona Red Flags

- **Jordan, first-timer:** The page purpose and route are immediate; the only hesitation is whether the top date strip scrolls horizontally.
- **Sam, accessibility-dependent:** Heading order, alt text, labels, visible focus, and measured text contrast are strong. The remaining touch-target issue also affects users with limited motor precision.
- **Casey, distracted mobile user:** The sticky obstruction is resolved and city assets are compressed. The implicit date-strip gesture is the remaining discoverability cost.

## Minor Observations

- The page is long by design, but the repeated three-item meal structure keeps working-memory demand low.
- The original hard-offset shadows and monospace labels are justified by the committed pixel-journal world and remain consistent.
- Image loading is now bounded: six displayed route scenes total about 2 MB, and meal art is WebP with dimensions and lazy loading.

## Questions to Consider

- Should the date rail eventually gain city-level grouping, or is day-level immediacy the stronger travel-planning model?
- If the page grows beyond 14 days, would meal detail benefit from progressive disclosure rather than another level of navigation?

Questions skipped: 2 Priority Issues permitted the skip, and the user already requested that all review feedback be incorporated.
