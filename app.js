const memeList = document.querySelector('#memeList');
const form = document.querySelector('#memeForm');

window.addEventListener('load', () => {
  const url = form.querySelector('input[name="url"]');
  url.focus();
});
// How would you implement isLoading?

// Util
/**
 * @param {string} type - node type
 * @param {Array} classname - Array of class names
 *
 * @param {Object[]} attr
 * @param {string} key - Attribute name.
 * @param {string} value - Attribute value.
 */

const createNode = (type, classnames, attrs) => {
  const newNode = document.createElement(type);
  if (classnames) {
    classnames.forEach((classname) => {
      newNode.classList.add(classname);
    });
  }
  if (attrs) {
    Object.entries(attrs).forEach((attr) => {
      newNode.setAttribute(attr[0], attr[1]);
    });
  }
  return newNode;
};

// UniqueId function by alexmorleyfinch
const uniqueID = () => {
  const chr4 = () => Math.random().toString(16).slice(-4);
  return `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
};

// End Util
const createMeme = (data) => {
  // {id, url, textTop, textBottom,}
  const imgAttrs = { src: data.url, alt: data.url };
  const divAttrs = { 'data-id': data.id };
  const container = createNode('div', ['meme'], divAttrs);
  const img = createNode('img', ['meme-img'], imgAttrs);
  const textTopSpan = createNode('span', ['textTop']);
  const textBottomSpan = createNode('span', ['textBottom']);

  textTopSpan.innerText = `${data.textTop}`;
  textBottomSpan.innerText = `${data.textBottom}`;
  container.append(img, textTopSpan, textBottomSpan);
  memeList.append(container);
};

const removeMeme = (e) => {
  const targetTag = e.target.tagName;
  if (targetTag === 'IMG' || targetTag === 'SPAN') {
    e.target.parentElement.remove();
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const { target } = e;
  const id = uniqueID();
  const url = target.url.value;
  const textTop = target.textTop.value;
  const textBottom = target.textBottom.value;
  const data = {
    id, url, textTop, textBottom,
  };

  createMeme(data);
  form.reset();
};

// Event Listners

memeList.addEventListener('dblclick', removeMeme);
form.addEventListener('submit', handleSubmit);
