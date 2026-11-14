import type { ContributionDay } from "@/lib/github";

// CSS variables (globals.css) so the cell colours live in one place.
const LEVEL_FILL = ["var(--graph-0)", "var(--graph-1)", "var(--graph-2)", "var(--graph-3)", "var(--graph-4)"] as const;
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 28; // room for weekday labels
const TOP = 18; // room for month labels

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Cell = ContributionDay | null;

function toWeeks(days: ContributionDay[]): Cell[][] {
  const weeks: Cell[][] = [];
  let week: Cell[] = [];
  days.forEach((day, i) => {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay(); // 0 = Sunday
    if (i === 0) week = Array.from({ length: weekday }, () => null);
    week.push(day);
    if (weekday === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);
  return weeks;
}

/** One label per month, placed on the first week column that falls in it. */
function toMonthLabels(weeks: Cell[][]): Array<{ x: number; label: string }> {
  const labels: Array<{ x: number; label: string }> = [];
  let lastMonth = -1;
  weeks.forEach((week, x) => {
    const first = week.find((c): c is ContributionDay => c !== null);
    if (!first) return;
    const month = Number(first.date.slice(5, 7)) - 1;
    if (month === lastMonth) return;
    lastMonth = month;
    // A label this close to the right edge would be clipped (and the month is
    // barely visible there anyway).
    if (x > weeks.length - 3) return;
    labels.push({ x, label: MONTHS[month] });
  });
  return labels;
}

export function ContributionGraph({ days, total }: { days: ContributionDay[]; total: number }) {
  const weeks = toWeeks(days);
  const width = LEFT + weeks.length * STEP;
  const height = TOP + 7 * STEP;
  const monthLabels = toMonthLabels(weeks);

  return (
    <div className="overflow-x-auto pb-2">
      <svg
        role="img"
        aria-label={`Contribution graph: ${total} contributions in the last year`}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block min-w-max"
      >
        {monthLabels.map(({ x, label }) => (
          <text key={`${label}-${x}`} x={LEFT + x * STEP} y={11} className="fill-muted text-[10px]">
            {label}
          </text>
        ))}
        {[
          [1, "Mon"],
          [3, "Wed"],
          [5, "Fri"],
        ].map(([row, label]) => (
          <text
            key={label}
            x={0}
            y={TOP + Number(row) * STEP + CELL - 1}
            className="fill-muted text-[10px]"
          >
            {label}
          </text>
        ))}
        {weeks.map((week, x) =>
          week.map((cell, y) =>
            cell ? (
              <rect
                key={cell.date}
                x={LEFT + x * STEP}
                y={TOP + y * STEP}
                width={CELL}
                height={CELL}
                rx={2.5}
                style={{ fill: LEVEL_FILL[cell.level] }}
              >
                <title>{`${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${cell.date}`}</title>
              </rect>
            ) : null,
          ),
        )}
      </svg>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted">
        Less
        {LEVEL_FILL.map((fill) => (
          <span key={fill} aria-hidden className="size-3 rounded-[3px]" style={{ background: fill }} />
        ))}
        More
      </div>
    </div>
  );
}
