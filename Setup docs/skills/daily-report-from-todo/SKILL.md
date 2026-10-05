---
name: daily-report-from-todo
description: Convert the day's todo list into the daily work report scaffold
trigger: "write today's report", "daily report from todo"
do_not_use_for: writing the todo list itself, reports for days with no todo file
inputs: Daily doc/todo_list_Elias_DD-MM-YY.md plus session/git activity for the day
outputs: Daily doc/Daily_Work_Report_Elias_DD-MM-YYYY.md from the Setup docs template
---

1. Read the day's todo list and any carry-overs.
2. Copy `Setup docs/templates/daily_work_report.md` to
   `Daily doc/Daily_Work_Report_Elias_DD-MM-YYYY.md` (date format DD-MM-YYYY).
3. Fill Executive Summary from completed tasks; fill QA checklist from
   deliverables actually produced today (verify on disk, don't guess).
4. Mark final status: Complete / In Progress / Blocked on X.
5. Follow `Setup docs/anti-ai-writing-style.md` — no filler, no cheerleading.

## Eval (must pass before saving)
1. "write today's report" with 3 done tasks → report with 3-6 summary bullets and checked QA items that exist on disk.
2. One task unfinished → status "In Progress", unfinished task named.
3. No todo file for today → asks which day, does not invent content.
4. Output contains "delve" → rewrite until it doesn't.
5. Carry-over items → appear under a Carry-overs heading in tomorrow's todo suggestion.
