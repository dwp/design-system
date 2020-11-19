This pattern is experimental because more research is needed to validate it.

Help users to understand what cookies do on DWP services and accept or reject them. Allow users to review and update their preferences at any time.

The pattern is based on GOV.UK guidelines and cookie policy and the NHS consent mechanism.

<a href="/public/images/cookies/cookies-flow.png">
    <img src="/public/images/cookies/cookies-flow.png" alt="A screenshot of how the cookies consent pattern flows after a user has accepted or rejected the use of cookies" />
</a>

## When to use this pattern

This should be used on all public facing DWP services.

## How it works

<a href="https://cookies-consent.design-system.dwp.gov.uk/">View the prototype</a> to see how the pattern works.


### The cookie banner and related actions
The cookie banner is displayed the first time a service is used and persists on every page of the service until the user selects an option and updates their settings.

If the service is in 'live' or 'public beta' it should display on the first page of the service. If the service is in 'private beta' it should be shown on your own start page.

<img src="/public/images/cookies/cookies-banner.png" alt="The cookies banner asks users if we can have their permission to use analytics cookies to improve the service. There's a link to read more about cookies before the user decides. It has buttons which allow users to select their preference." />

#### After the user has accepted or rejected the use of cookies

After the user accepts or rejects the use of cookies a confirmation message is displayed until they select “hide” or navigate away from the page.

#### If the user accepts the use of cookies

<img src="/public/images/cookies/cookies-accept.png" alt="If the user accepts the use of cookies, a confirmation message is displayed with a link which allows them to change their cookie setting at any time" />

#### If the user rejects the use of cookies

<img src="/public/images/cookies/cookies-reject.png" alt="If the user does not accept the use of cookies, a confirmation message is displayed with a link which allows them to change their cookie setting at any time" />

#### If the user changes their cookie settings

If the user accepts cookies but then updates their settings to reject them, any cookies already placed on the user’s browser must be removed.

## Content

The content in the prototype is to be used as the basis for all DWP services. You will need to change some elements of the content depending on the service name and the cookies it uses.

Here is the <a href="/public/docs/english_cookie_content.md" alt="">English</a> and <a href="/public/docs/welsh_cookie_content.md">Welsh</a> content for the banner and cookie policy page.

### Cookies policy page</a>

This page explains how we use cookies. It tells the user which cookies are optional or essential and allows users to update their settings.

<a href="https://pension-age.herokuapp.com/cookies/cookie_policy">Example of the cookies policy page</a>

The Yes/No radio button options are empty by default. After the user has selected an option and selected “save and continue” that option will be pre-selected if they return to the page.


<img src="/public/images/cookies/cookies-accept-reject.png" alt="Example of the Yes/No radio buttons on the cookie policy page." />

### Cookies details page

This page gives more details on the cookies the service uses, including their name and duration. The content for this page will need to be tailored to individual services.

<a href="https://pension-age.herokuapp.com/cookies/cookies_details">Example of the cookies details page</a>

### "Cookies" link in footer

A link to the cookies policy page is displayed in the footer of every page of the service.

<img src="/public/images/cookies/cookies-footer.png" alt="Example of the cookie link in the footer of a service" />

## Technical guidance
Cookies should be enabled without a page refresh after a user has accepted them. Enabling Google Analytics and Google Tag Manager cookies with a page refresh will mean referral traffic will be converted to direct traffic.

If the user accepts cookies but then updates their settings to reject them, any cookies already placed on the user’s browser must be removed.


## Research on this pattern
This pattern was created by Apply for help arranging child maintenance. It is based on the NHS consent mechanism.

Services using this pattern:
<ul>
<li>Apply for help arranging child maintenance</li>
<li>Apply for New Style Jobseeker's Allowance</li>
<li>Apply for New Style Employment and Support Allowance</li>
<li>Find a job</li>
<li>Apply for Pension Credit</li>
<li>Video appointment service</li>
<li>Repay my debt</li>
</ul>

More research is needed on the pattern. If you have used this pattern, get in touch to share your user research findings.

## Next steps

Research is needed on:
<ul>
<li>users understanding on consent and cookies</li>
<li>if there is an impact the current layout has on mobile users</li>
<li>how long the banner should persist through a service if a user does not select an option</li>
</ul>

More development work is needed on how the cookie consent pattern should work for users that have javascript turned off.
