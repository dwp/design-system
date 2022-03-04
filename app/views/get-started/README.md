# Get started
The DWP Design System is made up of commonly used patterns and components that are ready for use in live services and prototypes. 

This guidance assumes that you have already installed the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs). If you haven't, do that first. 

There are two ways to use the design system in your project. 

## Add components to a prototype
You can use DWP components in your prototype with minimal coding by copying CSS and HTML from the code examples. Every code example includes production-ready HTML and CSS code that meets WCAG 2.1 AA criteria. 

Read a step by step guide at [Get started: for designers](get-started/for-designers)

## Install dwp-frontend
If you expect to use more than one or two components – or if you are setting up a new project – we recommend installing `dwp-frontend`.  This makes it easier to update your project when components are added or changed. It also means you can use Nunjucks macros to add components in your pages.

1. Start Terminal and navigate to your prototype's root folder, for example:
`cd projects/my-new-project`

2. Run `npm i @dwp/dwp-frontend`

3. Add the following line to your views configuration:
`path.join(__dirname, '/node_modules/@dwp/dwp-frontend/components'),`

4. Call the component macro on the page you need it by adding the following code where you want the component to appear:

{% raw %}
  `{% from "[your-page-name]/macro.njk" import [macro-name] %}`
{% endraw %}
For instance, the following code adds a basic timeline to the page:
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

For help setting up or using dwp-frontend ask in the #design-system Slack channel or [email the design system team](mailto:dwp-design-system@engineering.digital.dwp.gov.uk).