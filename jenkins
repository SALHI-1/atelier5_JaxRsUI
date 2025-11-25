pipeline {
    agent any

    environment {
        // Smiyat l-image (beddel 'mon-user' b username dyalek f dockerhub)
        DOCKER_IMAGE = 'saaymo/frontend-service'
        // Tag dynamic (b numéro d build) bach t-eviter caching problems
        DOCKER_TAG = "${BUILD_NUMBER}"
        REGISTRY_CREDENTIALS_ID = 'CRED-DOCK'
    }

    stages {
        stage('Checkout') {
            steps {
                // Jab l-code mn GitHub/GitLab
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '🏗️ Building Docker Image...'
                    // Hna kan-bniw l-image b smiya w tag
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    // Kan-ziydo tag 'latest'
                    sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    echo '🚀 Pushing to Docker Hub...'
                    // Kan-sta3mlo credentials bach n-connectaw
                    withDockerRegistry(credentialsId: "${REGISTRY_CREDENTIALS_ID}", toolName: 'docker') {
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                script {
                    echo '☸️ Deploying to Kubernetes...'
                    // Hna kayn 2 toro9:
                    // 1. Update YAML file (GitOps - Recommandé)
                    // 2. Commande kubectl (Direct - Sahel l-bdya)
                    
                    // Exemple b kubectl direct:
                    withKubeConfig([credentialsId: 'CRED-KUBE']) {
                        // Khassek tkon 3ndek fichier deployment.yaml f repo
                        // Kan-remplaciw l-image placeholder b l-image jdida
                        sh "sed -i 's|IMAGE_PLACEHOLDER|${DOCKER_IMAGE}:${DOCKER_TAG}|g' k8s/deployment.yaml"
                        sh "kubectl apply -f k8s/deployment.yaml"
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Nqqi l-docker images bach may3mrch disque
            sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
            sh "docker rmi ${DOCKER_IMAGE}:latest || true"
        }
        success {
            echo '✅ ALL GOOD!'
        }
        failure {
            echo '❌ Pipeline Khssrat!'
        }
    }
}
