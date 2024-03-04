# Part 2: K8S basics
1. Create deployment  
    I don't have a image registry. Hence I built a docker image locally, following by supplying the image ID into the deployment command. 
    ```bash
    kubectl create deployment usersvc-rest --image=reph05/usersvc-rest:latest
    ```

2. List the deployment
    ```bash
    kubectl get deployments
    ```

3. Remove the deployment
    ```bash
    kubectl delete deployment usersvc-rest
    ```

4. View pods
    ```bash
    kubectl get pods
    ```

5. Describe pods
    ```bash
    kubectl describe pods
    ```

6. Provision pod using manifest
    ```
    kubectl apply -f deployment.yaml
    ```

## Source
https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/
https://kubernetes.io/docs/concepts/configuration/configmap/
https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
