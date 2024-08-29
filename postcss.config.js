import tailwindcss from 'tailwindcss'
import postcssPrefixSelector from 'postcss-prefix-selector'
/**
 * Transforms a CSS selector based on a given prefix.
 * @param {string} prefix - The prefix to apply to the selector.
 * @param {string} selector - The original CSS selector.
 * @param {string} prefixedSelector - The CSS selector with the prefix applied.
 * @returns {string} The transformed CSS selector.
 */
function transformSelector(prefix, selector, prefixedSelector) {
  if ([':root', ':host', 'html', 'body'].includes(selector)) {
    return ':host';
  }
  if (
    ['[data-theme]', '[data-theme=light]', '[data-theme=dark]'].includes(
      selector
    )
  ) {
    return `:host ${selector}`;
  }
  return prefixedSelector;
}

const postcssConfig = {
  plugins: [
    tailwindcss(),

    postcssPrefixSelector({
      prefix: '#my-ext',
      transform: transformSelector,
    })

  ]
}

export default postcssConfig
