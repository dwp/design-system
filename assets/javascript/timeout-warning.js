function TimeoutWarning($module) {
  this.$module = $module;
  this.$lastFocusedEl = null;
  this.$closeButton = $module.querySelector('.js-dialog-close');
  this.$cancelButton = $module.querySelector('.js-dialog-cancel');
  this.overLayClass = 'govuk-timeout-warning-overlay';
  this.$fallBackElement = document.querySelector('.govuk-timeout-warning-fallback');
  this.timers = [];
  // UI countdown timer specific markup
  this.$countdown = $module.querySelector('.timer');
  this.$accessibleCountdown = $module.querySelector('.at-timer');
  // UI countdown specific settings
  this.idleMinutesBeforeTimeOut = $module.getAttribute('data-minutes-idle-timeout') ? $module.getAttribute('data-minutes-idle-timeout') : 25;
  this.timeOutRedirectUrl = $module.getAttribute('data-url-redirect') ? $module.getAttribute('data-url-redirect') : 'timeout';
  this.minutesTimeOutModalVisible = $module.getAttribute('data-minutes-modal-visible') ? $module.getAttribute('data-minutes-modal-visible') : 5;
  this.timeUserLastInteractedWithPage = '';
}

// Initialise component
TimeoutWarning.prototype.init = function () {
  // Check for module
  if (!this.$module) {
    return;
  }
  // Check that dialog element has native or polyfill support
  if (!this.dialogSupported()) {
    return;
  }

  // Start watching for idleness
  this.countIdleTime();

  this.$closeButton.addEventListener('click', this.closeDialog.bind(this));
  this.$module.addEventListener('keydown', this.escClose.bind(this));

  // Debugging tip: This event doesn't kick in in Chrome if you have Inspector panel open and have clicked on it
  // as it is now the active element. Click on the window to make it active before moving to another tab.
  window.addEventListener('focus', this.checkIfShouldHaveTimedOut.bind(this));
};

// Check if browser supports native dialog element or can use polyfill
TimeoutWarning.prototype.dialogSupported = function () {
  if (typeof HTMLDialogElement === 'function') {
    // Native dialog is supported by browser
    return true;
  }
  // Native dialog is not supported by browser so use polyfill
  try {
    return true;
  } catch (error) {
    // Doesn't support polyfill (IE8) - display fallback element
    this.$fallBackElement.classList.add('govuk-!-display-block');
    return false;
  }
};

// Count idle time (user not interacting with page)
// Reset idle time counter when user interacts with the page
// If user is idle for specified time period, open timeout warning as dialog
TimeoutWarning.prototype.countIdleTime = function () {
  let idleTime;
  const milliSecondsBeforeTimeOut = this.idleMinutesBeforeTimeOut * 10000;

  // As user interacts with the page, keep resetting the timer
  window.onload = resetIdleTime.bind(this);
  window.onmousemove = resetIdleTime.bind(this);
  window.onmousedown = resetIdleTime.bind(this); // Catches touchscreen presses
  window.onclick = resetIdleTime.bind(this); // Catches touchpad clicks
  window.onscroll = resetIdleTime.bind(this); // Catches scrolling with arrow keys
  window.onkeypress = resetIdleTime.bind(this);
  window.onkeyup = resetIdleTime.bind(this); // Catches Android keypad presses

  function resetIdleTime() {
    // As user has interacted with the page, reset idle time
    clearTimeout(idleTime);

    // Start new idle time
    idleTime = setTimeout(this.openDialog.bind(this), milliSecondsBeforeTimeOut);

    // TO DO - Step A of client/server interaction
    // Set last interactive time on server by periodically ping server
    // with AJAX when user interacts with client side
    // See setLastActiveTimeOnServer()
    if (window.localStorage) {
      window.localStorage.setItem('timeUserLastInteractedWithPage', new Date());
    }
  }
};

TimeoutWarning.prototype.openDialog = function () {
  // TO DO - Step B of client/server interaction
  // GET last interactive time from server before showing warning
  // User could be interacting with site in 2nd tab
  // Update time left accordingly
  if (!this.isDialogOpen()) {
    document.querySelector('body').classList.add(this.overLayClass);
    this.saveLastFocusedEl();
    this.makePageContentInert();
    this.$module.showModal();
    if (this.$countdown) {
      this.startUiCountdown();
    }
  }
};

// Starts a UI countdown timer. If timer is not cancelled before 0
// reached + 2 seconds grace period, user is redirected.
TimeoutWarning.prototype.startUiCountdown = function () {
  this.clearTimers(); // Clear any other modal timers that might have been running
  const $module = this;
  const { $countdown } = this;
  const { $accessibleCountdown } = this;
  const minutes = 1;
  let timerRunOnce = false;
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const { timers } = this;

  let seconds = 10 * minutes;
  $countdown.innerHTML = `${minutes} minute${minutes > 1 ? 's' : ''}`;

  (function runTimer() {
    const minutesLeft = parseInt(seconds / 60, 10);
    const secondsLeft = parseInt(seconds % 60, 10);
    const timerExpired = minutesLeft < 1 && secondsLeft < 1;

    const minutesText = minutesLeft > 0 ? `<span>${minutesLeft}</span> minute${minutesLeft > 1 ? 's' : ''}` : ' ';
    const secondsText = secondsLeft >= 1 ? ` <span>${secondsLeft}</span> second${secondsLeft > 1 ? 's' : ''}` : '';
    let atMinutesNumberAsText = '';
    let atSecondsNumberAsText = '';

    try {
      atMinutesNumberAsText = this.numberToWords(minutesLeft); // Attempt to convert numerics into text as iOS VoiceOver ccassionally stalled when encountering numbers
      atSecondsNumberAsText = this.numberToWords(secondsLeft);
    } catch (e) {
      atMinutesNumberAsText = minutesLeft;
      atSecondsNumberAsText = secondsLeft;
    }

    const atMinutesText = minutesLeft > 0 ? `${atMinutesNumberAsText} minute${minutesLeft > 1 ? 's' : ''}` : '';
    const atSecondsText = secondsLeft >= 1 ? ` ${atSecondsNumberAsText} second${secondsLeft > 1 ? 's' : ''}` : '';
    // Below string will get read out by screen readers every time the timeout refreshes (every 15 secs. See below).
    // Please add additional information in the modal body content or in below extraText which will get announced to AT the first time the time out opens
    const text = `We will close your application if you do not do anything in the next ${minutesText}${secondsText}.`;
    let atText = `We will reset your application if you do not respond in ${atMinutesText}`;
    if (atSecondsText) {
      if (minutesLeft > 0) {
        atText += ' and';
      }
      atText += `${atSecondsText}.`;
    } else {
      atText += '.';
    }
    const extraText = ' Your answers will be deleted. This is to protect your information.';

    if (timerExpired) {
      // TO DO - client/server interaction
      // GET last interactive time from server before timing out user
      // to ensure that user hasn’t interacted with site in another tab

      setTimeout($module.redirect.bind($module), 500);
    } else {
      seconds--;

      $countdown.innerHTML = text + extraText;

      if (minutesLeft < 1 && secondsLeft < 20) {
        $accessibleCountdown.setAttribute('aria-live', 'assertive');
      }

      if (!timerRunOnce) {
        // Read out the extra content only once. Don't read out on iOS VoiceOver which stalls on the longer text

        if (iOS) {
          $accessibleCountdown.innerHTML = atText;
        } else {
          $accessibleCountdown.innerHTML = atText + extraText;
        }
        timerRunOnce = true;
      } else if (secondsLeft % 15 === 0) {
        // Update screen reader friendly content every 15 secs
        $accessibleCountdown.innerHTML = atText;
      }

      // JS doesn't allow resetting timers globally so timers need to be retained for resetting.
      timers.push(setTimeout(runTimer, 1000));
    }
  }());
};

TimeoutWarning.prototype.saveLastFocusedEl = function () {
  this.$lastFocusedEl = document.activeElement;
  if (!this.$lastFocusedEl || this.$lastFocusedEl === document.body) {
    this.$lastFocusedEl = null;
  } else if (document.querySelector) {
    this.$lastFocusedEl = document.querySelector(':focus');
  }
};

// Set focus back on last focused el when modal closed
TimeoutWarning.prototype.setFocusOnLastFocusedEl = function () {
  if (this.$lastFocusedEl) {
    window.setTimeout(function () {
      this.$lastFocusedEl.focus();
    }, 0);
  }
};

// Set page content to inert to indicate to screenreaders it's inactive
// NB: This will look for #content for toggling inert state
TimeoutWarning.prototype.makePageContentInert = function () {
  if (document.querySelector('#content')) {
    document.querySelector('#content').inert = true;
    document.querySelector('#content').setAttribute('aria-hidden', 'true');
  }
};

// Make page content active when modal is not open
// NB: This will look for #content for toggling inert state
TimeoutWarning.prototype.removeInertFromPageContent = function () {
  if (document.querySelector('#content')) {
    document.querySelector('#content').inert = false;
    document.querySelector('#content').setAttribute('aria-hidden', 'false');
  }
};

TimeoutWarning.prototype.isDialogOpen = function () {
  return this.$module.open;
};

TimeoutWarning.prototype.closeDialog = function () {
  if (this.isDialogOpen()) {
    document.querySelector('body').classList.remove(this.overLayClass);
    this.$module.close();
    this.setFocusOnLastFocusedEl();
    this.removeInertFromPageContent();

    this.clearTimers();
  }
};

// Clears modal timer
TimeoutWarning.prototype.clearTimers = function () {
  for (let i = 0; i < this.timers.length; i++) {
    clearTimeout(this.timers[i]);
  }
};

TimeoutWarning.prototype.disableBackButtonWhenOpen = function () {
  window.addEventListener('popstate', function () {
    if (this.isDialogOpen()) {
      this.closeDialog();
    } else {
      window.history.go(-1);
    }
  });
};

// Close modal when ESC pressed
TimeoutWarning.prototype.escClose = function (event) {
  // get the target element
  if (this.isDialogOpen() && event.keyCode === 27) {
    this.closeDialog();
  }
};

// Do a timestamp comparison with server when the page regains focus to check
// if the user should have been timed out already.
// This could happen but because the computer went to sleep, the browser crashed etc.
TimeoutWarning.prototype.checkIfShouldHaveTimedOut = function () {
  if (window.localStorage) {
    // TO DO - client/server interaction
    // GET last interactive time from server before timing out user
    // to ensure that user hasn’t interacted with site in another tab

    // If less time than data-minutes-idle-timeout left, call this.openDialog.bind(this)
    const timeUserLastInteractedWithPage = new Date(window.localStorage.getItem('timeUserLastInteractedWithPage'));

    const seconds = Math.abs((timeUserLastInteractedWithPage - new Date()) / 1000);

    // TO DO: use both idlemin and timemodalvisible
    if (seconds > this.idleMinutesBeforeTimeOut * 60) {
      // if (seconds > 60) {
      this.redirect.bind(this);
    }
  }
};
TimeoutWarning.prototype.redirect = function () {
  window.location.replace(this.timeOutRedirectUrl);
};

TimeoutWarning.prototype.numberToWords = function () {
  const string = n.toString();
  let units;
  let tens;
  let scales;
  let start;
  let end;
  let chunks;
  let chunksLen;
  let chunk;
  let ints;
  let i;
  let word;
  let words = 'and';

  if (parseInt(string) === 0) {
    return 'zero';
  }

  /* Array of units as words */
  units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  /* Array of tens as words */
  tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  /* Array of scales as words */
  scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length;
  chunks = [];
  while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length;
  if (chunksLen > scales.length) {
    return '';
  }

  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunksLen; i++) {
    chunk = parseInt(chunks[i]);

    if (chunk) {
      /* Split chunk into array of individual integers */
      ints = chunks[i].split('').reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      /* Add scale word if chunk is not zero and array item exists */
      if ((word = scales[i])) {
        words.push(word);
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word);
      }

      /* Add tens word if array item exists */
      if ((word = tens[ints[1]])) {
        words.push(word);
      }

      /* Add hundreds word if array item exists */
      if ((word = units[ints[2]])) {
        words.push(`${word} hundred`);
      }
    }
  }
  return words.reverse().join(' ');
};

export default TimeoutWarning;
