# Kubernetes & Orchestration:
-------------------------------------------------------------------------------------
Q. Why do we need Kubernetes & Orchestration?

Modern applications run inside containers and often consist of multiple services. 
Managing these containers manually becomes difficult when applications scale, fail, or require updates.

Container Orchestration helps automate deployment, scaling, networking, monitoring, and management of containers.
Kubernetes (K8s) is the most popular orchestration platform used to efficiently manage containerized applications across clusters of machines.
-------------------------------------------------------------------------------------
# Introduction to Orchestration

- Orchestration is the automated management, coordination, deployment, scaling, and networking of containers and applications.
- It helps automate:
: Application deployment
: Scaling containers
: Load balancing
: Service discovery
: Self-healing
: Monitoring and updates

q. Why Orchestration is Needed?

- Suppose we have 100 containers running across many servers.
- Manually managing:
: Which container runs where
: Restarting failed containers
: Scaling during high traffic
: Networking between containers
: Updating applications becomes extremely difficult.
- So Orchestration tools solve these problems automatically.
--------------------------------------------------------------------------------------
# Kubernetes (K8s):
- Kubernetes (K8s) is an open-source container orchestration platform developed by Google.
- It automates:
: Deployment
: Scaling
: Management
: Networking
: Monitoring of containerized applications
