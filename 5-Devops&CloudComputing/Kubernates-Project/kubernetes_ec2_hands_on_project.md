# Kubernetes Hands-on Project on AWS EC2:
This project is designed for beginners who have already studied Kubernetes theoretically and now want to do a simple hands-on project on an AWS EC2 instance.
---------------------------------------------------------------------------------
## Project Flow

```text
Frontend Project
      ↓
Docker Image
      ↓
Docker Hub
      ↓
EC2 Server
      ↓
Kubernetes Cluster using K3s
      ↓
Pod
      ↓
Deployment
      ↓
Service
      ↓
Access app from browser
```
For a beginner, we will use **K3s** on EC2 instead of a full `kubeadm` setup.
K3s is still Kubernetes, but it is lightweight and easy to install. It is very useful for learning Kubernetes on a single EC2 instance.
--------------------------------------------------------------------------------
## 1. AWS EC2 Setup

Create one EC2 instance.
Recommended configuration:
```text
AMI: Ubuntu 22.04 or Ubuntu 24.04
Instance type: t2.medium or t3.medium
Storage: 20 GB minimum
```
Security Group ports:

```text
SSH: 22
Frontend App: 30080
```
For learning, one EC2 instance is enough. We will create a **single-node Kubernetes cluster**.
-------------------------------------------------------------------------------
## 2. Connect to EC2
From your local system, connect to the EC2 instance:

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```
Now update the server:

```bash
sudo apt update -y
sudo apt upgrade -y
```
------------------------------------------------------------------------------
## 3. Install Docker on EC2

Run these commands:
```bash
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```
Now logout from EC2:
```bash
exit
```
Then SSH again into the EC2 instance.

Check Docker version:

```bash
docker --version
```
-----------------------------------------------------------------------------
## 4. Install Kubernetes using K3s

Run this command on EC2:

```bash
curl -sfL https://get.k3s.io | sh -
```
Check the cluster status:

```bash
sudo k3s kubectl get nodes
```
You should see output like this:

```text
NAME        STATUS   ROLES
ip-xxx      Ready    control-plane,master
```
To use `kubectl` directly without writing `sudo k3s kubectl` again and again, run:

```bash
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
chmod 600 ~/.kube/config
export KUBECONFIG=~/.kube/config
```
Now test:

```bash
kubectl get nodes
```
-----------------------------------------------------------------------------
## 5. Create Frontend Project Files Directly on EC2

Sometimes the project files are visible in VS Code Explorer, but they may not be present inside the EC2 server.

To confirm this, run:

```bash
pwd
ls
```
If `ls` does not show your frontend files, it means your files are not present on EC2.

So, we will create a simple frontend project directly on the EC2 instance.

Create a new project folder:

```bash
mkdir kubernates-fronted-project
cd kubernates-fronted-project
```
Now create `index.html`:

```bash
cat > index.html <<'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Kubernetes Frontend Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello from Kubernetes</h1>
    <p>This frontend app is running inside a Kubernetes Pod.</p>

    <button onclick="showMessage()">Click Me</button>

    <p id="message"></p>

    <script src="script.js"></script>
</body>
</html>
EOF
```
Create `style.css`:

```bash
cat > style.css <<'EOF'
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 100px;
    background-color: #f4f4f4;
}

h1 {
    color: #2563eb;
}

p {
    font-size: 18px;
}

button {
    padding: 10px 20px;
    background-color: #2563eb;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}
EOF
```

Create `script.js`:

```bash
cat > script.js <<'EOF'
function showMessage() {
    document.getElementById("message").innerText =
        "Kubernetes project is working successfully!";
}
EOF
```

Now create the `Dockerfile`:

```bash
cat > Dockerfile <<'EOF'
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF
```

Check whether all files are created properly:

```bash
ls
```

You should see:

```text
Dockerfile  index.html  script.js  style.css
```
------------------------------------------------------------------------------------
## 6. Build Docker Image on EC2

Now build the Docker image from the same folder where the `Dockerfile` is present.

Make sure you are inside the project folder:

```bash
pwd
```

You should be inside:

```text
/home/ubuntu/kubernates-fronted-project
```

Now build the Docker image:

```bash
sudo docker build -t devopslearner07/frontend-k8s-demo:v1 .
```
Here:

```text
devopslearner07 = Docker Hub username
frontend-k8s-demo = image name
v1 = image version/tag
```

Check whether the image is created:

```bash
sudo docker images
```
----------------------------------------------------------------------------------
## 7. Test Docker Container Before Kubernetes

Before deploying to Kubernetes, first test whether the Docker container is working properly.

Run the container:

```bash
sudo docker run -d -p 8081:80 devopslearner07/frontend-k8s-demo:v1
```

Now open this in your browser:

```text
http://EC2_PUBLIC_IP:8081
```

Make sure port `8080` is open in your EC2 Security Group.

If the frontend page opens successfully, it means the Docker image is working.

Check running containers:

```bash
sudo docker ps
```

Stop the test container:

```bash
sudo docker stop container_id
```
Replace `container_id` with the actual container ID shown by `docker ps`.
-----------------------------------------------------------------------------
## 8. Push Docker Image to Docker Hub

Login to Docker Hub:

```bash
sudo docker login
```

Push the image:

```bash
sudo docker push devopslearner07/frontend-k8s-demo:v1
```

Now your image is available on Docker Hub, and Kubernetes can pull it from there.

-----------------------------------------------------------------------------
## 9. Create Kubernetes Deployment File

Now create `deployment.yaml` in the same project folder:

```bash
nano deployment.yaml
```

Paste this content:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
  labels:
    app: frontend-app

spec:
  replicas: 2

  selector:
    matchLabels:
      app: frontend-app

  template:
    metadata:
      labels:
        app: frontend-app

    spec:
      containers:
        - name: frontend-container
          image: devopslearner07/frontend-k8s-demo:v1
          ports:
            - containerPort: 80
```
Save and exit:

```text
CTRL + O
ENTER
CTRL + X
```
Apply the Deployment:

```bash
kubectl apply -f deployment.yaml
```

Check Deployment:

```bash
kubectl get deployments
```
Check Pods:

```bash
kubectl get pods
```

You should see 2 Pods running because we used:

```yaml
replicas: 2
```

If the Pods are not running, check details:

```bash
kubectl describe pod pod-name
```
You can also check logs:

```bash
kubectl logs pod-name
```

---

## 10. Create Kubernetes Service File

Now create `service.yaml`:

```bash
nano service.yaml
```

Paste this content:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service

spec:
  type: NodePort

  selector:
    app: frontend-app

  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```
Save and exit:

```text
CTRL + O
ENTER
CTRL + X
```

Apply the Service:

```bash
kubectl apply -f service.yaml
```

Check Service:

```bash
kubectl get svc
```

Now open your application in browser:

```text
http://EC2_PUBLIC_IP:30080
```

Make sure port `30080` is open in your EC2 Security Group.

------------------------------------------------------------------------------------

## 11. Final Kubernetes Check

Check all Kubernetes resources:

```bash
kubectl get all
```
You should see:

```text
Pods
Deployment
ReplicaSet
Service
```
This means your frontend application is now running inside Kubernetes.

The request flow is:

```text
Browser
  ↓
EC2 Public IP:30080
  ↓
Kubernetes NodePort Service
  ↓
Frontend Pod
  ↓
Frontend Container
  ↓
Nginx serving index.html
```

-----------------------------------------------------------------------------------
## 12. Test Kubernetes Auto-Healing

Check Pods:

```bash
kubectl get pods
```

Delete one Pod:

```bash
kubectl delete pod pod-name
```

Now check Pods again:

```bash
kubectl get pods
```

You will see that Kubernetes automatically creates a new Pod.

This happens because the Deployment is responsible for maintaining the desired number of Pods.

Since we wrote:

```yaml
replicas: 2
```

Kubernetes will always try to keep 2 Pods running.

---

## 13. Scale the Deployment

Increase the number of Pods from 2 to 3:

```bash
kubectl scale deployment frontend-deployment --replicas=3
```

Check Pods:

```bash
kubectl get pods
```

Now you should see 3 Pods running.

This is called scaling in Kubernetes.
-------------------------------------------------------------------------------
## Final Simple Architecture

```text
                User Browser
                    |
                    | http://EC2_PUBLIC_IP:30080
                    |
              EC2 Security Group
                    |
                    v
          Kubernetes NodePort Service
                    |
        ----------------------------
        |                          |
        v                          v
   Frontend Pod 1             Frontend Pod 2
        |                          |
        v                          v
  Frontend Container        Frontend Container
```
