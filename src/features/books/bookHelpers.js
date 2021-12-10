export function getAuthors(authors) {
  if (!authors) return;
  return `By: ${authors.join(', ')}`;
}

export function getCategories(categories) {
  if (!categories) return;
  return `Categories: ${categories.join(', ')}`;
}

export function getPublisher(publisher) {
  if (!publisher) return;
  return `Publisher: ${publisher}`;
}

export function getPublishedDate(publishedDate) {
  if (!publishedDate) return;
  return `Published date: ${publishedDate}`;
}

export function getDescription(description) {
  if (!description) return;
  return `Description: ${description}`;
}