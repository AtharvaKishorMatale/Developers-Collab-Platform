provider "aws" {
  region = var.region
}

resource "aws_instance" "dev_server" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key_name

  tags = {
    Name = "DevPlatformInstance"
  }

  provisioner "local-exec" {
    command = "echo [dev] ${self.public_ip} > ${var.inventory_file_path}"
  }
}

