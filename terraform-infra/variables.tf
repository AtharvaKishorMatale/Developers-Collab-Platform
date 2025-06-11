variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "ami" {
  description = "ami id"
  type        = string
  default     = "ami-07b7f66b629de9364"
}

variable "instance_type" {
  description = "t2.micro"
  default     = "t2.micro"
}

variable "key_name" {
  description = "peer"
  type        = string
}

variable "inventory_file_path" {
  description = "inventory file path"
  default     = "../ansible-demo/inventory"
}

