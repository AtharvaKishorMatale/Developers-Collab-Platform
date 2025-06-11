pipeline {
    agent any

    environment {
        TF_DIR = 'terraform-infra'
        ANSIBLE_DIR = 'ansible-demo'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'git@github.com:AtharvaKishorMatale/DevelopersCollabPlatform.git'
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir("${env.TF_DIR}") {
                    sh 'terraform init'
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                dir("${env.ANSIBLE_DIR}") {
                    sh 'ansible-playbook -i inventory playbook.yml'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
