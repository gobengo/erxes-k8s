# Erxes on Kubernetes

This is [Erxes](https://github.com/erxes/erxes) as a [Kubernetes Application](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/glossary.md#application). It is essentially the Kubernetes-equivalent of [the docker-compose.yml described in the Erxes docs](https://docs.erxes.io/docs/installation/docker).

## Usage

You'll need [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

From anywhere with internet access:

```
kubectl kustomize github.com/gobengo/erxes-k8s
```

This will print a stream of YAML to stdout. Apply it to your kubernetes cluster like

```
kubectl kustomize github.com/gobengo/erxes-k8s | kubectl apply -f -
```

If you have this repo locally, you can similarly build the YAML like `kubectl kustomize .`.

### Don't have a Kubernetes Cluster?

If you have [docker](https://github.com/docker/docker-ce), you can probably use [kind](https://github.com/kubernetes-sigs/kind).

Install kind (requires golang):
```
GO111MODULE="on" go get sigs.k8s.io/kind@v0.4.0
```

Create a local kubernetes cluster running in docker using kind:

```
kind create cluster # then wait a bit
export KUBECONFIG="$(kind get kubeconfig-path --name="kind")"
kubectl create ns erxes
kubectl config set-context --current --namespace=erxes
kubectl kustomize github.com/gobengo/erxes-k8s | kubectl apply -f -

# Keep an eye on the pods as they come up. It'll take a bit because erxes docker containers are all being fetched in parallel.
watch kubectl get pods

# Once they're running, access things through the erxes-router service
kubectl port-forward svc/erxes-router 32402:80 & # Note this '32402' is tightly coupled with the default values in erxes-common ConfigMap
open http://localhost:32402 # This may open a web browser, e.g. on a mac, or it may not. If it doesn't work, use your web browser manually.
```

## Kustomizing

You can (and probably should) use this as a [base](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/glossary.md#base) to build on top of, [kustomizing](https://kustomize.io/) to meet your needs.

* You definitely will need to ammend the [erxes-common ConfigMap](./lib/erxes-common/erxes-common-configmap.yaml) to mention the right hostname for your deployment.
  * I [filed this issue](https://github.com/erxes/erxes/issues/1152) with erxes to discuss allowing some of these values to support relative URLs, but this configuration will always be required for things like erxes email notifications to be able to link back to the running web app.
* The included [redis](./lib/redis) and [mongodb](./lib/mongodb) definitions are pretty basic. You may want to configure those or bring your own.
