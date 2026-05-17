# Ansible 
# -----------------------------------------------------------------------
# Introduction to Configuration Management:
CM is the Process of maintaining computer systems, servers, and software in a desired, consistent state.

- Problem: Manually configuring 50 servers via SSH is time-consuming and prone to human error.

- Solution: Ansible automates this. You write the configuration once, and it applies it to all 50 servers simultaneously.

# Key Benefits:
Local Execution: You can execute tasks directly from your own machine (the Control Node) to manage any number of remote servers.
Unified Configuration: You can consolidate all Configuration, Installation, and Deployment steps into a single YAML file (a Playbook).
Reusability: You can re-use the same file multiple times across different environments (e.g., Development, Testing, and Production) without rewriting code.
Reliability: It is more reliable and less likely for errors compared to manual configuration, ensuring a consistent "Desired State" across your infrastructure.
------------------------------------------------------------------------

Q.What is Ansible?

- Ansible is an open-source Agentless IT automation engine that automates provisioning, configuration management, application deployment, and orchestration
- Agentless means Ansible does not require any special software (agent) to be installed on the target/managed servers.
- Instead, Ansible connects directly using:
   SSH → for Linux servers
   WinRM → for Windows servers

 and executes tasks remotely.

# Key Characteristics:
- Agentless: No need to install any software (agents) on the client/target servers. It uses SSH for Linux and WinRM for Windows.

- Idempotent: This is the most important feature. It means if you run the same script multiple times, it will only make changes if the current state doesn't match the desired state. If the work is already done, Ansible does nothing.

- Declarative: You tell Ansible what you want (e.g., "Apache should be installed"), and Ansible figures out how to do it.
# ------------------------------------------------------------------------
# Ansible Architecture:

Ansible architecture consists of the following components:
(a). Control nodes
(b). Managed nodes
(c). Inventory   
(d). Modules
(e). Playbooks 

(a). Control Nodes: This is where Ansible is installed and from where you run your Ansible commands. 
It can be your local machine or a dedicated server.
Ex-: If you have a laptop with Ansible installed, that laptop is your control node.

(b). Managed Nodes: These are the servers or devices that Ansible manages. They can be Linux, Windows, network devices, etc.
Ansible connects to these nodes to execute tasks.
Ex-: If you have 50 servers that you want to manage, those 50 servers are your managed nodes.

(c). Inventory: This is a file (usually in INI or YAML format) that lists all the managed nodes.
It can also group nodes together for easier management.
Ex-: You can have an inventory file that lists all your web servers under a group called [webservers].

(d). Modules: These are reusable, standalone scripts that Ansible uses to perform specific tasks. 
There are modules for installing software, managing files, handling services, etc.
Ex-: The "yum" module can be used to install packages on a Red Hat-based system.

(e). Playbooks: These are YAML files that define a series of tasks to be executed on the managed nodes. 
They are the main way to automate complex workflows in Ansible.
Ex-: A playbook might include tasks to install Apache, start the service, and ensure it is enabled on boot.
------------------------------------------------------------------------
# Advanced Components: Handlers, Roles, and Templates
# Tasks & Handlers:
Tasks: The individual actions defined in a playbook that call a specific module.

Handlers: Special tasks that only run when "notified" by another task. 
They are typically used to restart a service only if a configuration file actually changed.

Ex-: If you have a task that updates a configuration file, you can notify a handler to restart the service only if the file was changed. 
This prevents unnecessary restarts and ensures efficient automation.

# Roles:
Roles provide a way to package and organize automation into a standardized directory structure (e.g., /tasks, /vars, /templates).
This makes your code modular, reusable, and easy to share.

# Jinja2 Templates:
Ansible uses the Jinja2 engine to create dynamic configuration files. 
Instead of hardcoding values, you use variables (e.g., {{ http_port }}) that Ansible fills in specifically for each managed node during execution.
------------------------------------------------------------------------
# Example Playbook:
```yaml 
---
- name: Setup Web Server
  hosts: webservers
  become: yes
  tasks:
    - name: Install Apache
      yum:
        name: httpd
        state: present

    - name: Copy Configuration File
      template:
        src: templates/httpd.conf.j2
        dest: /etc/httpd/conf/httpd.conf
      notify: Restart Apache

  handlers:
    - name: Restart Apache
      service:
        name: httpd
        state: restarted

```
In this example, the playbook sets up a web server by installing Apache and copying a configuration file. 
If the configuration file is changed, it triggers a handler to restart the Apache service.
------------------------------------------------------------------------
# Ansible Workflow:
1. Write an Inventory: Create an inventory file that lists your managed nodes and groups them as needed.
2. Create a Playbook: Write a playbook that defines the tasks you want to perform on the managed nodes.
3. Run the Playbook: Use the ansible-playbook command to execute the playbook against the inventory. 
   Ansible will connect to the managed nodes and perform the tasks defined in the playbook.
4. Review Results: Ansible will provide output showing which tasks were executed, which were changed, and if there were any errors.
# -----------------------------------------------------------------------