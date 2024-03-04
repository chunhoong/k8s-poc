# Part 1: Working with K8S on Docker Dekstop
1. Ensure `kubectl` is pointing to the K8S setup on Docker Desktop
    ```bash
    kubectl config get-contexts
    kubectl config use-context docker-desktop
    ```

2. Check the kubectl by listing the available nodes
```bash
kubectl get nodes
```

## Source
https://docs.docker.com/desktop/kubernetes/