terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      project = "saltlight"
      managed = "site-os"
    }
  }
}

# ── IAM role ────────────────────────────────────────────────────────────────
#
# Console-created service+compute role. Brochure profile: no Gen 2 backend
# deploy policy. Import existing; do not recreate.

resource "aws_iam_role" "amplify_compute" {
  name        = "SaltLight-AmplifyComputeRole"
  path        = "/service-role/"
  description = "Amplify service+compute for saltlight.dev SSR logs and SES contact"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "amplify.amazonaws.com" }
        Action    = "sts:AssumeRole"
        Condition = {
          StringEquals = {
            "aws:SourceAccount" = var.aws_account_id
          }
          ArnLike = {
            "aws:SourceArn" = "arn:aws:amplify:*:${var.aws_account_id}:apps/*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "ssr_and_ses" {
  name = "SaltLightAmplifySSRAndSES"
  role = aws_iam_role.amplify_compute.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AmplifySSRLogging"
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:DescribeLogGroups",
          "logs:PutLogEvents",
        ]
        Resource = [
          "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/amplify/*",
          "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/amplify/*:log-stream:*",
        ]
      },
      {
        Sid    = "SesContactForm"
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail",
        ]
        Resource = "*"
        Condition = {
          StringEquals = {
            "ses:FromAddress" = var.contact_from_email
          }
        }
      }
    ]
  })
}

# ── Amplify app ───────────────────────────────────────────────────────────────
# Brochure: build spec lives in repo amplify.yml (do not inline here).

resource "aws_amplify_app" "saltlight" {
  name       = "saltlight"
  repository = "https://github.com/twig1337/saltlight"

  access_token = var.github_token

  platform             = "WEB_COMPUTE"
  iam_service_role_arn = aws_iam_role.amplify_compute.arn
  compute_role_arn     = aws_iam_role.amplify_compute.arn

  environment_variables = {
    NEXT_PUBLIC_SITE_NAME          = "SaltLight"
    NEXT_PUBLIC_SITE_URL           = "https://${var.domain_name}"
    NEXT_PUBLIC_SITE_TAGLINE       = "Practical websites for churches, civic groups, and small businesses."
    NEXT_PUBLIC_SITE_DESCRIPTION   = "SaltLight builds and cares for clear, reliable websites - without the agency markup."
    NEXT_PUBLIC_OWNER_NAME         = "Thomas Ellsworth"
    NEXT_PUBLIC_OWNER_EMAIL        = "taellsworth@gmail.com"
    NEXT_PUBLIC_LOCATION           = "Raymore, Missouri"
    NEXT_PUBLIC_SEO_POSTURE        = "baseline"
    NEXT_PUBLIC_SENTRY_DSN         = var.sentry_dsn
    NEXT_PUBLIC_SENTRY_ENVIRONMENT = "production"
    NEXT_PUBLIC_SENTRY_RELEASE     = "$AWS_COMMIT_ID"
    SENTRY_DSN                     = var.sentry_dsn
    SENTRY_ORG                     = "edev"
    SENTRY_PROJECT                 = "saltlight"
    NEXT_PUBLIC_UMAMI_URL          = "https://umami.64.181.205.247.sslip.io"
    NEXT_PUBLIC_UMAMI_WEBSITE_ID   = "7960cd49-7365-46af-8627-52b9eb099fa2"
    CONTACT_TO_EMAIL               = var.contact_to_email
    CONTACT_FROM_EMAIL             = var.contact_from_email
    SES_REGION                     = var.aws_region
  }

  custom_rule {
    source = "https://www.${var.domain_name}/<*>"
    target = "https://${var.domain_name}/<*>"
    status = "301"
  }

  custom_rule {
    source = "/<*>"
    target = "/.amplify/redirects/<*>"
    status = "404-200"
  }

  cache_config {
    type = "AMPLIFY_MANAGED_NO_COOKIES"
  }

  job_config {
    build_compute_type = "STANDARD_8GB"
  }

  lifecycle {
    ignore_changes = [
      access_token,
    ]
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.saltlight.id
  branch_name = "main"

  framework         = "Next.js - SSR"
  stage             = "PRODUCTION"
  enable_auto_build = true

  environment_variables = {
    NEXT_PUBLIC_SITE_NAME          = "SaltLight"
    NEXT_PUBLIC_SITE_URL           = "https://${var.domain_name}"
    NEXT_PUBLIC_SITE_TAGLINE       = "Practical websites for churches, civic groups, and small businesses."
    NEXT_PUBLIC_SITE_DESCRIPTION   = "SaltLight builds and cares for clear, reliable websites - without the agency markup."
    NEXT_PUBLIC_OWNER_NAME         = "Thomas Ellsworth"
    NEXT_PUBLIC_OWNER_EMAIL        = "taellsworth@gmail.com"
    NEXT_PUBLIC_LOCATION           = "Raymore, Missouri"
    NEXT_PUBLIC_SEO_POSTURE        = "baseline"
    NEXT_PUBLIC_SENTRY_ENVIRONMENT = "production"
    NEXT_PUBLIC_UMAMI_URL          = "https://umami.64.181.205.247.sslip.io"
    NEXT_PUBLIC_UMAMI_WEBSITE_ID   = "7960cd49-7365-46af-8627-52b9eb099fa2"
    CONTACT_TO_EMAIL               = var.contact_to_email
    CONTACT_FROM_EMAIL             = var.contact_from_email
    SES_REGION                     = var.aws_region
  }
}

# ── DNS (split-brain) ─────────────────────────────────────────────────────────
# Registrar stays at Porkbun. SaltLight operates DNS via this hosted zone.
# Do not declare apex/www/ACM records — Amplify writes those when the
# domain association is in-account (site-os RUNBOOKS/dns-split-brain.md).

resource "aws_route53_zone" "primary" {
  name    = var.domain_name
  comment = "SaltLight practice — split-brain DNS (registrar Porkbun)"
}

resource "aws_amplify_domain_association" "primary" {
  app_id                = aws_amplify_app.saltlight.id
  domain_name           = var.domain_name
  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }

  depends_on = [aws_route53_zone.primary]
}
