Help users to understand what cookies do on DWP services and allows them to accept or reject them easily. Allow users to review and update their preferences at any time.

It is based on GOV.UK guidelines and cookie policy and the NHS consent mechanism..

<a href="/public/images/cookies/cookies-flow.png">
    <img src="/public/images/cookies/cookies-flow.png" alt="A screenshot of how the cookies consent pattern flows after user action to approve or not approve the use of cookies" />
</a>

## When to use this pattern

This should be used on all public facing DWP services.

## How it works

The content is to be used as a basis for all DWP services but will need to change depending on the service name and cookies it uses.

You can see the prototype on <a href="https://pension-age.herokuapp.com/cookies/apply_cmg_start_banner_v2.html" alt="">Apply for help arranging child maintenance</a>
Username: <code>Cookies</code>
Password: <code>Policy</code>

### Show the cookie banner and related actions
The cookie banner is displayed the first time a service is used and persists on every page of the service until the user updates their settings.

It should display initially on the first page of the service after the GOV.UK start page if it's in Live or in Public Beta or your own start page if it's in Private Beta.

<img src="/public/images/cookies/cookies-banner.png" alt="The cookies banner asks users if we can have their permission to use analytics cookies to improve the service. There's a link to read more about cookies before the user decides. It has buttons which allow users to select their preference." />

#### If the user accepts the use of cookies

If the user updates their settings a confirmation message is displayed until they select “Hide” or navigate away from the page.

<img src="/public/images/cookies/cookies-accept.png" alt="If the user accepts the use of cookies, a confirmation message is displayed with a link which allows them to change their cookie setting at any time" />

#### If the user doesn't accept the use of cookies

<img src="/public/images/cookies/cookies-reject.png" alt="If the user does not accept the use of cookies, a confirmation message is displayed with a link which allows them to change their cookie setting at any time" />

### <a href="https://pension-age.herokuapp.com/cookies/cookie_policy">Cookies policy page</a>

Explains how we use cookies, which are optional or essential and allows users to update their settings.

The Yes/No radio button options are empty by default. When the user selects an option and "Save and continue" that option will be pre-selected if they return to the page.

<img src="/public/images/cookies/cookies-accept-reject.png" alt="" />

### <a href="https://pension-age.herokuapp.com/cookies/cookies_details">Cookies details page</a>

More details on the cookies the service uses including their name and duration

### Cookies footer

A link to Cookies policy page is displayed in the footer of every page of the service.

<img src="/public/images/cookies/cookies-footer.png" alt="" />

## Research on this pattern

This pattern is being tested by the Apply for help arranging child maintenance team. We'll update this section with insights from the team.