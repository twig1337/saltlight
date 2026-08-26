variable "aws_profile" {
  description = "AWS shared-config profile. Use personal-admin for IAM GetRole/PassRole refresh."
  type        = string
  default     = "personal"
}

variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "us-west-2"
}

variable "aws_account_id" {
  description = "AWS account ID."
  type        = string
  default     = "758946988348"
}

variable "domain_name" {
  description = "Canonical production hostname. Registrar stays at Porkbun; Route 53 is DNS only."
  type        = string
  default     = "saltlight.dev"
}

variable "sentry_dsn" {
  description = "Sentry DSN for error reporting. Used by both client (NEXT_PUBLIC_SENTRY_DSN) and server (SENTRY_DSN)."
  type        = string
  sensitive   = true
}

variable "sentry_auth_token" {
  description = "Sentry auth token for source map uploads during builds (SENTRY_AUTH_TOKEN)."
  type        = string
  sensitive   = true
  default     = ""
}

variable "github_token" {
  description = "GitHub personal access token with repo scope. Used by Amplify to clone the repository."
  type        = string
  sensitive   = true
}

variable "contact_to_email" {
  description = "Inbox for public contact-form submissions."
  type        = string
  default     = "taellsworth@gmail.com"
}

variable "contact_from_email" {
  description = "SES From address for contact-form mail. Must be a verified identity."
  type        = string
  default     = "taellsworth@gmail.com"
}
