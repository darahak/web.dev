/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const md = require('markdown-it')();
const capitalize = require('../../_filters/capitalize');
const titleCase = require('../../_filters/title-case');

module.exports = (content, type = 'note') => {
  let prefix;
  switch (type) {
    case 'note':
      content = md.render(content);
      break;

    case 'caution':
    case 'warning':
    case 'success':
    case 'objective':
      prefix = capitalize(type);
      // Create a <strong> with the type of aside and render it inline with
      // the generated markdown.
      content = `**${prefix}:** ${content}`;
      content = md.render(content);
      break;

    case 'codelab':
      content = `**Try it!** ${content}`;
      content = md.render(content);
      break;

    case 'key-term':
      prefix = titleCase(type);
      content = `**${prefix}:** ${content}`;
      content = md.render(content);
      break;

    case 'gotchas':
      prefix = capitalize(type);
      // Note the gotchas prefix has a ! instead of a :
      // And the <strong> tag should appear outside of the <p> tag
      // generated by markdown. This forces an intentional line break.
      content = `<strong>${prefix}!</strong> ${md.render(content)}`;
      break;
  }

  return `
<div class="w-aside w-aside--${type}">
${content}
</div>
  `;
};
