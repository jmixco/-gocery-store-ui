# GroceryStoreUi

## GitLab Registry

With the Container Registry, every project can have its own space to store its Docker images. [More Information](https://gitlab.com/help/user/packages/container_registry/index)

CLI Commands
If you are not already logged in, you need to authenticate to the Container Registry by using your GitLab username and password. If you have Two-Factor Authentication enabled, use a [Personal Access Token](https://gitlab.com/help/user/profile/personal_access_tokens) instead of a password.

```
docker login registry.gitlab.com
```

You can add an image to this registry with the following commands:

```
docker build -t registry.gitlab.com/gobaypay/store-panel-web .
docker push registry.gitlab.com/gobaypay/store-panel-web
```

<details>
<summary>CI/CD resources</summary>

Recources:

- [how to-build-docker-images-and-host-a-docker-image-repository-with-gitlab](https://www.digitalocean.com/community/tutorials/how-to-build-docker-images-and-host-a-docker-image-repository-with-gitlab)
- [Create react app + Gitlab CI + Digital Ocean droplet - Pipeline succeeds but Docker container is deleted right after](https://stackoverflow.com/a/54395308/6943347)
- [Deploy docker container to digital ocean droplet from gitlab-ci](https://stackoverflow.com/questions/39586207/deploy-docker-container-to-digital-ocean-droplet-from-gitlab-ci)
- [CI/CD with Gitlab and DigitalOcean Using Docker Containers](https://medium.com/@bkintanar/ci-cd-with-gitlab-and-digitalocean-using-docker-containers-2c1c0679959)
- [Container Registry examples with GitLab CI/CD](https://gitlab.com/help/user/packages/container_registry/index#container-registry-examples-with-gitlab-cicd)
- [Getting started with GitLab CI/CD](https://gitlab.com/help/ci/quick_start/README)
- [initial-server-setup-with-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)
- [deploy-a-node-app-to-digital-ocean-via-gitlab-runners](https://medium.com/@codeandcam/deploy-a-node-app-to-digital-ocean-via-gitlab-runners-70bc8f81f91e)
- [como-instalar-y-usar-docker-en-ubuntu-18-04-1-es](https://www.digitalocean.com/community/tutorials/como-instalar-y-usar-docker-en-ubuntu-18-04-1-es)
</details>

## CLI documentation

<details>
  <summary>NG CLI README</summary>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

</details>
