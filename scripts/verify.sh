#!/usr/bin/env bash
# Coded done-condition gate for the Taxation Laws & Practice landing page.
# Exits non-zero on any hard failure.
set -uo pipefail
cd "$(dirname "$0")/.."

FAIL=0
fail() { echo "FAIL: $1"; FAIL=1; }
pass() { echo "PASS: $1"; }

echo "== Build =="
npx tsc --noEmit >/tmp/vls_tsc.log 2>&1 && pass "TypeScript" || { fail "TypeScript"; cat /tmp/vls_tsc.log; }
npm run lint >/tmp/vls_lint.log 2>&1 && pass "Lint" || { fail "Lint"; cat /tmp/vls_lint.log; }
npm run build >/tmp/vls_build.log 2>&1 && pass "Production build" || { fail "Production build"; cat /tmp/vls_build.log; }

echo "== Required content strings (src/) =="
REQUIRED=(
  "Taxation Laws & Practice"
  "28 August 2026"
  "₹499"
  "Direct Tax"
  "Indirect Tax"
  "Constitutional"
  "Annual Financial Statement"
  "Finance Act"
  "Appropriation Act"
  "Consolidated Fund"
  "Public Account"
  "Comptroller and Auditor General"
  "Finance Commission"
  "Centre-State Financial Relations"
  "GST Council"
  "101st Constitutional Amendment"
  "Assessment"
  "Commissioner of Income Tax"
  "Income Tax Appellate Tribunal"
  "ITAT"
  "CESTAT"
  "GST Appellate Tribunal"
  "High Court"
)
for term in "${REQUIRED[@]}"; do
  if grep -rq --include="*.tsx" --include="*.ts" -F "$term" src/; then
    pass "content: $term"
  else
    fail "missing required content: $term"
  fi
done

echo "== Forbidden / unsupported claims (src/) =="
FORBIDDEN=(
  "ITR filing"
  "GST return filing"
  "bookkeeping"
  "transfer pricing"
  "international taxation"
  "guaranteed career"
  "guaranteed income"
  "become a tax expert"
  "Announcing soon"
  "To be announced"
)
for term in "${FORBIDDEN[@]}"; do
  if grep -rq --include="*.tsx" --include="*.ts" -F "$term" src/; then
    fail "forbidden claim present: $term"
  else
    pass "absent: $term"
  fi
done

echo "== Assets =="
ASSETS=(
  "public/assets/vls/brand/vls-logo.png"
  "public/assets/vls/faculty/dr-sivakumar.png"
  "public/assets/vls/testimonials/testimonial-1.jpg"
  "public/assets/vls/testimonials/testimonial-2.png"
  "public/assets/vls/testimonials/testimonial-3.png"
  "public/assets/vls/classroom/classroom-wide-flowchart.png"
  "public/assets/vls/classroom/classroom-students-notes.jpg"
  "public/assets/vls/classroom/classroom-faculty-teaching.jpg"
  "public/assets/vls/classroom/classroom-legal-content.jpg"
)
for asset in "${ASSETS[@]}"; do
  if [ -f "$asset" ]; then
    pass "asset: $asset"
  else
    fail "missing asset: $asset"
  fi
done

echo "== Structure =="
H1_COUNT=$(grep -rc "<h1" src/app/ src/components/ 2>/dev/null | awk -F: '{sum+=$2} END {print sum+0}')
[ "$H1_COUNT" -eq 1 ] && pass "exactly one <h1>" || fail "expected exactly one <h1>, found $H1_COUNT"

FACULTY_USES=$(grep -c "<Faculty " src/app/page.tsx 2>/dev/null || true)
FACULTY_USES=${FACULTY_USES:-0}
[ "$FACULTY_USES" -eq 1 ] && pass "Faculty section rendered exactly once" || fail "expected exactly one <Faculty /> in page.tsx, found $FACULTY_USES"

TESTIMONIALS_USES=$(grep -c "<Testimonials " src/app/page.tsx 2>/dev/null || true)
TESTIMONIALS_USES=${TESTIMONIALS_USES:-0}
[ "$TESTIMONIALS_USES" -eq 1 ] && pass "Testimonials section rendered exactly once" || fail "expected exactly one <Testimonials /> in page.tsx, found $TESTIMONIALS_USES"

for anchor in "#waitlist" "#curriculum" "#faculty" "#faqs" "#why-this-course"; do
  if grep -rq --include="*.tsx" -F "id=\"${anchor#\#}\"" src/; then
    pass "anchor target exists: $anchor"
  else
    fail "anchor target missing: $anchor"
  fi
done

grep -rq "role=\"region\"" src/components/Faq.tsx && pass "FAQ accordion present" || fail "FAQ accordion missing"
grep -rq "htmlFor=" src/components/WaitlistForm.tsx && pass "form controls have labels" || fail "form controls missing labels"

echo "=================================="
if [ "$FAIL" -eq 0 ]; then
  echo "VERIFY: ALL CHECKS PASSED"
  exit 0
else
  echo "VERIFY: HARD FAILURES PRESENT"
  exit 1
fi
