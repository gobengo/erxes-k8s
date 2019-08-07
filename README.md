# Erxes on Kubernetes

This is [Erxes](https://github.com/erxes/erxes) as a [Kubernetes Application](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/glossary.md#application). It is essentially the Kubernetes-equivalent of [the docker-compose.yml described in the Erxes docs](https://docs.erxes.io/docs/installation/docker).

## Usage

You'll need [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

From this repo:

```
kubectl kustomize .
```

This will print a stream of YAML to stdout. Apply it to your kubernetes cluster like

```
kubectl kustomize . | kubectl apply -f -
```

## Kustomizing

You can (and probably should) use this as a [base](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/glossary.md#base) to build on top of, [kustomizing](https://kustomize.io/) to meet your needs.

* You definitely will need to ammend the [erxes-common ConfigMap](./lib/erxes-common/erxes-common-configmap.yaml) to mention the right hostname for your deployment.
  * I [filed this issue](https://github.com/erxes/erxes/issues/1152) with erxes to discuss allowing some of these values to support relative URLs, but this configuration will always be required for things like erxes email notifications to be able to link back to the running web app.
* The included [redis](./lib/redis) and [mongodb](./lib/mongodb) definitions are pretty basic. You may want to configure those or bring your own.
