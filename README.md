# Innovaxel Assessment — Employee Access Simulator

## Overview
This project simulates employee access to secure rooms in a building.  
Each room has access levels, open/close times, and cooldown periods.  
The simulator shows which employees are granted or denied access with reasons.

## Files in this branch
- `index.html` — Frontend UI, shows employee table and results.
- `style.css` — Styling for the simulator.
- `script.js` — JavaScript logic for access simulation.
- `data.json` — Employee data (access level, request time, room).
- `README.md` — This file.

## How It Works
1. Load `data.json` (employee list with access info).
2. Click **Simulate Access** button in the UI.
3. The result section shows for each employee:
   - **Granted** or **Denied**
   - Reason (e.g., below access level, room closed, cooldown not finished)

### Room Rules
| Room       | Min Access Level | Open Time | Close Time | Cooldown (minutes) |
|------------|-----------------|-----------|------------|------------------|
| ServerRoom | 2               | 09:00     | 11:00      | 15               |
| Vault      | 3               | 09:00     | 10:00      | 30               |
| R&D Lab    | 1               | 08:00     | 12:00      | 10               |

## How to Run
1. Open `index.html` in a browser.
2. Click **Simulate Access** button.
3. View the results below the button.

## Notes
- All processing happens in the browser (no backend required).
- Any changes to the files should be committed with concise messages (≤ 7 words).
- The dev branch contains all project code; main branch only has a minimal README.
