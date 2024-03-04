1. Deploy K8S dashboard
    ```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
    ```

2. Expose K8S endpoint
    ```bash
    kubectl proxy --port=80
    ```

3. Open K8S dashboard
http://localhost/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.

## Source
https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/