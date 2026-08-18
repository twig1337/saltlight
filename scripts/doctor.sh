#!/usr/bin/env bash
# Site OS doctor — secret scan + basic hygiene.
# Usage: ./scripts/doctor.sh [path-to-client-repo]
# Exit 1 on findings.

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

echo "== Site OS doctor: $(pwd) =="

FAIL=0
EXCLUDES=( --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude-dir=dist --exclude-dir=build )

ok()  { echo "ok:   $1"; }
bad() { echo "FAIL: $1"; FAIL=1; }

# Filenames that must not exist (secret material class)
mapfile -t BAD_FILES < <(find . -type f \( \
  -name 'credentials' -o -name 'credentials.*' -o -name 'not-amplify-creds' \
  -o \( -name '*.pem' ! -name '*.pem.pub' \) \
\) -not -path './node_modules/*' -not -path './.git/*' -not -path './.next/*' -print 2>/dev/null || true)

if ((${#BAD_FILES[@]})); then
  bad "forbidden credential filenames"
  printf '%s\n' "${BAD_FILES[@]}" | head -n 40
else
  ok "forbidden credential filenames"
fi

# AWS access key id pattern (also catches URL-encoded meta tags)
if grep -RInE "${EXCLUDES[@]}" --exclude='*.lock' -e 'AKIA[0-9A-Z]{16}' . 2>/dev/null | head -n 20 | grep -q .; then
  bad "AKIA access key pattern in files"
  grep -RInE "${EXCLUDES[@]}" --exclude='*.lock' -e 'AKIA[0-9A-Z]{16}' . 2>/dev/null | head -n 20 || true
else
  ok "AKIA access key pattern in files"
fi

# Private key blocks
if grep -RInE "${EXCLUDES[@]}" -e 'BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY' . 2>/dev/null | head -n 20 | grep -q .; then
  bad "PEM private key blocks"
  grep -RInE "${EXCLUDES[@]}" -e 'BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY' . 2>/dev/null | head -n 20 || true
else
  ok "PEM private key blocks"
fi

# Browser AWS config patterns (literal JS)
if grep -RInE "${EXCLUDES[@]}" \
  -e 'accessKeyId[[:space:]]*:[[:space:]]*["'"'"']AKIA' \
  -e 'AWS\.config\.update' \
  -e 'secretAccessKey[[:space:]]*:[[:space:]]*["'"'"']' \
  . 2>/dev/null | head -n 20 | grep -q .; then
  bad "browser AWS key config patterns"
  grep -RInE "${EXCLUDES[@]}" \
    -e 'accessKeyId[[:space:]]*:[[:space:]]*["'"'"']AKIA' \
    -e 'AWS\.config\.update' \
    -e 'secretAccessKey[[:space:]]*:[[:space:]]*["'"'"']' \
    . 2>/dev/null | head -n 20 || true
else
  ok "browser AWS key config patterns"
fi

# .env tracked by git (except example) — local .env.local is fine if gitignored
mapfile -t ENV_FILES < <(git ls-files '.env' '.env.*' 2>/dev/null | grep -v '^\.env\.example$' || true)
if ((${#ENV_FILES[@]})); then
  bad "git-tracked .env files"
  printf '%s\n' "${ENV_FILES[@]}" | head -n 40
else
  ok "git-tracked .env files"
fi

if [[ -f package.json ]]; then
  if ! grep -q '"lint"' package.json; then
    echo "WARN: package.json missing lint script"
  fi
  if [[ ! -f .nvmrc ]]; then
    echo "WARN: no .nvmrc (prefer Node 22)"
  fi
fi

if [[ ! -f AGENTS.md ]]; then
  echo "WARN: no AGENTS.md"
fi

if [[ "$FAIL" -ne 0 ]]; then
  echo "== doctor FAILED =="
  exit 1
fi

echo "== doctor clean =="
exit 0
