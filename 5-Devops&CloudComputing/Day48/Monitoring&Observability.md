# Monitoring & Observability Notes:
------------------------------------------------------------------------
# Monitoring:
- Monitoring means continuously checking whether our application, server, database, or infrastructure is working properly or not.

- Ex:-Suppose we deployed a website. We want to know:

  Is the server running?
  Is CPU usage too high?
  Is memory getting full?
  Is the application slow?
  Are users getting errors?
  Is the database responding?
- Monitoring helps us detect problems early before users complain.

# Observability:
- Observability means understanding what is happening inside a system by looking at its outputs.
- Main parts of observability are:
(a). Metrics
(b). Logs
(c). Traces

# Simple meaning:-
   Term	                                   meaning
   Metrics	                               Numeric data like CPU usage, memory usage, request count
   Logs	                                   Text records of what happened in the system
   Traces	                                 Track the journey of a request across services

- Ex:-If a website is slow:
  Metrics tell us CPU is 95%.
  Logs tell us database timeout happened.
  Traces tell us which service caused the delay.
--------------------------------------------------------------------------------
# Prometheus Metrics:
- Prometheus is an open-source monitoring tool used to collect and store metrics.
- It is commonly used in DevOps, Kubernetes, cloud monitoring, and application monitoring.
- Prometheus mainly works on metrics. Here metrics means numeric data about the health and performance of a system.

Q. What are Metrics?

- Metrics are numerical values that tell us the current state of a system. 
- Ex:-
  CPU usage = 80%
  Memory usage = 70%
  HTTP requests = 5000
  Error count = 25
  Response time = 300ms

Q. How Prometheus Works ?
- Prometheus follows a pull-based model.
- This means Prometheus goes to the application or server and pulls metrics from it.

- Basic flow:

Application / Server exposes metrics
        ↓
Prometheus collects metrics
        ↓
Prometheus stores metrics
        ↓
Grafana shows metrics visually
        ↓
Alerts are triggered if something goes wrong

# Prometheus Exporters:

- Sometimes applications or servers do not directly provide metrics in Prometheus format.
- So we use exporters.
- Exporter collects system/application data and exposes it for Prometheus.
- Ex:-

 Exporter	                                          Use
  Node Exporter	                                   Collects Linux server metrics
  MySQL Exporter	                                 Collects MySQL database metrics
  Blackbox Exporter	                               Checks website/API availability
  Kubernetes Exporter	                             Collects Kubernetes metrics

# Common Prometheus Metrics:

   Metric	                                       Meaning
   CPU Usage	                                   How much CPU is being used
   Memory Usage	                                 How much RAM is being used
   Disk Usage	                                   How much storage is filled
   Request Count	                               Number of requests received
   Error Rate	                                   Number of failed requests
   Response Time	                               Time taken to respond

# Grafana Dashboards:
- Grafana is a visualization tool used to create dashboards.
- It takes data from tools like Prometheus, CloudWatch, Elasticsearch, MySQL, etc., and shows it in graphs and charts.
  Prometheus stores the metrics.
  Grafana displays them beautifully.

Q. Why Grafana is Used ?
- Grafana helps teams see system health clearly.
- Example dashboard can show:
  CPU usage graph
  Memory usage graph
  Disk usage graph
  API response time
  Error rate
  Number of active users
  Kubernetes pod status

# Grafana Dashboard:
- A simple dashboard may contain:
| Panel         | Shows                         |
| ------------- | ----------------------------- |
| CPU Usage     | Server CPU load               |
| Memory Usage  | RAM consumption               |
| Disk Usage    | Storage usage                 |
| Request Rate  | Number of requests per second |
| Error Rate    | Failed requests               |
| Response Time | API performance               |

# Simple Flow with Prometheus and Grafana:

Server/Application
        ↓
Prometheus collects metrics
        ↓
Grafana connects to Prometheus
        ↓
Grafana creates dashboards
------------------------------------------------------------------------------
# Alert Rules:

Q. What are Alerts?
- Alerts notify us when something goes wrong.
- Ex:-
  CPU usage is above 90%.
  Server is down.
  Disk is almost full.
  Error rate is too high.
  Website is not responding.
- Alerts help DevOps teams take quick action.

Q.Why Alerts are Important ?
- Without alerts, we may not know about a problem until users report it.
- With alerts, the team gets notified early through:
  Email
  Slack
  Microsoft Teams
  PagerDuty
  SMS
# Simple Alert Examples:

| Situation          | Alert              |
| ------------------ | ------------------ |
| CPU usage > 90%    | High CPU alert     |
| Memory usage > 85% | High memory alert  |
| Disk usage > 80%   | Disk space alert   |
| Website down       | Service down alert |
| Error rate > 5%    | High error alert   |

Example:- Prometheus Alert Rule
```
groups:
  - name: server-alerts
    rules:
      - alert: HighCPUUsage
        expr: cpu_usage > 90
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "CPU usage is very high"
          description: "CPU usage is above 90% for 5 minutes"

```
- Alert should trigger only if condition remains true for 5 minutes.
------------------------------------------------------------------------------------
# ELK Stack(Elasticsearch Logstash Kibana):
- ELK Stack is used for log management and analysis.
- ELK stands for:
| Tool          | Use                         |
| ------------- | --------------------------- |
| Elasticsearch | Stores and searches logs    |
| Logstash      | Collects and processes logs |
| Kibana        | Displays logs in dashboards |

- Sometimes Beats is also used, so it becomes Elastic Stack.

Q. Why ELK Stack is Used ?

- Applications generate many logs.

- Example logs:
  User login successful
  Payment failed 
  Database connection timeout
  API returned 500 error
  File uploaded successfully
- If logs are stored on different servers, it becomes difficult to search them.
- ELK collects all logs in one place and allows us to search and analyze them.

# ELK Stack Flow:
Application / Server Logs
        ↓
Logstash collects and processes logs
        ↓
Elasticsearch stores logs
        ↓
Kibana displays and searches logs

# Components of ELK:
1. Elasticsearch
- Elasticsearch is used to store and search logs quickly.
- Example:
- We can search:
  error
  status:500
  payment failed
  database timeout

2. Logstash
- Logstash collects logs from different sources and processes them.
- It can filter, clean, and format logs before sending them to Elasticsearch.
- Example:
  It can convert raw logs into structured data.

3. Kibana
- Kibana is used to view logs using dashboards.
- It helps us:
  Search logs
  Create charts
  Check errors
  Analyze application issues

- ELK Example
  Suppose a user says payment is failing.
  Using ELK, we can search logs like:
  payment failed
- Then we can find:
  When the error happened
  Which user faced it
  Which service failed
  What error message was generated

-------------------------------------------------------------------------------------
# CloudWatch Alarms:
- Amazon CloudWatch is a monitoring service provided by AWS.
- It is used to monitor AWS resources and applications.
- CloudWatch can monitor:

EC2 instances
RDS databases
Lambda functions
Load balancers
S3
ECS/EKS
Custom applications

Q. What are CloudWatch Metrics?
- CloudWatch metrics are numerical values collected from AWS services.
- Examples:
 | AWS Service   | Metric               |
| ------------- | -------------------- |
| EC2           | CPU utilization      |
| RDS           | Database connections |
| Lambda        | Error count          |
| Load Balancer | Request count        |
| S3            | Bucket size          |

Q. What is a CloudWatch Alarm?
- A CloudWatch Alarm watches a metric and performs an action when the metric crosses a limit.
- Example:
  If EC2 CPU usage is greater than 80% for 5 minutes, send an email alert.

# CloudWatch Alarm Flow:
AWS Resource
     ↓
CloudWatch collects metrics
     ↓
Alarm checks condition
     ↓
If condition is true
     ↓
Notification is sent
---------------------------------------------------------------------------------------------
# Difference Between Prometheus, Grafana, ELK, and CloudWatch:
| Tool        | Main Use                             |
| ----------- | ------------------------------------ |
| Prometheus  | Collects and stores metrics          |
| Grafana     | Shows metrics in dashboards          |
| Alert Rules | Sends alerts when conditions are met |
| ELK Stack   | Collects, stores, and analyzes logs  |
| CloudWatch  | AWS monitoring and alarms            |

# 9. Metrics vs Logs:
| Metrics                           | Logs                                |
| --------------------------------- | ----------------------------------- |
| Numeric data                      | Text-based data                     |
| Used for monitoring system health | Used for debugging issues           |
| Example: CPU = 90%                | Example: database connection failed |
| Stored in Prometheus/CloudWatch   | Stored in ELK Stack                 |
| Good for alerts                   | Good for root cause analysis        |

# Real-World Example:

- Suppose an e-commerce website is running.
  A user reports that the website is slow.
  The DevOps team checks:

Step 1: Grafana Dashboard

They see CPU usage is 95%.

Step 2: Prometheus Metrics

Prometheus confirms high CPU usage and high request count.

Step 3: Alerts

An alert was already triggered for high CPU usage.

Step 4: ELK Logs

Logs show many errors from the payment service.

Step 5: CloudWatch

- If the application is hosted on AWS, CloudWatch shows EC2 CPU and load balancer request count.
- So, the team can quickly find and fix the issue.