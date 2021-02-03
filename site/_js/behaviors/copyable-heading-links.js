// Make headings copyable by clicking.
const copyLinkToClipboard = () => {
  if (!('clipboard' in navigator)) {
    return;
  }
  document
    .querySelector('main')
    // ToDo: Use `:is(h2, h3, h4, h5, h6)[id]` once support is better.
    .querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]')
    .forEach((heading) => {
      heading.addEventListener('click', (ev) => {
        // Don't jump when the '#' is clicked.
        if (ev.target.nodeName === 'A') {
          ev.preventDefault();
        }
        try {
          navigator.clipboard.writeText(
            `${location.origin}${location.pathname}#${heading.id}`,
          );
          const temp = heading.innerHTML;
          heading.innerHTML += '&nbsp;<small>(📋 Copied.)</small>';
          setTimeout(() => {
            heading.innerHTML = temp;
          }, 2_000);
        } catch (err) {
          console.warn(err.name, err.message);
        }
      });
    });
};

copyLinkToClipboard();
