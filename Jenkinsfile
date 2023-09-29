pipeline {
    agent any
    // Environment
    // Share library
    tools {
        nodejs 'nodejs-18.12.1'
    }

    stages {
        stage('Get source code from git') {
            steps {
               git branch: 'main', url: 'https://github.com/visal-sak/Data-Table-Next-js'
                sh '''
                    whoami
                    pwd
                    echo "hi bitch"
                    ls -lrt
                '''
            }
        }
        stage("Build") {
            steps {
                echo "Building Images for deploying"
                // sh "node --version"
                // sh "npm --version"
                // sh "npm install "
                // sh "npm run build"
                // sh "ls -lrt"
                sh 'docker build -t sal01 .'

                // Deploy image to the Docker Hub
                // withCredentials([usernamePassword(credentialsId: 'docker_hub_access_account', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                //     sh '''
                //     docker login -u $USERNAME -p $PASSWORD
                //     docker tag nextjsv1 muyleangin/nextjsv1:1.1
                //     docker push muyleangin/nextjsv1:1.1
                //     '''
                // }
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploy the images"

                // Start containers using Docker Compose
                sh 'docker run -d -p 3002:3000 --name nextjs-sal sal01'
            }
        }
    }
}
