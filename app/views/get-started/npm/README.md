# Get started: install using npm
If you expect to use more than one or two components, or if you are setting up a new project, we recommend installing DWP Frontend. You can then use Nunjucks to add components to your prototype. 

## Install DWP Frontend
These instructions assume you are using the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs). 

1. Start Terminal and navigate to your prototype’s root folder, for example: `cd projects/my-new-project`

2. Run `npm i @dwp/dwp-frontend`

## Add components to your prototype
 With DWP Frontend installed you can use the Nunjucks code from any component to add that component to your prototype. 

 For instance, the following code imports the [Timeline](/components/timeline) component and then adds a timeline to a page. This particular timeline is called "Appointments" and has one event. 

{% raw %}
```
{% from "timeline/macro.njk" import dwpTimeline %}

{{ dwpTimeline({ 
title: "Appointments",
events: [
  {
    name: "John Smith",
    state: "Accepted",
    date: "11 Aug 2021"
  }
]
}) }}
```
{% endraw %}

For more help setting up or using DWP Frontend, [email the design system team](mailto:dwp-design-system@engineering.digital.dwp.gov.uk) or use the [#design-system Slack channel](https://dwpdigital.slack.com/archives/CJ11B0VFV).
