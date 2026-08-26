# SaltLight hosting — OpenTofu adoption

## Problem

Amplify app `d5k5apws4oy45`, IAM role, Route 53 zone `Z02214842GQF969KCVQ9B`, and domain association were console/CLI snowflakes.

## Slice

Import existing resources into `terraform/` matching live config (brochure: no Gen 2 backend deploy policy; `main` only; Porkbun registrar). No recreate. `tofu plan` after import: tag-only, 0 destroy.

## Out of scope

Dev branch, webhooks, SES identity, uptime (already live).
