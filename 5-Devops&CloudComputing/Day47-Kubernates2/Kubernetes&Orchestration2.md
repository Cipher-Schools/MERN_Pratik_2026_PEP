# Features of Kubernetes:
1. **Automated Deployment and Scaling**: Automatically deploy and scale applications based on demand.
2. **Self-Healing**: Automatically restarts failed containers, replaces and reschedules them when nodes die, and kills containers that don't respond to user-defined health checks.
3. **Service Discovery and Load Balancing**: Automatically exposes a container using the DNS name or their own IP address and balances the load across them.
4. **Storage Orchestration**: Automatically mounts the storage system of your choice, whether from local storage, public cloud providers, or network storage systems.
5. **Automated Rollouts and Rollbacks**: Automatically roll out changes to your application or its configuration, and roll back to the previous version if something goes wrong.
6. **Secret and Configuration Management**: Manage sensitive information and application configuration without rebuilding your images and without exposing secrets in your stack configuration.
7. **Batch Execution**: Run batch and CI workloads, replacing containers that fail if desired.
8. **Horizontal Scaling**: Scale applications up and down automatically based on CPU usage or other select metrics.
9. **Extensibility**: Kubernetes is highly extensible, allowing users to add custom resources and controllers to manage their applications.
10. **Multi-cloud and Hybrid Cloud Support**: Kubernetes can run on various environments, including on-premises, public clouds, and hybrid cloud setups, providing flexibility in deployment options.
-------------------------------------------------------------------------------------------
# Kubernetes Architecture:+
- Kubernetes follows a master-worker architecture.  
- The master node manages the cluster and the worker nodes run the applications.
1. **Master Node(Control Plane)**: The control plane that manages the cluster. It consists of:
   (a) API Server:
       - Main entry point of Kubernetes
       - Receives all commands from users
       - Communicates with all components

        Ex:- kubectl get pods
        This command first reaches API Server.

   (b) Scheduler: 
       - Decides on which worker node a pod should run based on resource availability and other constraints.
       Ex:- If we have 3 worker nodes and we want to deploy a pod, the scheduler will decide which node is best suited for that pod based on CPU, memory, and other factors.   
       
   (c) Controller Manager:
      -  Runs controllers that regulate the state of the cluster.
      -  For example, the Replication Controller ensures that the desired number of pod replicas are running at all times. 
         If a pod fails,the Replication Controller will create a new one to replace it.
      - Another example is the Node Controller, which monitors the health of worker nodes and takes action if a node becomes unresponsive. 
        If a node fails, the Node Controller will mark it as "NotReady" and reschedule any pods running on that node to other healthy nodes in the cluster.

   (d) etcd: 
      - A key-value store that holds all cluster data. 
      - It is used for storing configuration data, state information, and metadata about the cluster.
      - etcd is a critical component of the Kubernetes control plane, as it provides a reliable and consistent way to store and retrieve cluster information. 
        It is designed to be highly available and fault-tolerant, ensuring that the cluster can continue to operate even if some nodes fail.
        
       Ex:- When you create a new deployment or service, the details of that deployment or service are stored in etcd. 
       If the API Server needs to retrieve information about the current state of the cluster, it will query etcd to get that information.

2. **Worker Nodes**: The machines that run the containerized applications. Each worker node contains:
   (a) Kubelet:
     -  An agent that runs on each node and ensures containers are running in a Pod as expected.
     -  It communicates with the API Server to receive instructions and report back the status of the node and the pods running on it. 
        The Kubelet is responsible for managing the lifecycle of containers on the node, including starting, stopping, and monitoring them to ensure they are healthy and running as expected. 
        If a container fails or becomes unresponsive, the Kubelet will attempt to restart it or report the issue back to the control plane for further action.

        Ex:- If you deploy a new application, the API Server will instruct the Kubelet on the worker nodes to start the necessary containers for that application. 
             The Kubelet will then manage those containers and ensure they are running properly.

   (b) Container Runtime:
     -  Software that runs containers (e.g., Docker, containerd). 
     -  It is responsible for pulling container images, starting and stopping containers, and managing container resources on the node. 
        The Container Runtime provides the necessary environment for containers to run and interact with the underlying operating system and hardware resources. 
        It also handles tasks such as image management, container lifecycle management, and resource isolation to ensure that containers run efficiently and securely on the worker nodes.
    
     Ex:- When you deploy a new application, the Kubelet will instruct the Container Runtime to pull the necessary container images from a registry and start the containers on the worker node. The Container Runtime will then manage those containers and ensure they are running properly.

    (c) Kube-proxy: 
      - A network proxy that maintains network rules on nodes.
      - It enables communication between pods and services within the cluster, as well as external communication to and from the cluster. 
        The Kube-proxy is responsible for routing traffic to the appropriate pods based on the defined services and network policies. 
        It also handles load balancing and ensures that network traffic is properly distributed across the cluster.
    
     Ex:- If you have a service that exposes an application running in a pod, the Kube-proxy will route incoming traffic to that service to the appropriate pod(s) based on the defined rules and load balancing strategy.

    (d) Pods: 
      - The smallest deployable units in Kubernetes, which can contain one or more containers.
       - A Pod is a logical host for one or more containers that share the same network namespace and storage volumes. 
         Pods are used to manage and deploy containerized applications in Kubernetes. 
         They provide a way to group related containers together and ensure they are scheduled and run on the same worker node. 
         Pods can be created, scaled, and managed as a single unit, making it easier to deploy and manage complex applications in a Kubernetes cluster.

     Ex:- If you have an application that consists of multiple containers (e.g., a web server and a database), you can define those containers within a single Pod. 
         This allows them to share resources and communicate with each other easily, while still being managed as a single entity within the Kubernetes cluster.
----------------------------------------------------------------------------------------------
# Pod:
- A Pod is the smallest deployable unit in Kubernetes, which can contain one or more containers,Shared storage and network .
- It is a logical host for containers that share the same network namespace and storage volumes.  
- Pods are used to manage and deploy containerized applications in Kubernetes.
- They provide a way to group related containers together and ensure they are scheduled and run on the same worker node.
- Pods can be created, scaled, and managed as a single unit, making it easier to deploy and manage complex applications in a Kubernetes cluster.

# Characteristics of Pods:
- Smallest K8s object
- Gets its own IP address
- Containers inside pod communicate using localhost
- Ephemeral (temporary)

Ex:- If you have an application that consists of multiple containers (e.g., a web server and a database), you can define those containers within a single Pod. This allows them to share resources and communicate with each other easily, while still being managed as a single entity within the Kubernetes cluster.

- Sample YAML for a Pod:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod

spec:
  containers:
    - name: nginx-container
      image: nginx
      ports:
        - containerPort: 80
```
----------------------------------------------------------------------------------------------
# Kubernetes Workflow:
- Define your application in a YAML file (e.g., Deployment, Service).
- Use `kubectl` to apply the configuration to the cluster.  
- Kubernetes schedules the application to run on worker nodes.
- Kubernetes monitors the application and ensures it runs as expected, automatically handling scaling, updates, and failures.
---------------------------------------------------------------------------------------------
# Deployments:
- A Deployment is a Kubernetes object used to manage Pods and ReplicaSets.
- It provides declarative updates for Pods and ReplicaSets, allowing you to define the desired state of your application and let Kubernetes handle the rest.
- It helps in:
: Creating Pods
: Updating Pods
: Scaling Pods
: Rolling updates
: Self-healing

Instead of creating Pods manually, we create Deployments.
- Sample YAML for a Deployment:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment  
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx-container
          image: nginx
          ports:
            - containerPort: 80
```
- In this example, we are creating a Deployment named `nginx-deployment` that will manage 3 replicas of the nginx application. 
  The Deployment will ensure that there are always 3 Pods running with the specified configuration, and it will handle any necessary updates or scaling operations automatically.

Q.Why do we need Deployments?

- If a Pod crashes: Kubernetes automatically recreates it.
- If we want:
: multiple replicas,
: updates without downtime,
: rollback support,  then Deployment is used.
- With a Deployment, you can easily scale your application up or down by changing the number of replicas, and Kubernetes will handle the creation or deletion of Pods accordingly.
- Deployments also allow for rolling updates, which means you can update your application without downtime.

# Important Commands:
- To Create Deployment
   kubectl apply -f deploy.yaml
- To View Deployments
   kubectl get deployments
- To View Pods
   kubectl get pods
- To Describe Deployment
   kubectl describe deployment nginx-deployment
- To Delete Deployment
   kubectl delete deployment nginx-deployment
---------------------------------------------------------------------------------------
# Services:
- A Service is a Kubernetes object that provides a stable IP address and DNS name for a set of Pods, allowing them to be accessed reliably.
- It abstracts away the underlying Pods and provides a consistent way to access them, even if the Pods are created, deleted, or rescheduled.
- Services are used to enable communication between different components of an application, as well as to expose applications to external traffic.
- Types of Services:  
1. ClusterIP: Exposes the service on a cluster-internal IP. This is the default type and is used for communication between services within the cluster.
2. NodePort: Exposes the service on each node's IP at a static port. This allows external traffic to access the service by sending requests to the node's IP address and the specified port.
3. LoadBalancer: Exposes the service externally using a cloud provider's load balancer. This is typically used in cloud environments to provide a single IP address for accessing the service from outside the cluster.
4. ExternalName: Maps the service to the contents of the externalName field (e.g., example.com), by returning a CNAME record with the name. This is used to access external services from within the cluster.
- Sample YAML for a Service:
```yaml
apiVersion: v1
kind: Service
``````yaml
metadata:
  name: nginx-service 
spec:
  selector: 
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80  
  type: ClusterIP
``` 
- In this example, we are creating a Service named `nginx-service` that selects Pods with the label `app: nginx`. 
  The Service exposes port 80 and forwards traffic to the target port 80 on the selected Pods. 
  The type of the Service is ClusterIP, which means it will only be accessible within the cluster.

# Service provides:
- Stable IP
- DNS name
- Load balancing

Q.Why Services?

- Without Service: Pods cannot be accessed reliably.

- With Service: traffic automatically reaches healthy Pods.
- Services allow for load balancing and provide a stable endpoint for accessing applications, even as the underlying Pods are created, deleted, or rescheduled. 
  This makes it easier to manage and scale applications in a Kubernetes cluster.  
------------------------------------------------------------------------------------------
# Namespaces:
- A Namespace is a virtual cluster within a Kubernetes cluster that provides a way to divide cluster resources between multiple users or teams.
- It allows for better organization and management of resources, as well as providing a scope for namespaces and access control.
- Namespaces are useful for:  
1. Resource Isolation: Different teams or projects can have their own namespaces, allowing them to manage their resources independently without affecting others.
2. Access Control: You can set up role-based access control (RBAC) policies to restrict access to resources within specific namespaces, ensuring that users only have access to the resources they need.
3. Resource Quotas: You can set resource quotas for namespaces to limit the amount of resources that can be consumed by the resources within that namespace, helping to prevent resource contention and ensure fair usage.
- Sample YAML for a Namespace:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: dev-team
```
- In this example, we are creating a Namespace named `dev-team`. 
  This namespace can be used to organize and manage resources related to the development team, allowing them to work independently from other teams or projects within the same Kubernetes cluster. 
  Resources created within this namespace will be isolated from resources in other namespaces, and access can be controlled using RBAC policies specific to this namespace.

Q: Why Namespaces?

- Without namespace: all resources mix together.

- Namespaces help:
: better management
: access control
: resource separation

Some basic commands related to namespaces:
- To Create Namespace
   kubectl apply -f namespace.yaml
- To View Namespaces
    kubectl get namespaces
- To Describe Namespace
    kubectl describe namespace dev-team
- To Delete Namespace
    kubectl delete namespace dev-team

  # Default Namespaces
- default: The default namespace for objects with no other namespace.
- kube-system: The namespace for objects created by the Kubernetes system.
- kube-public: The namespace for public resources that should be visible and accessible to all users (e.g., cluster information). 
----------------------------------------------------------------------------------------
# ConfigMaps:
- A ConfigMap is a Kubernetes object that allows you to store non-confidential data in key-value pairs.
- It is used to decouple configuration artifacts from image content to keep containerized applications portable.  
- ConfigMaps can be used to store configuration data such as environment variables, command-line arguments, or configuration files that your application needs to run.
- ConfigMaps can be consumed by Pods in several ways: 
1. Environment Variables: You can reference ConfigMap data as environment variables in your Pod's container specification.
2. Command-line Arguments: You can use ConfigMap data as command-line arguments for your containers.
3. Configuration Files: You can mount ConfigMap data as files in a volume, allowing your application to read configuration data from the filesystem.
- Sample YAML for a ConfigMap:
```yaml
apiVersion: v1
kind: ConfigMap 
metadata:
  name: app-config
data:
  database_url: "postgres://user:password@db:5432/mydatabase"
  log_level: "info"
``` 
- In this example, we are creating a ConfigMap named `app-config` that contains two key-value pairs: `database_url` and `log_level`. 
  This ConfigMap can be consumed by Pods to provide configuration data for the application, allowing for greater flexibility and separation of configuration from application code. 
  For instance, you could reference the `database_url` as an environment variable in your Pod's container specification, or mount the ConfigMap as a file to read the configuration from the filesystem.

  Q. Why ConfigMaps?
- Without ConfigMaps: configuration is hardcoded in images. 
- With ConfigMaps: configuration is separate and can be updated without rebuilding images.
- ConfigMaps provide a way to manage configuration data separately from application code, making it easier to
  update configuration without needing to rebuild and redeploy application images. 
  This promotes better separation of concerns and allows for more flexible and dynamic configuration management in Kubernetes applications. 

# Important Commands:

- To Create ConfigMap
  kubectl apply -f configmap.yaml
- To View ConfigMaps
  kubectl get configmaps
- To Describe ConfigMap
  kubectl describe configmap app-config
- To Delete ConfigMap
  kubectl delete configmap app-config
-------------------------------------------------------------------------------------
# Scaling:
- Scaling in Kubernetes refers to the process of adjusting the number of replicas of a particular resource (e.g., Pods) to meet the demands of your application.
- Kubernetes provides two main types of scaling:
1. Manual Scaling: You can manually scale your application by changing the number of replicas in your Deployment or ReplicaSet configuration. 
   For example, you can use the `kubectl scale` command to adjust the number of replicas for a Deployment:
   ```bash
   kubectl scale deployment nginx-deployment --replicas=5
   ```
   This command will scale the `nginx-deployment` to 5 replicas.
2. Auto Scaling: Kubernetes also supports auto scaling, which allows the cluster to automatically adjust the number of replicas based on resource usage or other metrics.
   - Horizontal Pod Autoscaler (HPA): Automatically scales the number of Pods in a Deployment based on observed CPU utilization or other select metrics. 
     For example, you can create an HPA that scales the `nginx-deployment` based on CPU usage:
     ```yaml
     apiVersion: autoscaling/v1
     kind: HorizontalPodAutoscaler
     metadata:
       name: nginx-hpa
     spec:
       scaleTargetRef:
         apiVersion: apps/v1
         kind: Deployment
         name: nginx-deployment
       minReplicas: 1
       maxReplicas: 10
       targetCPUUtilizationPercentage: 50
     ```
  - This HPA will automatically scale the `nginx-deployment` between 1 and 10 replicas based on CPU utilization, aiming to maintain an average CPU usage of 50% across the Pods.
- Scaling allows you to ensure that your application can handle varying levels of traffic and resource demands, providing better performance and availability for your users.

# Types of Scaling:
1. Manual Scaling:
 - You can manually scale your application by changing the number of replicas in your Deployment or ReplicaSet configuration. 
   For example, you can use the `kubectl scale` command to adjust the number of replicas for a Deployment:
   ```bash
   kubectl scale deployment nginx-deployment --replicas=5
   ```
   This command will scale the `nginx-deployment` to 5 replicas.
 
2. Auto Scaling:
 - Kubernetes also supports auto scaling, which allows the cluster to automatically adjust the number of replicas based on resource usage or other metrics.
   - Horizontal Pod Autoscaler (HPA): Automatically scales the number of Pods in a Deployment based on observed CPU utilization or other select metrics. 
     For example, you can create an HPA that scales the `nginx-deployment` based on CPU usage:
     ```yaml
     apiVersion: autoscaling/v1
     kind: HorizontalPodAutoscaler
     metadata:
       name: nginx-hpa
     spec:
       scaleTargetRef:
         apiVersion: apps/v1
         kind: Deployment
         name: nginx-deployment
       minReplicas: 1
       maxReplicas: 10
       targetCPUUtilizationPercentage: 50
     ```
  - This HPA will automatically scale the `nginx-deployment` between 1 and 10 replicas based on CPU utilization, aiming to maintain an average CPU usage of 50% across the Pods.

# Benefits:
- Scaling allows you to ensure that your application can handle varying levels of traffic and resource demands, providing better performance and availability for your users.
--------------------------------------------------------------------------------------
# Ingress:
- Ingress is a Kubernetes object used to manage external HTTP/HTTPS access to applications running inside a cluster.
- In simple words Ingress acts like a smart traffic router.

Q.Why do we need Ingress?
- Suppose you have multiple applications:
frontend app
backend app
admin app
- Without Ingress, you may need separate LoadBalancer services:
frontend → LoadBalancer
backend  → LoadBalancer
admin    → LoadBalancer
- This becomes costly and difficult to manage.

- With Ingress, one external entry point can route traffic like:

example.com/           → frontend service
example.com/api        → backend service
example.com/admin      → admin service

# Main Components of Ingress:

1.Ingress Resource:
- This is the YAML file where we define routing rules.
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress

spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80

      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80
```
- This means:
example.com/     → frontend-service
example.com/api  → backend-service

2.Ingress Controller
- Ingress rules alone do nothing.
- You need an Ingress Controller to actually implement those rules.
- Common Ingress Controllers:

NGINX Ingress Controller
AWS Load Balancer Controller
Traefik
HAProxy
GCE Ingress Controller

# How Ingress Works:-
Step-by-step flow
1. User sends request to example.com/api
2. DNS points example.com to Load Balancer IP
3. Load Balancer sends traffic to Ingress Controller
4. Ingress Controller checks Ingress rules
5. It sees /api path
6. It forwards request to backend-service
7. Service sends traffic to correct backend Pod
--------------------------------------------------------------------------------
# Basics of EKS & GKE:
- We know that Kubernetes has two parts:
1. Control Plane (Master Node)
2. Worker Nodes

- Managing Kubernetes manually is difficult because:
(a).setup is complex
(b).upgrades are difficult
(c).monitoring takes effort
(d).scaling needs maintenance
So cloud providers give Managed Kubernetes Services.

# 1. EKS(Elastic Kubernetes Service):
- It is provided by:AWS (Amazon Web Services)
- EKS helps us run Kubernetes on AWS without managing the control plane manually.
- AWS manages:
API Server
etcd
Scheduler
Controller Manager

- We mainly manage:
applications
worker nodes
deployments

- Without EKS:You install and manage Kubernetes yourself
- With EKS:AWS manages Kubernetes for you
#  EKS Architecture:-
--------------
Developer
    ↓
kubectl
    ↓
AWS EKS Cluster
    ↓
Control Plane (Managed by AWS)
    ↓
Worker Nodes (EC2)
    ↓
Pods
---------------
# Important AWS Services Used in EKS:-
| Service    | Purpose                      |
| ---------- | ---------------------------- |
| EC2        | Worker nodes                 |
| IAM        | Authentication & permissions |
| VPC        | Networking                   |
| ELB        | Load balancing               |
| CloudWatch | Monitoring                   |
------------------------------------------------------------
# 2.GKE(Google Kubernetes Engine):
- It is provided by: Google Cloud Platform (GCP)
- GKE helps run Kubernetes on Google Cloud with easier management.

- Google manages:
control plane
upgrades
repairs
scaling

# GKE Architecture:-
------------------------
Developer
    ↓
kubectl
    ↓
GKE Cluster
    ↓
Google Managed Control Plane
    ↓
Worker Nodes
    ↓
Pods
-------------------------
# Important GCP Services Used in GKE:-
| Service              | Purpose          |
| -------------------- | ---------------- |
| Compute Engine       | Worker nodes     |
| Cloud Load Balancing | Traffic handling |
| Cloud Monitoring     | Monitoring       |
| IAM                  | Security         |
---------------------------------------------------------------
# EKS vs GKE(Comparison):
| Feature      | EKS                        | GKE                      |
| ------------ | -------------------------- | ------------------------ |
| Provider     | AWS                        | Google Cloud             |
| Full Form    | Elastic Kubernetes Service | Google Kubernetes Engine |
| Easier Setup | Medium                     | Easier                   |
| Monitoring   | CloudWatch                 | Google Monitoring        |
| Networking   | AWS VPC                    | Google Network           |
| Popular With | AWS users                  | GCP users                |
-----------------------------------------------------------------
# Complete Application Flow Understanding:
------------------------
Developer
   ↓
kubectl
   ↓
EKS / GKE Cluster
   ↓
Worker Nodes
   ↓
Pods
   ↓
Application Running
--------------------------