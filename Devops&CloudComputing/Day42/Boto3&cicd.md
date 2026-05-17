Static Website Deployment Guide (Boto3 + GitHub Actions)
-----------------------------------------------------------
In this project, we will learn how to move your website code from GitHub to AWS automatically.
Instead of clicking buttons in the AWS Console, we will use **Boto3** to do the work for us.
-----------------------------------------------------------
## Step 1: Prepare the S3 Bucket (The Home for your Site)

- Think of an S3 Bucket as a folder on the internet that stays "on" 24/7.

1.**Create a Bucket:** Log in to AWS S3 and click "Create Bucket." Give it a unique name.
2.**Turn Off Public Block:** In the Permissions tab, Uncheck "Block all public access." This allows people to see your website.Right now, it's just a folder. We need to tell AWS to serve it like a website.
3.**Turn on Website Hosting:** In the Properties tab, scroll to the bottom and Enable "Static website hosting." Type `index.html` in the Index document box.
4.  **Set the Rules:** Go to the Permissions tab -> Bucket Policy -> Edit. Paste this code so people can read your files: but replace `YOUR_BUCKET_NAME_HERE` with your actual bucket name.
```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Sid": "PublicRead",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::boto3-frontend-project/*"
    }]
}
```
---------------------------------------------------------------
## Step 2: (a).The Python Script (deploy.py)- Only for static files (HTML, CSS, images)

This script is the "worker." It looks at your files and pushes them to AWS. 
Create a file named deploy.py in your project folder.
```python

import boto3
import os
import mimetypes

# 1. Tell the script which bucket to use
BUCKET_NAME = os.environ.get('boto3-frontend-project')

s3 = boto3.client('s3')

def upload_files():
    print("Starting deployment...")
    
    # 2. Look through all files in your folder
    for root, dirs, files in os.walk('.'):
        for file in files:
            # Skip the script and hidden git files
            if file == 'deploy.py' or '.git' in root:
                continue
                
            file_path = os.path.join(root, file)
            s3_key = os.path.relpath(file_path, '.')

            # 3. Figure out if the file is HTML, CSS, or an image
            content_type, _ = mimetypes.guess_type(file_path)
            
            # 4. Upload to AWS
            s3.upload_file(
                file_path, 
                BUCKET_NAME, 
                s3_key,
                ExtraArgs={'ContentType': content_type or 'text/plain'}
            )
            print(f"Uploaded: {s3_key}")

if __name__ == "__main__":
    upload_files()
```
## (b).Frontend Deployment (React, Vue, Vite)
If you have a frontend project (like React or Vue), you need to build it first.
Add this to your deploy.py before the upload_files function:

```python
import boto3
import os
import mimetypes

# Configuration
BUCKET_NAME = os.environ.get('AWS_S3_BUCKET')
BUILD_DIR = './dist' # Use './build' for React (CRA) or './dist' for Vite/Vue

s3 = boto3.client('s3')

def upload_files():
    print(f"Starting deployment from {BUILD_DIR}...")
    for root, dirs, files in os.walk(BUILD_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            s3_key = os.path.relpath(file_path, BUILD_DIR)
            content_type, _ = mimetypes.guess_type(file_path)
            
            s3.upload_file(
                file_path, 
                BUCKET_NAME, 
                s3_key,
                ExtraArgs={'ContentType': content_type or 'text/plain'}
            )
            print(f"Uploaded: {s3_key}")

if __name__ == "__main__":
    upload_files()

  ```

## Step 3:(a) The Automation Pipeline (main.yml)-for static files and frontend projects(html, css, js, images)
We want this script to run every time we save our code. We use GitHub Actions for this. 
Create a folder .github/workflows and put a file named main.yml inside it.

```yaml
name: My Auto Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4 # Gets your code
      
      - name: Install Python and Boto3
        run: |
          pip install boto3

      - name: Run the script
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: 'us-east-1'
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        run: python deploy.py
```
## (b).GitHub Actions Workflow (frontend.yml) for frontend projects (React, Vue, Vite)
This pipeline automates the installation, building, and uploading of your frontend app.
```yaml
name: Frontend Framework Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Build Project
        run: |
          npm install
          npm run build
      - name: Install Python & Boto3
        run: pip install boto3
      - name: Execute Deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: 'us-east-1'
        run: python deploy.py

```
## Step 4:Backend Deployment (Node.js & Docker)
Backend applications require a persistent environment to handle API requests.
We use Docker to package the application with its dependencies, ensuring it runs identically on your local machine and the AWS EC2 server.
Steps:-
## 1. Create the Dockerfile:
This file defines the environment your Node.js app needs to run.
```Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```
## 2.GitHub Actions Workflow (backend.yml)
This pipeline builds your Docker image, pushes it to Docker Hub, and then SSHs into your EC2 instance to restart the service with the new code.

```yaml
name: Backend Docker Deploy
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Login to Docker Hub
        run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
      - name: Build and Push Image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/backend-app:latest .
          docker push ${{ secrets.DOCKER_USERNAME }}/backend-app:latest
      - name: Deploy to EC2 via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            docker pull ${{ secrets.DOCKER_USERNAME }}/backend-app:latest
            docker stop backend-container || true
            docker rm backend-container || true
            docker run -d --name backend-container -p 80:3000 ${{ secrets.DOCKER_USERNAME }}/backend-app:latest

```
-------------------------------------------------------------
## Step 5: Connecting GitHub to AWS

GitHub needs permission to talk to your AWS account.
In your GitHub repository, go to Settings -> Secrets and variables -> Actions.
Click New repository secret.
Add AWS_ACCESS_KEY_ID (from your AWS IAM user).
Add AWS_SECRET_ACCESS_KEY (from your AWS IAM user).
Add AWS_S3_BUCKET (from your AWS S3 bucket).
-----------------------------------------------------------
## The live link you can share with the world is:  
http://YOUR_BUCKET_NAME_HERE.s3-website-us-east-1.amazonaws.com

Once everything is set up, you can test it by making a change to your code and pushing it to GitHub.
Watch the Actions tab to see the deployment in action!
------------------------------------------------------------
## Q.How it works? (The Big Picture)
You write code (HTML/CSS) and git push to GitHub.
GitHub sees the push and starts a virtual computer.
The virtual computer runs your deploy.py script.
Boto3 sends your files to the S3 Bucket.
Your website is updated instantly for the world to see!
-----------------------------------------------------------