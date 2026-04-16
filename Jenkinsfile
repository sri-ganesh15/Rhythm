pipeline {
  agent any

  environment {
    DOCKER_USER = "sriganesh15"
    BACKEND_IMG = "backend"
    FRONTEND_IMG = "frontend"
  }

  stages {

    stage("Checkout Code") {
      steps {
        git branch: 'main', url: 'https://github.com/sri-ganesh15/Rhythm.git'
      }
    }

    stage("Build Backend Image") {
      steps {
        dir("backend") {
          sh "docker build -t $DOCKER_USER/$BACKEND_IMG:latest ."
        }
      }
    }

    stage("Build Frontend Image") {
      steps {
        dir("frontend") {
          sh "docker build -t $DOCKER_USER/$FRONTEND_IMG:latest ."
        }
      }
    }

    stage("Push Docker Images") {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'Ganesh_DockerId',
          usernameVariable: 'USER',
          passwordVariable: 'PASS'
        )]) {
          sh """
          echo $PASS | docker login -u $USER --password-stdin
          docker push $DOCKER_USER/$BACKEND_IMG:latest
          docker push $DOCKER_USER/$FRONTEND_IMG:latest
          """
        }
      }
    }

    stage("Deploy to Kubernetes") {
      steps {
        sh """
        kubectl apply -f K8s/backend-deployment.yaml
        kubectl apply -f K8s/frontend-deployment.yaml
        kubectl apply -f K8s/Service.yaml
        """
      }
    }
  }
}
