# Design System

One place for service teams to find and share the styles, components and patterns for designing DWP services.

## How to update the site

* In your browser go to the project **[here](https://gitlab.nonprod.dwpcloud.uk/design-system/main-site)**.
* Click `'Issues'` in the left sidebar.
* Click the `'New Issue'` button to create a new issue
* Name the issue something descriptive about what you will be changing and give the issue a similar description that says what you will be fixing/changing/adding in this issue.
* Press the `'Submit Issue'` button to open the issue
* On the page that opens after this, click the little green down arrow next to `'Create merge request'`, select `'Create branch'`, you will see a suggestion of `n-<name of your issue>` as the suggested branch name, you should change this to be `issue-n`. Leave the source branch as `'master'` and then press the `'Create branch'` button
* Click on `'CI/CD'` on the left sidebar and you'll see the pipeline running. The pipeline creates a copy of the Design System site based on the new branch just created. Once deployed this preview site is available via *https://issue-n.design-system.dwp.gov.uk*
* You can make changes locally at this point but it's best not to push them until the initial pipeline has completed, which should take around 15 minutes

To make your changes:

* In the terminal navigate to the project directory
* In the terminal run the command `git pull -r`, this updates your local copy to make it up to date with the one on GitLab.
* In the terminal run the command `git checkout issue-n`, replacing `'issue-n'` with the name of the branch you created earlier - This switches you to your issue branch ready to make changes.
* Make your changes to the site.
* In the terminal run the command `git add .` - This stages the changes that you have made.
* In the terminal run the command `git commit -m "[Your Name] your message"` - This commits the staged changes ready to push to GitLab and gives it a message that should describe the changes.
* In the terminal run the command `git pull -r` - This ensures you are up to date with GitLab still.
* In the terminal run the command `git push` - This pushes the committed changes to GitLab.
* Wait for the pipeline for your branch to finish and preview on [issue-n.design-system.dwp.gov.uk](https://issue-n.design-system.dwp.gov.uk)

## Site Architecture

The following describes the CI/CD pipeline, the architecture of the site, and the AWS infrastructure used to host it.

![Figure 1 - Summary Architecture](/infrastructure/images/design-system-aws-summary.png)
*Figure 1 - Summary Architecture*

### Gitlab CI Pipeline

* The code is hosted on the AWS GitLab instance.
* New changes should be tracked using issues with branches opened for each issue.
* Once this issue is completed the branch should be merged back into the master branch.

* There is a CI/CD pipeline setup for the repository, defined in '.gitlab-ci.yml'.
* It has 7 stages: test-code, build-feature, test-container, deploy, tag-master and release.
    * test-code - runs tests against the code. Two parallel jobs run, one to test node and one to lint the Dockerfile
    * build-feature - builds the Docker image, tags it with the Git commit reference and pushes it to ECR. There is a check in place not to create and upload the Docker image if this is the first branch pipeline run, as we want to deploy the 'master' container initially to the feature site.
    
    Without this logic when creating a new branch another copy of the master container would be created with the same commit ref as the master image (as when creating a new branch the commit ref is the same as the ref of the last merge to master), which has the undesirable effects of creating an un-needed new container image and un-tagging the current master image.

    For each subsequent pipeline run a new container image is created and tagged with the commit ref.

    * test-container - downloads the container image from ECR and runs tests from within the container
    * deploy - deploys to `<branch name>.design-system.dwp.gov.uk` on any branch except master.
    * tag-master - only runs on the master branch. This job adds the 'master' tag to the master container image (this is for identification only)
    * Release - only runs on the master branch and deploys to `design-system.dwp.gov.uk`. It must be triggered manually.
* When a branch is deleted (for example after a merge request is processed), the delete-feature-stack job is automatically ran which removes the infrastructure created for `<branch name>.design-system.dwp.gov.uk`.

### Docker

The Dockerfile located in the root of the project is used to build the Design System Node.JS application container, based on the Alpine Linux Node image.

Within the Dockerfile 'npm ci' is used to build the application as opposed to 'npm build'. The npm ci command is intended to be ran as part of a pipeline, and provides more consistent results than the npm build command.

In order to use npm ci some changes were required within the Node.JS project:

* `.npmrc` was changed, with `package-lock=true` added
* `npm -i` was ran as a one off to create `package-lock.json`
* `.gitignore` was updated with `package-lock.json` removed

### AWS Architecture

![Figure 2 - AWS Architecture](/infrastructure/images/design-system-aws-architecture.png)
*Figure 2 - AWS Architecture*

The Design System site is hosted using AWS Fargate (ECS), deployed to a VPC within the DWP Architecture account in the London (eu-west-2) Region. The Fargate Service and Tasks (Containers) run in private subnets across all 3 availability zones, with an Application Load Balancer proxying access from a public subnet. Autoscaling is configured for the Fargate Service which enables the number of Tasks to scale in/out based on load.

AWS CloudFront sits in front of the application to act as a content delivery network (CDN), which optimises access between the client and the application and caches content, providing a better user experience and reducing the load on the application.

AWS Route 53 is used to manage DNS for the `design-system.dwp.gov.uk` domain. AWS Certificate Manager (ACM) is used to generate and deploy TLS certificates to CloudFront and the Application Load Balancer. A wildcard domain name is used (`*.design-system.dwp.gov.uk` with a SAN for `design-system.dwp.gov.uk`), and these certificates are automatically renewed. Whilst the majority of components are located in the London Region, CloudFront is managed from the Virginia Region (us-east-1) and the TLS certificate deployed to each CloudFront Distribition must also be in the same region. This means that 2 certificates for the same domain name `*.design-system.dwp.gov.uk` are required, one hosted from ACM in the London Region and one hosted from ACM in Virginia.

Feature sites are deployed to a Test VPC, and the Live site is deployed to a Live VPC.

The site infrastructure is deployed using AWS CloudFormation, which allow each feature site and the live site to be managed as single units that can be easily built or destroyed. Where supported tagging is used to identify the Design System resources, with a tag of `Project : Content-Design`.
