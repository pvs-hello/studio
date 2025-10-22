pipeline {
    agent any

    environment {
        IMAGE_NAME = "studio-app"
        IMAGE_TAG = "latest"
        CONTAINER_PORT = "9002"
        GITHUB_REPO = "https://github.com/abhiramragu/studio.git"  
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {
        stage('Checkout from GitHub') {
            steps {
                echo "Checking out latest code from GitHub..."
                git branch: 'main',
                    url: "${GITHUB_REPO}"
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image from ${APP_DIR} folder..."
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo "Stopping old container (if any)..."
                script {
                    sh """
                    docker ps -q --filter name=${IMAGE_NAME} | grep -q . && \
                    docker stop ${IMAGE_NAME} && docker rm ${IMAGE_NAME} || true
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                echo "Running new container..."
                sh """
                docker run -d --name ${IMAGE_NAME} -p ${CONTAINER_PORT}:9002 ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Verify Container') {
            steps {
                echo "Checking running containers..."
                sh 'docker ps | grep ${IMAGE_NAME} || echo "Container not found!"'
            }
        }
    }

    post {
        success {
            echo "✅ Build completed successfully. App running at http://localhost:${CONTAINER_PORT}"
        }
        failure {
            echo "❌ Build failed. Check console output for errors."
        }
    }
}