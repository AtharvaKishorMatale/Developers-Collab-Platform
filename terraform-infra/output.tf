output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.dev_server.public_ip
}

output "instance_id" {
  description = "The ID of the created EC2 instance"
  value       = aws_instance.dev_server.id
}

