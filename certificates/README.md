# Certificate files

The portfolio gallery is maintained in `../index.html`. It currently links to
the 11 PDFs in `competition/` and `courses/`, uses first-page image previews
from `../assets/certificates/`, and displays them newest first in consistent
4:3 preview frames. All certificate PDFs are oriented for landscape viewing.

## Current files

### Competition and achievement certificates

- `competition/Arduinos_Trial_Certificate.pdf`
- `competition/Final Year Project Certificate.pdf` — Impetus and Concepts '24 Open Hardware, second prize
- `competition/ROBOCON_23_Certificate.pdf`
- `competition/SIH Participation Certificate Design Senior Software Edition.pdf`
- `competition/TechFiesta Hackathon Certificate.pdf` — Agriculture hackathon, second prize

### Course certificates

- `courses/Hardware and ROS2 Control.pdf`
- `courses/Manipulators.pdf`
- `courses/Mapping and Localisation.pdf`
- `courses/Nav2 SLAM and Navigation.pdf`
- `courses/Odometry and Control.pdf`
- `courses/Plan and Navigation.pdf`

To change a card's title, category, date, issuer, or description, edit its
`<article class="cert-card">` in `index.html`. Keep the `data-category` value
as `competition` or `course` so the filter continues to work. Set `data-date`
to `YYYY-MM-DD` when the full date is known, or `YYYY` when the PDF only gives
the year. Update both PDF links in that card if you rename or move its PDF.
Cards with a year-only date are sorted after dated certificates from that year.

Previews are PNGs generated from the first page of each PDF. If you replace a
PDF, regenerate its matching image in `../assets/certificates/` to keep the
gallery preview in sync.
