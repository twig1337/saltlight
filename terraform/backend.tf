terraform {
  backend "s3" {
    bucket  = "terraform-statz"
    key     = "saltlight/iam/terraform.tfstate"
    region  = "us-west-2"
    encrypt = true
    profile = "personal"
  }
}
