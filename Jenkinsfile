pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/amara200169/Project-Jenkins.git', branch: 'main'
            }
        }

        stage('Clean Apache Folder') {
            steps {
                script {
                    sh 'sudo rm -rf /var/www/html/*'
                }
            }
        }

        stage('Deploy to Apache') {
            steps {
                script {
                    sh 'sudo cp -r * /var/www/html/'
                }
            }
        }
    }
}
