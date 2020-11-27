function mapOerToOerItem (oer) {
  const item = {
    id: oer.id,
    title: oer.title.rendered,
    description: oer.excerpt.rendered,
    publishDate: oer.date,
    modifiedDate: oer.publishDate,
    link: oer.link,
    imageSrc: require('@/assets/book-placeholder.jpg'),
    type: '',
    authors: [],
    institutions: [],
    subjects: [],
    keywords: [],
    levels: [],
    equivalents: []
  }

  if (oer._embedded['wp:term'] != null) {
    oer._embedded['wp:term'].forEach(term => {
      if (term.length > 0) {
        const termItem = term.map(type => type.name)
        switch (term[0].taxonomy) {
          case 'oertype':
            item.type = termItem[0]
            break
          case 'authors':
            item.authors = termItem
            break
          case 'institutions':
            item.institutions = termItem
            break
          case 'subjects':
            item.subjects = termItem
            break
          case 'keywords':
            item.keywords = termItem
            break
          case 'Levels':
            item.levels = termItem
            break
          case 'Equivalent':
            item.equivalents = termItem
            break
        }
      }
    })
  }
  return item
}

export { mapOerToOerItem }
