output "compute_role_arn" {
  description = "ARN of the IAM role assigned as the Amplify compute role."
  value       = aws_iam_role.amplify_compute.arn
}

output "compute_role_name" {
  description = "Name of the IAM role assigned as the Amplify compute role."
  value       = aws_iam_role.amplify_compute.name
}

output "amplify_app_id" {
  description = "Amplify app ID."
  value       = aws_amplify_app.saltlight.id
}

output "amplify_default_domain" {
  description = "Default Amplify domain for the app."
  value       = aws_amplify_app.saltlight.default_domain
}

output "amplify_main_url" {
  description = "Amplify hosting URL (main branch)."
  value       = "https://main.${aws_amplify_app.saltlight.default_domain}"
}

output "canonical_url" {
  description = "Public production URL."
  value       = "https://${var.domain_name}"
}

output "hosted_zone_id" {
  description = "Route 53 hosted zone ID. Record in site-os portfolio/CLIENTS.md (no secrets)."
  value       = aws_route53_zone.primary.zone_id
}

output "nameservers" {
  description = "Set these as custom nameservers at Porkbun. Do not transfer the domain."
  value       = aws_route53_zone.primary.name_servers
}
